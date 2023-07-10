import "./Profile.css";
import React, { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { validateField } from "../../hooks/Validator";

function Profile({ onLogout, isBurgerMenuOpen, onBurgerMenuClose }) {
  const currentUser = {
    "name": "Гость",
    "email": "test@test.ts",
  };

  const [name, setName] = useState(currentUser.name || "");
  const [email, setEmail] = useState(currentUser.email || "");
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameDirty(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailDirty(true);
  };

  const handleSubmit = (event) => {
    console.log({
      name: name,
      email: email,
    });
    event.preventDefault();
  };

  const nameError = validateField(name, { isEmpty: true, minLength: 2 });
  const emailError = validateField(email, { isEmpty: true, isEmail: true });

  const isFormValid = nameError === "" && emailError === "";

  return (
    <section className="profile">
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      <h2 className="profile__form-title">Привет, {currentUser.name}!</h2>

      <form className="profile__form" id="ProsileForm" onSubmit={handleSubmit}>
        <ul className="profile__form-container">
          <li className="profile__form-item">
            <p className="profile__field-label">Имя</p>

            <label className="profile__item">
              <input
                className={`profile__input ${
                  nameDirty && nameError ? "profile__input_type_error" : ""
                }`}
                onChange={handleNameChange}
                onFocus={() => setNameDirty(true)}
                onBlur={() => setNameDirty(false)}
                value={name}
                type="text"
                placeholder="Имя"
                id="profile-name-input"
                name="profile-name-input"
                autoComplete="off"
                minLength="2"
                maxLength="40"
                required
              />
              {nameDirty && nameError && (
                <span className="profile__input-error">{nameError}</span>
              )}
            </label>
          </li>

          <li className="profile__form-item">
            <p className="profile__field-label">E-mail</p>

            <label className="profile__item">
              <input
                className={`profile__input ${
                  emailDirty && emailError ? "profile__input_type_error" : ""
                }`}
                onChange={handleEmailChange}
                onFocus={() => setEmailDirty(true)}
                onBlur={() => setEmailDirty(false)}
                value={email}
                type="email"
                placeholder="Email"
                id="profile-email-input"
                name="profile-email-input"
                autoComplete="off"
                required
              />
              {emailDirty && emailError && (
                <span className="profile__input-error">{emailError}</span>
              )}
            </label>
          </li>
          </ul>
      </form>

          <div className="profile__form-buttons">
            <button
              form="ProsileForm"
              className={`profile__button ${
                !isFormValid ? "profile__button_disabled" : ""
              }`}
              type="submit"
              disabled={!isFormValid}
            >
              Редактировать
            </button>

            <button
              className="profile__button profile__button_type_highlighted"
              type="button"
              onClick={onLogout}
            >
              Выйти из аккаунта
            </button>
          </div>

    </section>
  );
}

export default Profile;
