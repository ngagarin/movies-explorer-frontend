import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import unfoundImage from '../../images/movies/unfound-image.svg';
import MoviesPopup from '../MoviesPopup/MoviesPopup';

function MoviesCard({ film }) {
  const { pathname } = useLocation();
  const [select, setSelect] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const toggleFilmSelector = () => {
    if (select === false) {
      setSelect(true);
    } else {
      setSelect(false);
    }
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

  const imageSrc = `https://api.nomoreparties.co${film.image.url}`;
  const imageAlt = film.nameRU;
  const imageUnavailable = !film.image.url;

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
        {imageUnavailable ? (
          <img className="card__image" src={unfoundImage} alt={imageAlt} />
        ) : (
          <img className="card__image" src={imageSrc} alt={imageAlt} />
        )}
      </div>
      <div className="card__element">
        <p className="card__title">{imageAlt}</p>
        {pathname === '/saved-movies' ? (
          <button type="button" className="card__button-delete" />
        ) : (
          <button
            type="button"
            className={`card__button card__button${select && '_active'}`}
            onClick={toggleFilmSelector}
          />
        )}
      </div>
      <p className="card__duration">{changeDurationFormat(film.duration)}</p>
      {popupOpen && (
        <MoviesPopup
          isOpen={openPopup}
          onClose={closePopup}
          film={film}
        />
      )}
    </li>
  );
}

export default MoviesCard;
