import React, { useEffect, useState, useContext, useCallback } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  SHORT_MOVIE,
  INPUT_SEARCH_TEXT_MSG,
  MOVIES_LIST_ERROR_MSG,
  MOVIES_SAVED_LIST_ERROR_MSG,
  MOVIE_ADD_ERROR_MSG,
  MOVIE_DELETE_ERROR_MSG,
  SEARCH_MOVIE_ERROR_MSG,
  SEARCH_SHORTMOVIE_ERROR_MSG,
} from "../../utils/constants";

function Movies({ isBurgerMenuOpen, onBurgerMenuClose, isJustAuthorized }) {
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isToggle, setIsToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const localStorageMoviesSearchRequest = localStorage.getItem("moviesSearchRequest");
    const localStorageMoviesToggle = localStorage.getItem("isToggle") === "true";

    if (localStorageMoviesSearchRequest) {
      getMovies(localStorageMoviesSearchRequest, localStorageMoviesToggle);
    }

    getMovies("", false);
  }, []);

  const fetchSavedMovies = useCallback(async () => {
    try {
      const savedMoviesResponse = await mainApi.getMovies();
      const currentSavedMovies = savedMoviesResponse.filter((movie) => movie.owner === currentUser._id);
      setSavedMovies(currentSavedMovies);
    } catch (err) {
      setErrorMessage(MOVIES_SAVED_LIST_ERROR_MSG);
      console.log(`Не удалось загрузить сохранённые фильмы: ${err}`);
    }
  }, [currentUser._id]);

  useEffect(() => {
    if (currentUser._id) {
      fetchSavedMovies();
    }
  }, [currentUser._id, fetchSavedMovies]);

  function getMovies(searchRequest, isToggle) {
    setErrorMessage("");

    if (!searchRequest) {
      setErrorMessage(INPUT_SEARCH_TEXT_MSG);
      return;
    }

    const initialMovies = JSON.parse(localStorage.getItem("allMovies"));

    if (initialMovies === null) {
      return setErrorMessage(MOVIES_LIST_ERROR_MSG);
    }

    const moviesSearchResults = initialMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase())
    );
    const shortMovies = moviesSearchResults.filter((movie) => movie.duration <= SHORT_MOVIE);

    localStorage.setItem("moviesSearchRequest", searchRequest);
    localStorage.setItem("moviesSearchResults", JSON.stringify(moviesSearchResults));
    localStorage.setItem("shortMovies", JSON.stringify(shortMovies));
    localStorage.setItem("isToggle", isToggle);

    setIsToggle(isToggle);

    if (isToggle) {
      if (shortMovies.length > 0) {
        setMoviesToRender(shortMovies);
      } else {
        setErrorMessage(SEARCH_SHORTMOVIE_ERROR_MSG);
      }
    } else {
      if (moviesSearchResults.length > 0) {
        setMoviesToRender(moviesSearchResults);
      } else {
        setErrorMessage(SEARCH_MOVIE_ERROR_MSG );
      }
    }
  }

  async function savedMoviesToggle(movie, isSelected) {
    if (isSelected) {
      try {
        await mainApi.addMovies(movie);
        fetchSavedMovies();
      } catch (err) {
        setErrorMessage(MOVIE_ADD_ERROR_MSG);
        console.log(`При сохранении фильма возникла ошибка: ${err}`);
      }
    } else {
      try {
        await mainApi.deleteMovies(movie._id);
        fetchSavedMovies();
      } catch (err) {
        setErrorMessage(MOVIE_DELETE_ERROR_MSG);
        console.log(`При удалении фильма возникла: ${err}`);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="movies">
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <SearchForm onGetMovies={getMovies} />

      {isLoading && !isJustAuthorized ? (
        <Preloader />
      ) : errorMessage ? (
        <span className="movies__error-message">{errorMessage}</span>
      ) : moviesToRender.length > 0 && (
        <MoviesCardList
          moviesToRender={moviesToRender}
          savedMoviesToggle={savedMoviesToggle}
          savedMovies={savedMovies}
          isToggle={isToggle}
        />
      )}
    </section>
  );
}

export default Movies;
