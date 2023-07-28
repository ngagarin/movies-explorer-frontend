import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Form/Form.css";
import Logo from "../Logo/Logo";
import { validateField } from "../../hooks/Validator";
import showPasswordImage from "../../images/password/show_pass.svg";
import hidePasswordImage from "../../images/password/hide_pass.svg";

function Register({ onRegister, isFormDisabled }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameDirty: false,
    emailDirty: false,
    passwordDirty: false,
    confirmPasswordDirty: false,
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
  });

  const {
    name,
    email,
    password,
    confirmPassword,
    nameDirty,
    emailDirty,
    passwordDirty,
    confirmPasswordDirty,
    isPasswordVisible,
    isConfirmPasswordVisible,
  } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [`${name}Dirty`]: true,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData((prevData) => ({ ...prevData }));
    try {
      await onRegister(name, email, password);
      setFormData((prevData) => ({
        ...prevData,
        isDataChanged: false,
        isFormDirty: false,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setFormData((prevData) => ({ ...prevData }));
    }
  };

  const nameError = validateField(name, { isEmpty: true, minLength: 2 });
  const emailError = validateField(email, { isEmpty: true, isEmail: true });
  const passwordError = validateField(password, { isEmpty: true, minLength: 6 });
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
              nameDirty && nameError ? "form__input_type_error" : ""
            }`}
            onChange={handleInputChange}
            onFocus={() => setFormData((prevData) => ({ ...prevData, nameDirty: true }))}
            onBlur={() => setFormData((prevData) => ({ ...prevData, nameDirty: false }))}
            value={name}
            type="text"
            placeholder="Имя"
            id="register-name-input"
            name="name"
            minLength="2"
            maxLength="40"
            autoComplete="off"
            disabled={isFormDisabled}
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
              emailDirty && emailError ? "form__input_type_error" : ""
            }`}
            onChange={handleInputChange}
            onFocus={() => setFormData((prevData) => ({ ...prevData, emailDirty: true }))}
            onBlur={() => setFormData((prevData) => ({ ...prevData, emailDirty: false }))}
            value={email}
            type="email"
            placeholder="Введите ваш Email"
            id="register-email-input"
            name="email"
            autoComplete="off"
            disabled={isFormDisabled}
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
            onChange={handleInputChange}
            onFocus={() => setFormData((prevData) => ({ ...prevData, passwordDirty: true }))}
            onBlur={() => setFormData((prevData) => ({ ...prevData, passwordDirty: false }))}
            value={password}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Введите пароль"
            id="register-password-input"
            name="password"
            minLength="6"
            autoComplete="off"
            disabled={isFormDisabled}
            required
          />
          <div
            className="form__password-icon"
            onClick={() => setFormData((prevData) => ({ ...prevData, isPasswordVisible: !prevData.isPasswordVisible }))}
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
              confirmPasswordDirty && confirmPasswordError
                ? "form__input_type_error"
                : ""
            }`}
            onChange={handleInputChange}
            onFocus={() => setFormData((prevData) => ({ ...prevData, confirmPasswordDirty: true }))}
            onBlur={() => setFormData((prevData) => ({ ...prevData, confirmPasswordDirty: false }))}
            value={confirmPassword}
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Повторите пароль"
            id="register-password-confirm-input"
            name="confirmPassword"
            minLength="6"
            autoComplete="off"
            disabled={isFormDisabled}
            required
          />
          <div
            className="form__password-icon"
            onClick={() =>
              setFormData((prevData) => ({ ...prevData, isConfirmPasswordVisible: !prevData.isConfirmPasswordVisible }))
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
            !inputValid || isFormDisabled ? "form__button_disabled" : ""
          }`}
          type="submit"
          disabled={!inputValid || isFormDisabled}
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
