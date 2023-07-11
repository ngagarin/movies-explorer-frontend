import React, { useEffect } from "react";
import "./BurgerMenu.css";
import { NavLink } from "react-router-dom";

function BurgerMenu({ isOpen, onClose }) {
  const handleLinkClick = () => {
    onClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("burger-menu-container")) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("root_type_hidden");
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.classList.remove("root_type_hidden");
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`burger-menu-container ${isOpen ? "burger-menu-container_open" : ""}`}>
      <nav className="burger-menu">
        <button className="burger-menu__close-button" type="button" onClick={onClose}></button>
        <ul className="burger-menu__links">
          <li>
            <NavLink exact={true.toString()} to="/" className={({ isActive }) => isActive ? "burger-menu__active-link" : "burger-menu__link"} onClick={handleLinkClick}>Главная</NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={({ isActive }) => isActive ? "burger-menu__active-link" : "burger-menu__link"} onClick={handleLinkClick}>Фильмы</NavLink>
          </li>
          <li>
            <NavLink to="/saved-movies" className={({ isActive }) => isActive ? "burger-menu__active-link" : "burger-menu__link"} onClick={handleLinkClick}>Сохранённые фильмы</NavLink>
          </li>
        </ul>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "burger-menu__active-link burger-menu__link_with-icon" : "burger-menu__link burger-menu__link_with-icon"} onClick={handleLinkClick}>
          <span className="burger-menu__link-text">Аккаунт</span>
          <div className="burger-menu__link-icon"></div>
        </NavLink>
      </nav>
    </div>
  );
}

export default BurgerMenu;
