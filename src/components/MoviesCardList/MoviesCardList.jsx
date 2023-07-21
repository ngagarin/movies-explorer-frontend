import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import {
  HAVE_NO_MOVIE_MSG,
  HAVE_NO_SHORTMOVIE_MSG,
} from "../../utils/constants";

function MoviesCardList({
  moviesToRender,
  savedMoviesToggle,
  savedMovies,
  isToggle,
}) {
  const { pathname } = useLocation();
  const [displayedRows, setDisplayedRows] = useState(getInitialRows());
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const isMoviesTab = pathname === "/movies";

  useEffect(() => {
    const totalRows = Math.ceil(moviesToRender.length / getColumns());
    setShouldShowButton(displayedRows < totalRows);
  }, [moviesToRender, displayedRows]);

  function getInitialRows() {
    if (window.innerWidth > 1100) return 3;
    if (window.innerWidth > 840) return 4;
    if (window.innerWidth > 540) return 4;
    return 5;
  }

  function getRowsToAdd() {
    if (window.innerWidth > 1100) return 1;
    if (window.innerWidth > 840) return 1;
    if (window.innerWidth > 540) return 1;
    return 2;
  }

  function getColumns() {
    if (window.innerWidth > 1100) return 4;
    if (window.innerWidth > 840) return 3;
    if (window.innerWidth > 540) return 2;
    return 1;
  }

  const handleShowMore = () => {
    setDisplayedRows((prevRows) => prevRows + getRowsToAdd());
  };

  return (
    <div className="cards">
      {moviesToRender.length > 0 ? (
        <ul className="cards__list">
          {moviesToRender
            .slice(
              0,
              isMoviesTab ? displayedRows * getColumns() : moviesToRender.length
            )
            .map((movie) => (
              <MoviesCard
                key={movie.id || movie.movieId}
                movie={movie}
                savedMoviesToggle={savedMoviesToggle}
                savedMovies={savedMovies}
              />
            ))}
        </ul>
      ) : (
        <p className="cards__message">
          {isToggle ? HAVE_NO_SHORTMOVIE_MSG : HAVE_NO_MOVIE_MSG}
        </p>
      )}

      {isMoviesTab && shouldShowButton && (
        <button
          className="cards__button"
          type="button"
          name="more"
          onClick={handleShowMore}
        >
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
