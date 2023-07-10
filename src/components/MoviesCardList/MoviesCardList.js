import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import MoviesDB from '../../utils/MoviesDB'; // временный массив с фильмами

function MoviesCardList() {
  const [displayedRows, setDisplayedRows] = useState(getInitialRows());
  const [showMoreButton, setShowMoreButton] = useState(true);

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

  const handleShowMore = () => {
    setDisplayedRows(prevRows => prevRows + getRowsToAdd());
  };

  useEffect(() => {
    const handleResize = () => {
      setDisplayedRows(getInitialRows());
    };

    const handleResizeDebounced = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 200);
    };

    let resizeTimer;
    window.addEventListener('resize', handleResizeDebounced);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResizeDebounced);
    };
  }, []);

  useEffect(() => {
    const totalRows = Math.ceil(MoviesDB.length / getColumns());
    setShowMoreButton(displayedRows < totalRows);
  }, [displayedRows]);

  function getColumns() {
    if (window.innerWidth > 1100) return 4;
    if (window.innerWidth > 840) return 3;
    if (window.innerWidth > 540) return 2;
    return 1;
  }

  return (
    <section className="cards">
      <ul className="cards__list">
        {MoviesDB.slice(0, displayedRows * getColumns()).map(film => (
          <MoviesCard key={film.id} film={film} />
        ))}
      </ul>
      {showMoreButton && (
        <button className="cards__button" type="button" name="more" onClick={handleShowMore}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
