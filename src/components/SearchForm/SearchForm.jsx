import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import AutocompleteList from "../AutocompleteList/AutocompleteList";
import { SHORT_MOVIE } from "../../utils/constants";

function SearchForm({ onGetMovies, isInputDisabled, isToggleDisabled }) {
  const { pathname } = useLocation();
  const [searchRequest, setSearchRequest] = useState("");
  const [searchRequestSavedMovies, setSearchRequestSavedMovies] = useState("");
  const [isMoviesToggle, setIsMoviesToggle] = useState(false);
  const [isSavedMoviesToggle, setIsSavedMoviesToggle] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValueMovies, setInputValueMovies] = useState("");
  const [inputValueSavedMovies, setInputValueSavedMovies] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isInputModified, setIsInputModified] = useState(false);

  const searchInputRef = useRef(null);
  const onGetMoviesRef = useRef(null);
  onGetMoviesRef.current = onGetMovies;

  const isSearchEmpty =
    inputValueMovies.trim() === "" && inputValueSavedMovies.trim() === "";

  useEffect(() => {
    setIsMoviesToggle(false);
    setIsSavedMoviesToggle(false);

    if (pathname !== "/saved-movies") {
      setSearchRequest("");
      const localStorageMoviesToggle = localStorage.getItem("isMoviesToggle");
      const localStorageMoviesSearchRequest = localStorage.getItem(
        "moviesSearchRequest"
      );

      if (
        localStorageMoviesToggle !== null &&
        localStorageMoviesSearchRequest !== null
      ) {
        setSearchRequest(localStorageMoviesSearchRequest);
        setInputValueMovies(localStorageMoviesSearchRequest);
        setIsMoviesToggle(localStorageMoviesToggle === "true");
      }
    } else {
      const localStorageSavedMoviesToggle = localStorage.getItem(
        "isSavedMoviesToggle"
      );

      setInputValueSavedMovies(searchRequestSavedMovies);
      setIsSavedMoviesToggle(localStorageSavedMoviesToggle === "true");
    }
  }, [pathname, searchRequestSavedMovies]);

  const fetchMovieSuggestions = useCallback(
    (value) => {
      const allMoviesArray = JSON.parse(localStorage.getItem("allMovies"));
      const savedMoviesArray = JSON.parse(localStorage.getItem("savedMovies"));

      let moviesArray =
        pathname !== "/saved-movies" ? allMoviesArray : savedMoviesArray;
      const isShortMovies =
        pathname !== "/saved-movies"
          ? isMoviesToggle && moviesArray
          : isSavedMoviesToggle && moviesArray;

      if (isShortMovies) {
        moviesArray = moviesArray.filter(
          (movie) => movie.duration <= SHORT_MOVIE
        );
      }

      if (!moviesArray || moviesArray.length === 0) {
        setSuggestions([]);
        return;
      }

      const lowerCaseValue = value.toLowerCase();
      const filteredSuggestions = moviesArray.filter((movie) =>
        movie.nameRU.toLowerCase().includes(lowerCaseValue)
      );

      setSuggestions(filteredSuggestions);
    },
    [pathname, isMoviesToggle, isSavedMoviesToggle]
  );

  const handleSearchRequest = useCallback(
    (evt) => {
      const value = evt.target.value;
      if (pathname === "/saved-movies") {
        setInputValueSavedMovies(value);
      } else {
        setInputValueMovies(value);
      }
    },
    [pathname]
  );

  const handleInputClear = useCallback(() => {
    if (pathname === "/saved-movies") {
      setInputValueSavedMovies("");
      setSearchRequestSavedMovies("");
      onGetMoviesRef.current("", isSavedMoviesToggle);
    } else {
      setInputValueMovies("");
      setSearchRequest("");
      onGetMoviesRef.current("", isMoviesToggle);
    }
    setIsInputModified(false);
  }, [pathname, isMoviesToggle, isSavedMoviesToggle, onGetMoviesRef]);

  const handleInputChange = useCallback(
    (evt) => {
      const value = evt.target.value;
      if (value.trim() === "") {
        handleInputClear();
      } else {
        setIsInputModified(true);
      }
      handleSearchRequest(evt);
      fetchMovieSuggestions(value);
    },
    [fetchMovieSuggestions, handleInputClear, handleSearchRequest]
  );

  const handleMoviesToggle = useCallback(() => {
    setIsMoviesToggle(!isMoviesToggle);
  }, [isMoviesToggle]);

  const handleSavedMoviesToggle = useCallback(() => {
    setIsSavedMoviesToggle(!isSavedMoviesToggle);
  }, [isSavedMoviesToggle]);

  useEffect(() => {
    if (pathname === "/saved-movies") {
      onGetMoviesRef.current(searchRequestSavedMovies, isSavedMoviesToggle);
    } else if (pathname === "/movies" && searchRequest.length > 0) {
      onGetMoviesRef.current(searchRequest, isMoviesToggle);
    }
  }, [
    pathname,
    searchRequest,
    searchRequestSavedMovies,
    isMoviesToggle,
    isSavedMoviesToggle,
  ]);

  const handleSearch = useCallback(
    async (searchValue, isMoviesToggle, isSavedMoviesToggle) => {
      setIsSearching(true);

      if (pathname === "/saved-movies") {
        setSearchRequestSavedMovies(searchValue);
        await onGetMoviesRef.current(searchValue, isSavedMoviesToggle);
      } else {
        setSearchRequest(searchValue);
        await onGetMoviesRef.current(searchValue, isMoviesToggle);
      }

      setIsSearching(false);
      setIsInputModified(false);

      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.blur();
        }
      }, 100);
    },
    [pathname, onGetMoviesRef]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!isInputModified) return;
      handleSearch(
        pathname === "/saved-movies" ? inputValueSavedMovies : inputValueMovies
      );
    },
    [
      handleSearch,
      pathname,
      inputValueSavedMovies,
      inputValueMovies,
      isInputModified,
    ]
  );

  // Автокомплит
  const handleAutocompleteItemClick = useCallback(
    (suggestion) => {
      if (pathname === "/saved-movies") {
        setInputValueSavedMovies(suggestion.nameRU);
        handleSearch(suggestion.nameRU, isSavedMoviesToggle);
      } else {
        setInputValueMovies(suggestion.nameRU);
        handleSearch(suggestion.nameRU, isMoviesToggle);
      }
      setSuggestions([]);
    },
    [pathname, handleSearch, isMoviesToggle, isSavedMoviesToggle]
  );

  const handleContainerClick = useCallback((event) => {
    const isInput = event.target.id === "search-input";
    const isAutocompleteItem = event.target.closest(".autocomplete-item");
    if (!isInput && !isAutocompleteItem) {
      setIsOnFocus(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleContainerClick);
    return () => {
      document.removeEventListener("click", handleContainerClick);
    };
  }, [handleContainerClick]);

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__container">
          <label className="search__label">
            <input
              className={`search__input ${
                isSearchEmpty ? "search__input_type_error" : ""
              }`}
              onChange={handleInputChange}
              onFocus={() => setIsOnFocus(true)}
              value={
                pathname === "/saved-movies"
                  ? inputValueSavedMovies
                  : inputValueMovies || ""
              }
              type="text"
              placeholder="Фильм"
              id="search-input"
              name="search-input"
              autoComplete="off"
              disabled={isInputDisabled || isSearching}
              ref={searchInputRef}
              required
            />

            {!isSearchEmpty && isOnFocus ? (
              <span className="autocomplete-container">
                {suggestions.length > 0 && (
                  <AutocompleteList
                    suggestions={suggestions}
                    onItemClick={handleAutocompleteItemClick}
                  />
                )}
              </span>
            ) : (
              ""
            )}
          </label>

          <button
            className={`search__button ${
              isSearchEmpty || !isInputModified || isInputDisabled
                ? "search__button_disabled"
                : ""
            }`}
            type="submit"
            disabled={
              isSearchEmpty ||
              !isInputModified ||
              isSearching ||
              isInputDisabled
            }
          >
            Найти
          </button>
        </div>

        <div className="search__filter">
          <label
            className={`search__tumbler ${
              pathname === "/movies"
                ? isSearchEmpty
                  ? "search__tumbler_disabled"
                  : ""
                : isToggleDisabled
                  ? "search__tumbler_disabled"
                  : ""
            }`}
          >
            <input
              className="search__checkbox"
              name="checkbox"
              type="checkbox"
              checked={
                pathname === "/movies"
                  ? isMoviesToggle
                  : isSavedMoviesToggle
              }
              onChange={
                pathname === "/movies"
                  ? handleMoviesToggle
                  : handleSavedMoviesToggle
              }
              disabled={
                pathname === "/movies"
                  ? isSearchEmpty
                  : isToggleDisabled
              }
            />
            <span className="search__slider" />
          </label>

          <p
            className={`search__tumbler-label ${
              pathname === "/movies"
                ? isSearchEmpty
                  ? "search__tumbler-label_disabled"
                  : ""
                : isToggleDisabled
                ? "search__tumbler-label_disabled"
                : ""
            }`}
          >
            Короткометражки
          </p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
