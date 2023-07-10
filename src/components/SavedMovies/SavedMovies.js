import './SavedMovies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ isBurgerMenuOpen, onBurgerMenuClose }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <SearchForm />
      <section className="saved-movies">
        {
          isLoading ?
            <Preloader />
            :
            <>
              <MoviesCardList/>
            </>
        }
      </section>
    </>
  );
};

export default SavedMovies;
