import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import MoviesPopup from "../MoviesPopup/MoviesPopup";

function MoviesCard({ movie, savedMoviesToggle, savedMovies }) {
  const { pathname } = useLocation();
  const [isSelect, setIsSelect] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const imageSrc = movie.image.url;
  const savedImageSrc = movie.image;
  const imageAlt = movie.nameRU;

  useEffect(() => {
    if (pathname !== "/saved-movies") {
      const savedMovie = savedMovies.filter((obj) => obj.movieId === movie.id);
      setIsSelect(savedMovie.length > 0);
    }
  }, [pathname, savedMovies, movie.id]);

  const toggleMovieSelector = () => {
    const selected = !isSelect;
    const savedMovie = savedMovies.find((obj) => obj.movieId === movie.id);
    savedMoviesToggle(
      { ...movie, _id: savedMovie ? savedMovie._id : null },
      selected
    );
  };

  const deleteSelectedMovie = () => {
    savedMoviesToggle(movie, false);
  };

  const changeDurationFormat = (mins) => {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      closePopup();
    }
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("popup_opened")) {
      closePopup();
    }
  };

  const openPopup = () => {
    setPopupOpen(true);
    document.body.classList.add("root_type_hidden");
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleOutsideClick);
  };

  const closePopup = () => {
    setPopupOpen(false);
    document.body.classList.remove("root_type_hidden");
    document.removeEventListener("keydown", handleEscapeKey);
    document.removeEventListener("mousedown", handleOutsideClick);
  };

  return (
    <li className="card">
      <div className="card__image-content" onClick={openPopup}>
        <img
          className="card__image"
          src={
            pathname === "/saved-movies"
              ? savedImageSrc
              : `https://api.nomoreparties.co/${imageSrc}`
          }
          alt={imageAlt}
        />
      </div>
      <div className="card__element">
        <p className="card__title">{imageAlt}</p>
        {pathname === "/saved-movies" ? (
          <button
            type="button"
            className="card__button-delete"
            onClick={deleteSelectedMovie}
          />
        ) : (
          <button
            type="button"
            className={`card__button ${isSelect && "card__button_active"}`}
            onClick={toggleMovieSelector}
          />
        )}
      </div>
      <p className="card__duration">{changeDurationFormat(movie.duration)}</p>
      {popupOpen && (
        <MoviesPopup isOpen={openPopup} onClose={closePopup} movie={movie} />
      )}
    </li>
  );
}

export default MoviesCard;
