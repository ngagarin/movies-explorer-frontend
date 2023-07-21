import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";

function SearchForm({ onGetMovies, isInputDisabled, isToggleDisabled }) {
  const { pathname } = useLocation();
  const [searchRequest, setSearchRequest] = useState("");
  const [searchRequestSavedMovies, setSearchRequestSavedMovies] = useState("");
  const [isToggle, setIsToggle] = useState(false);

  const onGetMoviesRef = useRef(null);
  onGetMoviesRef.current = onGetMovies;

  useEffect(() => {
    setIsToggle(false);

    if (pathname !== "/saved-movies") {
      setSearchRequest("");
      const localStorageMoviesToggle = localStorage.getItem("isToggle");
      const localStorageMoviesSearchRequest = localStorage.getItem(
        "moviesSearchRequest"
      );

      if (localStorageMoviesToggle && localStorageMoviesSearchRequest) {
        setSearchRequest(localStorageMoviesSearchRequest);
        setIsToggle(localStorageMoviesToggle === "true");
      }
    }
  }, [pathname]);

  const handleSearchRequest = useCallback((evt) => {
      const value = evt.target.value;

      if (pathname === "/saved-movies") {
        setSearchRequestSavedMovies(value);
        onGetMoviesRef.current(value);
      } else {
        setSearchRequest(value);
        onGetMoviesRef.current(value, isToggle);
      }
    },
    [pathname, isToggle]
  );

  const handleSubmit = useCallback((event) => {
      event.preventDefault();
      setIsToggle(isToggle);

      if (pathname === "/saved-movies") {
        onGetMoviesRef.current(searchRequestSavedMovies);
      } else {
        onGetMoviesRef.current(searchRequest, isToggle);
      }
    },
    [pathname, searchRequest, searchRequestSavedMovies, isToggle]
  );

  const handleToggle = useCallback(() => {
    setIsToggle(!isToggle);
  }, [isToggle]);

  useEffect(() => {
    if (pathname === "/saved-movies") {
      onGetMoviesRef.current(searchRequestSavedMovies, isToggle);
    } else if (pathname === "/movies" && searchRequest.length > 0) {
      onGetMoviesRef.current(searchRequest, isToggle);
    }
  }, [pathname, searchRequest, searchRequestSavedMovies, isToggle]);

  const isSearchEmpty = searchRequest.trim() === "" && searchRequestSavedMovies.trim() === "";

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__container">
          <label className="search__label">
            <input
              className={`search__input ${
                isSearchEmpty ? "search__input_type_error" : ""
              }`}
              onChange={handleSearchRequest}
              value={
                pathname === "/saved-movies"
                  ? searchRequestSavedMovies
                  : searchRequest || ""
              }
              type="text"
              placeholder="Фильм"
              id="search-input"
              name="search-input"
              autoComplete="off"
              disabled={isInputDisabled}
              required
            />
          </label>

          <button
            className={`search__button ${
              isSearchEmpty || isInputDisabled ? "search__button_disabled" : ""
            }`}
            type="submit"
            disabled={isSearchEmpty || isInputDisabled}
          >
            Найти
          </button>
        </div>

        <div className="search__filter">
          <label
            className={`search__tumbler ${
              pathname === "/movies"
                ? isSearchEmpty || isToggleDisabled ? "search__tumbler_disabled" : ""
                : isToggleDisabled ? "search__tumbler_disabled" : ""
            }`}
          >
            <input
              className="search__checkbox"
              name="checkbox"
              type="checkbox"
              checked={isToggle}
              onChange={handleToggle}
              disabled={pathname === "/movies"
                ? isSearchEmpty || isToggleDisabled
                : isToggleDisabled
              }
            />
            <span className="search__slider" />
          </label>
          <p className="search__tumbler-label">Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
