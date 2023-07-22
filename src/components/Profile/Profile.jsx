import React, { useState, useEffect } from "react";
import "./Profile.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { validateField } from "../../hooks/Validator";
import Preloader from "../Preloader/Preloader";
import MainApi from "../../utils/MainApi";

function Profile({
  onLogout,
  onUpdateUser,
  isBurgerMenuOpen,
  onBurgerMenuClose,
}) {
  const [currentName, setCurrentlName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameDirty(true);
    setIsFormDirty(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailDirty(true);
    setIsFormDirty(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onUpdateUser({
        name: name,
        email: email,
      });
      setCurrentlName(name);

      setIsFormDirty(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await MainApi.getUserInfo();
        setName(userData.name || "");
        setCurrentlName(userData.name || "");
        setEmail(userData.email || "");
        setIsFormDirty(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const nameError = validateField(name, { isEmpty: true, minLength: 2 });
  const emailError = validateField(email, { isEmpty: true, isEmail: true });
  const isSubmitButtonDisabled = !isFormDirty || nameError || emailError;

  return (
    <section className="profile">
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h2 className="profile__form-title">Привет, {currentName}!</h2>

          <form
            className="profile__form"
            id="ProfileForm"
            onSubmit={handleSubmit}
          >
            <ul className="profile__form-container">
              <li className="profile__form-item">
                <p className="profile__field-label">Имя</p>

                <label className="profile__item">
                  <input
                    className={`profile__input ${
                      nameDirty || nameError ? "profile__input_type_error" : ""
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
                      emailDirty || emailError
                        ? "profile__input_type_error"
                        : ""
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
        </>
      )}

      <div className="profile__form-buttons">
        <button
          form="ProfileForm"
          className={`profile__button ${
            isSubmitButtonDisabled ? "profile__button_disabled" : ""
          }`}
          type="submit"
          disabled={isSubmitButtonDisabled}
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
