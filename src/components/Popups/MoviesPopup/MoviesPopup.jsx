import ReactPlayer from "react-player";
import "../Popups.css";

function MoviesPopup({ onClose, movie }) {
  const changeDurationFormat = (mins) => {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  };

  const videoTrailer = movie && movie.trailerLink;
  const videoName = movie && movie.nameRU;
  const videoYear = movie && movie.year;
  const videoCountry = movie && movie.country;
  const videoDirector = movie && movie.director;
  const videoDescription = movie && movie.description;
  const videoDuration = movie && movie.duration;

  return (
    <section className={`popup ${movie ? "popup_opened" : ""}`}>
      <figure className="popup__video-container">
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
        ></button>
        {movie && (
          <ReactPlayer
            url={videoTrailer}
            className="popup__video"
            controls
            playing
          />
        )}
        <ul className="popup__video-caption">

          <li className="popup__video-caption-item">
            {movie ? (
              <span>
                Название:{" "}
                <a
                  href={movie.trailerLink}
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
            {movie ? `Год выпуска: ${videoYear}` : ""}
          </li>
          <li className="popup__video-caption-item">
            {movie ? `Страна: ${videoCountry}` : ""}
          </li>
          <li className="popup__video-caption-item">
            {movie ? `Режиссёр: ${videoDirector}` : ""}
          </li>
          <li className="popup__video-caption-item">
            {movie ? `Описание: ${videoDescription}` : ""}
          </li>
          <li className="popup__video-caption-item">
            {movie
              ? `Продолжительность: ${changeDurationFormat(videoDuration)}`
              : ""}
          </li>

        </ul>
      </figure>
    </section>
  );
}

export default MoviesPopup;
