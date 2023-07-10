import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import Preloader from '../Preloader/Preloader';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ isBurgerMenuOpen, onBurgerMenuClose }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} onCloseOverlay={onBurgerMenuClose}/>
      <SearchForm />
      <section className="movies">
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
}

export default Movies;
