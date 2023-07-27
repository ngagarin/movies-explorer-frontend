import React, { useEffect, useState, useContext, useCallback } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  SHORT_MOVIE,
  MOVIES_LIST_ERROR_MSG,
  MOVIE_DELETE_ERROR_MSG,
  HAVE_NO_MOVIE_MSG,
  SEARCH_MOVIE_ERROR_MSG,
  HAVE_NO_SHORTMOVIE_MSG,
  SEARCH_SHORTMOVIE_ERROR_MSG,
} from "../../utils/constants";

function SavedMovies({ isBurgerMenuOpen, onBurgerMenuClose }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesToRender, setSavedMoviesToRender] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isToggleDisabled, setIsToggleDisabled] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const fetchSavedMovies = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const getMovies =
        (await JSON.parse(localStorage.getItem("savedMovies"))) || [];
      const currentUserSavedMovies = getMovies.filter(
        (movie) => movie.owner === currentUser._id
      );

      if (currentUserSavedMovies.length === 0) {
        setIsInputDisabled(true);
        setIsToggleDisabled(true);
      } else {
        setIsInputDisabled(false);
        setIsToggleDisabled(false);
      }

      setSavedMovies(currentUserSavedMovies);
      setSavedMoviesToRender(currentUserSavedMovies);
    } catch {
      setErrorMessage(MOVIES_LIST_ERROR_MSG);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [currentUser._id]);

  useEffect(() => {
    fetchSavedMovies();
  }, [fetchSavedMovies]);

  function getSavedMovies(searchRequest, isToggle) {
    setErrorMessage("");

    const currentUserSavedMovies = savedMovies.filter(
      (movie) => movie.owner === currentUser._id
    );

    if (!searchRequest) {
      if (currentUserSavedMovies.length === 0) {
        setIsInputDisabled(true);
        setIsToggleDisabled(true);
      } else {
        setIsInputDisabled(false);
        setIsToggleDisabled(false);

        if (isToggle) {
          localStorage.setItem("isSavedMoviesToggle", "true");
          setIsToggle(true);
          const shortSavedMovies = currentUserSavedMovies.filter(
            (movie) => movie.duration <= SHORT_MOVIE
          );

          if (shortSavedMovies.length > 0) {
            setSavedMoviesToRender(shortSavedMovies);
            setIsInputDisabled(false);
          } else {
            setErrorMessage(HAVE_NO_SHORTMOVIE_MSG);
            setIsInputDisabled(false);
            setSavedMoviesToRender([]);
          }
        } else {
          localStorage.setItem("isSavedMoviesToggle", "false");
          setIsToggle(false);
          setSavedMoviesToRender(currentUserSavedMovies);
        }
      }

      return;
    }

    if (savedMovies === null) {
      return setErrorMessage(MOVIES_LIST_ERROR_MSG);
    }

    const savedMoviesSearchResults = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase())
    );

    if (isToggle) {
      setIsToggle(true);
      const shortSavedMovies = savedMoviesSearchResults.filter(
        (movie) => movie.duration <= SHORT_MOVIE
      );

      if (shortSavedMovies.length > 0) {
        setSavedMoviesToRender(shortSavedMovies);
      } else {
        setErrorMessage(SEARCH_SHORTMOVIE_ERROR_MSG);
        setSavedMoviesToRender([]);
      }
    } else {
      if (savedMoviesSearchResults.length > 0) {
        setSavedMoviesToRender(savedMoviesSearchResults);
      } else {
        setErrorMessage(SEARCH_MOVIE_ERROR_MSG);
        setSavedMoviesToRender([]);
      }
    }
  }

  async function savedMoviesToggle(movie, isSelected) {
    setErrorMessage("");

    if (!isSelected) {
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
        const shortSavedMovies = currentNewSavedMovies.filter(
          (movie) => movie.duration <= SHORT_MOVIE
        );
        setSavedMovies(currentNewSavedMovies);

        setSavedMoviesToRender((prevMovies) =>
          prevMovies.filter((savedMovie) => savedMovie._id !== movie._id)
        );

        if (!isToggle && currentNewSavedMovies.length > 0) {
          setErrorMessage(SEARCH_MOVIE_ERROR_MSG);
        }

        if (isToggle && shortSavedMovies.length > 0) {
          setErrorMessage(SEARCH_SHORTMOVIE_ERROR_MSG);
        }

        if (
          isToggle &&
          shortSavedMovies.length === 0 &&
          currentNewSavedMovies.length > 0
        ) {
          setIsInputDisabled(false);
        }

        if (
          isToggle &&
          shortSavedMovies.length === 0 &&
          currentNewSavedMovies.length === 0
        ) {
          localStorage.setItem("isSavedMoviesToggle", "false");
          setIsInputDisabled(true);
          setIsToggleDisabled(true);
          setErrorMessage(HAVE_NO_MOVIE_MSG);
        }

        if (!isToggle && currentNewSavedMovies.length === 0) {
          setIsInputDisabled(true);
          setIsToggleDisabled(true);
          setErrorMessage(HAVE_NO_MOVIE_MSG);
        }
      } catch {
        setErrorMessage(MOVIE_DELETE_ERROR_MSG);
      }
    }
  }

  return (
    <section className="saved-movies">
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <SearchForm
        onGetMovies={getSavedMovies}
        isToggleDisabled={isToggleDisabled}
        isInputDisabled={isInputDisabled}
        isLoading={isLoading}
      />

      {errorMessage && savedMoviesToRender.length === 0 ? (
        <span className="movies__error-message">{errorMessage}</span>
      ) : (
        <MoviesCardList
          moviesToRender={savedMoviesToRender}
          moviesRemains={[]}
          savedMoviesToggle={savedMoviesToggle}
          savedMovies={savedMovies}
          isToggle={isToggle}
          isLoading={isLoading}
        />
      )}
    </section>
  );
}

export default SavedMovies;
