import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Form/Form.css";
import Logo from "../Logo/Logo";
import { validateField } from "../../hooks/Validator";
import showPasswordImage from "../../images/password/show_pass.svg";
import hidePasswordImage from "../../images/password/hide_pass.svg";

function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  function handleNamelInput(event) {
    const { value } = event.target;
    setName(value);
    setNameDirty(true);
  }

  function handleEmailInput(event) {
    const { value } = event.target;
    setEmail(value);
    setEmailDirty(true);
  }

  function handlePasswordInput(event) {
    const { value } = event.target;
    setPassword(value);
    setPasswordDirty(true);
  }

  function handleConfirmPasswordInput(event) {
    const { value } = event.target;
    setConfirmPassword(value);
    setConfirmPasswordDirty(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(name, email, password);
  }

  const nameError = validateField(name, { isEmpty: true, minLength: 2 });
  const emailError = validateField(email, { isEmpty: true, isEmail: true });
  const passwordError = validateField(password, {
    isEmpty: true,
    minLength: 6,
  });
  const confirmPasswordError = validateField(confirmPassword, {
    isEmpty: true,
    isPasswordMatch: true,
    password,
  });

  const inputValid =
    nameError === "" &&
    emailError === "" &&
    passwordError === "" &&
    confirmPasswordError === "";

  const isDisplayHigherThanContainer = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const isHeightSmallerThan740px = windowHeight < 740;
    const isWidthGreaterThan480px = windowWidth > 480;
    return isHeightSmallerThan740px && isWidthGreaterThan480px;
  };

  return (
    <section
      className={`form ${
        isDisplayHigherThanContainer() ? "form_type_min-height" : ""
      }`}
    >
      <div
        className={`form__header ${
          isDisplayHigherThanContainer() ? "form__header_type_min-height" : ""
        }`}
      >
        <Logo />
        <h2
          className={`form__title ${
            isDisplayHigherThanContainer() ? "form__title_type_min-height" : ""
          }`}
        >
          Добро пожаловать!
        </h2>
      </div>

      <form className="form__items" id="RegisterForm" onSubmit={handleSubmit}>
        <label className="form__label">
          <p className="form__input-name">Имя</p>
          <input
            className={`form__input ${
              nameError ? "form__input_type_error" : ""
            }`}
            onChange={handleNamelInput}
            onFocus={() => setNameDirty(true)}
            onBlur={() => setNameDirty(false)}
            value={name}
            type="text"
            placeholder="Имя"
            id="register-name-input"
            name="register-name-input"
            minLength="2"
            maxLength="40"
            autoComplete="off"
            required
          />
          {nameDirty && nameError && (
            <span className="form__error">{nameError}</span>
          )}
        </label>

        <label className="form__label">
          <p className="form__input-name">E-mail</p>
          <input
            className={`form__input ${
              emailError ? "form__input_type_error" : ""
            }`}
            onChange={handleEmailInput}
            onFocus={() => setEmailDirty(true)}
            onBlur={() => setEmailDirty(false)}
            value={email}
            type="email"
            placeholder="Введите ваш Email"
            id="register-email-input"
            name="register-email-input"
            autoComplete="off"
            required
          />
          {emailDirty && emailError && (
            <span className="form__error">{emailError}</span>
          )}
        </label>

        <label className="form__label form__password">
          <p className="form__input-name">Пароль</p>
          <input
            className={`form__input ${
              passwordError ? "form__input_type_error" : ""
            }`}
            onChange={handlePasswordInput}
            onFocus={() => setPasswordDirty(true)}
            onBlur={() => setPasswordDirty(false)}
            value={password}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Введите пароль"
            id="register-password-input"
            name="register-password-input"
            minLength="6"
            autoComplete="off"
            required
          />
          <div
            className="form__password-icon"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <img
              className="form__password-image"
              src={isPasswordVisible ? hidePasswordImage : showPasswordImage}
              alt={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
            />
          </div>
          {passwordDirty && passwordError && (
            <span className="form__error">{passwordError}</span>
          )}
        </label>

        <label className="form__label form__password">
          <p className="form__input-name">Подтверждение пароля</p>
          <input
            className={`form__input ${
              confirmPasswordError ? "form__input_type_error" : ""
            }`}
            onChange={handleConfirmPasswordInput}
            onFocus={() => setConfirmPasswordDirty(true)}
            onBlur={() => setConfirmPasswordDirty(false)}
            value={confirmPassword}
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Повторите пароль"
            id="register-password-confirm-input"
            name="register-password-confirm-input"
            minLength="6"
            autoComplete="off"
            required
          />
          <div
            className="form__password-icon"
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            <img
              className="form__password-image"
              src={
                isConfirmPasswordVisible ? hidePasswordImage : showPasswordImage
              }
              alt={
                isConfirmPasswordVisible ? "Скрыть пароль" : "Показать пароль"
              }
            />
          </div>
          {confirmPasswordDirty && confirmPasswordError && (
            <span className="form__error">{confirmPasswordError}</span>
          )}
        </label>
      </form>

      <div className="form__footer">
        <button
          form="RegisterForm"
          className={`form__button ${
            !inputValid ? "form__button_disabled" : ""
          }`}
          type="submit"
          disabled={!inputValid}
        >
          Зарегистрироваться
        </button>

        <p className="form__caption">
          Уже зарегистрированы?
          <span className="form__caption-span">
            <Link to="/sign-in" className="form__link">
              Войти
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
}

export default Register;
