import ReactPlayer from "react-player";
import "./MoviesPopup.css";

function MoviesPopup({ onClose, film }) {
  const changeDurationFormat = (mins) => {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  };

  const videoTrailer = film && film.trailerLink;
  const videoName = film && film.nameRU;
  const videoYear = film && film.year;
  const videoCountry = film && film.country;
  const videoDirector = film && film.director;
  const videoDescription = film && film.description;
  const videoDuration = film && film.duration;

  return (
    <section className={`popup ${film ? "popup_opened" : ""}`}>
      <figure className="popup__video-container">
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
        ></button>
        {film && (
          <ReactPlayer
            url={videoTrailer}
            className="popup__video"
            controls
            playing
          />
        )}
        <ul className="popup__video-caption">

          <li className="popup__video-caption-item">
            {film ? (
              <span>
                Название:{" "}
                <a
                  href={film.trailerLink}
                  className="popup__video-caption-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {videoName}
                </a>
              </span>
            ) : (
              ""
            )}
          </li>
          <li className="popup__video-caption-item">
            {film ? `Год выпуска: ${videoYear}` : ""}
          </li>
          <li className="popup__video-caption-item">
            {film ? `Страна: ${videoCountry}` : ""}
          </li>
          <li className="popup__video-caption-item">
            {film ? `Режиссёр: ${videoDirector}` : ""}
          </li>
          <li className="popup__video-caption-item">
            {film ? `Описание: ${videoDescription}` : ""}
          </li>
          <li className="popup__video-caption-item">
            {film
              ? `Продолжительность: ${changeDurationFormat(videoDuration)}`
              : ""}
          </li>

        </ul>
      </figure>
    </section>
  );
}

export default MoviesPopup;
