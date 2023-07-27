import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {
  HAVE_NO_MOVIE_MSG,
  HAVE_NO_SHORTMOVIE_MSG,
  getInitialElements,
  getElementsToAdd,
} from "../../utils/constants";

function MoviesCardList({
  moviesToRender,
  savedMoviesToggle,
  savedMovies,
  isToggle,
  isLoading,
}) {
  const { pathname } = useLocation();
  const [displayedElements, setDisplayedElements] = useState(
    getInitialElements()
  );
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const isMoviesTab = pathname === "/movies";
  const screenWidth = window.innerWidth;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth !== screenWidth) {
        setDisplayedElements(getInitialElements());
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  useEffect(() => {
    const totalElements = moviesToRender.length;
    setShouldShowButton(displayedElements < totalElements);
  }, [moviesToRender, displayedElements]);

  return (
    <div className="cards">
      {isLoading ? (
        <Preloader />
      ) : moviesToRender.length > 0 ? (
        <>
          <ul className="cards__list">
            {moviesToRender
              .slice(0, isMoviesTab ? displayedElements : moviesToRender.length)
              .map((movie) => (
                <MoviesCard
                  key={movie.id || movie.movieId}
                  movie={movie}
                  savedMoviesToggle={savedMoviesToggle}
                  savedMovies={savedMovies}
                />
              ))}
          </ul>

          {isMoviesTab && shouldShowButton && (
            <button
              className="cards__button"
              type="button"
              name="more"
              onClick={() =>
                setDisplayedElements(
                  (prevElements) => prevElements + getElementsToAdd()
                )
              }
            >
              Ещё
            </button>
          )}
        </>
      ) : (
        <p className="cards__message">
          {isToggle ? HAVE_NO_SHORTMOVIE_MSG : HAVE_NO_MOVIE_MSG}
        </p>
      )}
    </div>
  );
}

export default MoviesCardList;
