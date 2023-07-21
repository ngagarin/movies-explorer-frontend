import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Form/Form.css";
import Logo from "../Logo/Logo";
import { validateField } from "../../hooks/Validator";
import showPasswordImage from "../../images/password/show_pass.svg";
import hidePasswordImage from "../../images/password/hide_pass.svg";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  const emailError = validateField(email, { isEmpty: true, isEmail: true });
  const passwordError = validateField(password, {
    isEmpty: true,
    minLength: 6,
  });

  const inputValid = emailError === "" && passwordError === "";

  // меняем данные формы, если не помещается в высоту дисплея
  const isDisplayHigherThenContainer = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const isHeightSmallerThan740px = windowHeight < 562;
    const isWidthGreaterThan480px = windowWidth > 480;

    return isHeightSmallerThan740px && isWidthGreaterThan480px;
  };

  return (
    <section
      className={`form ${
        isDisplayHigherThenContainer() ? "form_type_min-height" : ""
      }`}
    >
      <div
        className={`form__header ${
          isDisplayHigherThenContainer() ? "form__header_type_min-height" : ""
        }`}
      >
        <Logo />
        <h2
          className={`form__title ${
            isDisplayHigherThenContainer() ? "form__title_type_min-height" : ""
          }`}
        >
          Рады видеть!
        </h2>
      </div>

      <form className="form__items" id="LoginForm" onSubmit={handleSubmit}>
        <label className="form__label">
          <p className="form__input-name">E-mail</p>
          <input
            className={`form__input ${
              emailDirty && emailError ? "form__input_type_error" : ""
            }`}
            onChange={handleEmailInput}
            onFocus={() => setEmailDirty(true)}
            onBlur={() => setEmailDirty(false)}
            value={email}
            type="email"
            placeholder="Введите ваш Email"
            id="login-email-input"
            name="login-email-input"
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
              passwordDirty && passwordError ? "form__input_type_error" : ""
            }`}
            onChange={handlePasswordInput}
            onFocus={() => setPasswordDirty(true)}
            onBlur={() => setPasswordDirty(false)}
            value={password}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Введите пароль"
            id="login-password-input"
            name="login-password-input"
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
      </form>

      <div className="form__footer">
        <button
          form="LoginForm"
          className={`form__button ${
            !inputValid ? "form__button_disabled" : ""
          }`}
          type="submit"
          disabled={!inputValid}
        >
          Войти
        </button>

        <p className="form__caption">
          Ещё не зарегистрированы?
          <span className="form__caption-span">
            <Link to="/sign-up" className="form__link">
              Регистрация
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
}

export default Login;
