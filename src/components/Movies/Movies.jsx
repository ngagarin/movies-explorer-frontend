import React, { useEffect, useState, useContext, useCallback } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
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

function Movies({ isBurgerMenuOpen, onBurgerMenuClose }) {
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isToggle, setIsToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const localStorageMoviesSearchRequest = localStorage.getItem(
      "moviesSearchRequest"
    );
    const localStorageMoviesToggle =
      localStorage.getItem("isMoviesToggle") === "true";

    if (localStorageMoviesSearchRequest) {
      getMovies(localStorageMoviesSearchRequest, localStorageMoviesToggle);
    }
    getMovies("", false);
  }, []);

  const fetchSavedMovies = useCallback(async () => {
    try {
      const savedMoviesResponse =
        (await JSON.parse(localStorage.getItem("savedMovies"))) || [];
      const currentSavedMovies = savedMoviesResponse.filter(
        (movie) => movie.owner === currentUser._id
      );
      setSavedMovies(currentSavedMovies);
    } catch {
      setErrorMessage(MOVIES_SAVED_LIST_ERROR_MSG);
    }
  }, [currentUser._id]);

  useEffect(() => {
    if (currentUser._id) {
      fetchSavedMovies();
    }
  }, [currentUser._id, fetchSavedMovies]);

  function getMovies(searchRequest, isToggle) {
    setIsLoading(true);
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
    const shortMovies = moviesSearchResults.filter(
      (movie) => movie.duration <= SHORT_MOVIE
    );

    localStorage.setItem("moviesSearchRequest", searchRequest);
    localStorage.setItem(
      "moviesSearchResults",
      JSON.stringify(moviesSearchResults)
    );
    localStorage.setItem("shortMovies", JSON.stringify(shortMovies));
    localStorage.setItem("isMoviesToggle", isToggle);

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
        setErrorMessage(SEARCH_MOVIE_ERROR_MSG);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }

  async function savedMoviesToggle(movie, isSelected) {
    if (isSelected) {
      try {
        await mainApi.addMovies(movie);
        let newSavedMovies = await mainApi.getMovies();
        const savedMovies = newSavedMovies.filter(
          (movie) => movie.owner === currentUser._id
        );

        setSavedMovies(savedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      } catch (err) {
        setErrorMessage(MOVIE_ADD_ERROR_MSG);
        console.log(`При сохранении фильма возникла ошибка: ${err}`);
      }
    } else {
      try {
        await mainApi.deleteMovies(movie._id);

        const savedMoviesFromLocalStorage = JSON.parse(
          localStorage.getItem("savedMovies")
        );
        const updatedSavedMovies = savedMoviesFromLocalStorage.filter(
          (savedMovie) => savedMovie._id !== movie._id
        );
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));

        const response = updatedSavedMovies;

        const currentNewSavedMovies = response.filter(
          (savedMovie) => savedMovie.owner === currentUser._id
        );

        setSavedMovies(currentNewSavedMovies);
      } catch {
        setErrorMessage(MOVIE_DELETE_ERROR_MSG);
      }
    }
  }

  return (
    <section className="movies">
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <SearchForm onGetMovies={getMovies} isLoading={isLoading} />

      {errorMessage ? (
        <span className="movies__error-message">{errorMessage}</span>
      ) : (
        moviesToRender.length > 0 && (
          <MoviesCardList
            moviesToRender={moviesToRender}
            savedMoviesToggle={savedMoviesToggle}
            savedMovies={savedMovies}
            isToggle={isToggle}
            isLoading={isLoading}
          />
        )
      )}
    </section>
  );
}

export default Movies;
