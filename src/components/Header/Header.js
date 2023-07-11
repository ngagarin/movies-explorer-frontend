import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';

function Header({ isLoggedIn, isLanding, onButtonClick, onBurgerClick }) {
  return (
      <header className={`header ${isLanding ? "header_type_landing" : ""}`}>
        <div className="header__left-section">
          <Logo />
        </div>
        <div className="header__middle-section">
          <nav className="nav-bar">
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/movies"
                  className={({ isActive }) => isActive? "nav-bar__link_active": "nav-bar__link nav-bar__link_type_hidden"}
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={({ isActive }) => isActive? "nav-bar__link_active": "nav-bar__link nav-bar__link_type_hidden"}
                >
                  Сохранённые фильмы
                </NavLink>
              </>
            ) : null}
          </nav>
        </div>
        <div className="header__right-section">
          <nav className="nav-bar">
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => isActive? "nav-bar__link_active nav-bar__link_with-icon": "nav-bar__link nav-bar__link_type_hidden nav-bar__link_with-icon"}
                >
                  <span>Аккаунт</span>
                  <div className={`nav-bar__link-icon ${isLanding ? "nav-bar__link-icon_type_landing" : ""}`}></div>
                </NavLink>
                <button className="burger-button" type="button" onClick={onBurgerClick}></button>
              </>
            ) : (
              <>
                <NavLink to="/sign-up" className="nav-bar__link nav-bar__link_type_non-login">Регистрация</NavLink>
                <button className="nav-bar__button" onClick={onButtonClick}>Войти</button>
              </>
            )}
          </nav>
        </div>
      </header>
  );
}

export default Header;
