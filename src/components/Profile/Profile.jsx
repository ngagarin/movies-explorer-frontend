import "./Profile.css";
import React, { useState, useEffect, useContext } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { validateField } from "../../hooks/Validator";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

function Profile({
  onLogout,
  onUpdateUser,
  isBurgerMenuOpen,
  onBurgerMenuClose,
  isFormDisabled,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nameDirty: false,
    emailDirty: false,
    isFormDirty: false,
    isDataChanged: false,
    isLoading: true,
  });

  const {
    name,
    email,
    nameDirty,
    emailDirty,
    isFormDirty,
    isDataChanged,
    isLoading,
  } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [`${name}Dirty`]: true,
      isDataChanged: value !== currentUser[name],
      isFormDirty: true,
    }));
  };

  const resetForm = () => {
    setFormData({
      ...formData,
      name: currentUser.name || "",
      email: currentUser.email || "",
      nameDirty: false,
      emailDirty: false,
      isFormDirty: false,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData((prevData) => ({ ...prevData }));
    try {
      await onUpdateUser({
        name: formData.name,
        email: formData.email,
      });
      setFormData((prevData) => ({
        ...prevData,
        isDataChanged: false,
        isFormDirty: false,
      }));
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setFormData((prevData) => ({ ...prevData }));
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFormData((prevData) => ({
          ...prevData,
          name: currentUser.name || "",
          email: currentUser.email || "",
          isDataChanged: false,
          isFormDirty: false,
          isLoading: currentUser.name === undefined,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const nameError = validateField(name, { isEmpty: true, minLength: 2 });
  const emailError = validateField(email, { isEmpty: true, isEmail: true });
  const isSubmitButtonDisabled =
    !isFormDirty || nameError || emailError || !isDataChanged;

  return (
    <section className="profile">
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h2 className="profile__form-title">{`Привет, ${currentUser.name}!`}</h2>

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
                    onChange={handleInputChange}
                    onFocus={() =>
                      setFormData({ ...formData, nameDirty: true })
                    }
                    onBlur={() =>
                      setFormData({ ...formData, nameDirty: false })
                    }
                    value={name}
                    type="text"
                    placeholder="Имя"
                    id="profile-name-input"
                    name="name"
                    autoComplete="off"
                    minLength="2"
                    maxLength="40"
                    disabled={isFormDisabled}
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
                    onChange={handleInputChange}
                    onFocus={() =>
                      setFormData({ ...formData, emailDirty: true })
                    }
                    onBlur={() =>
                      setFormData({ ...formData, emailDirty: false })
                    }
                    value={email}
                    type="email"
                    placeholder="Email"
                    id="profile-email-input"
                    name="email"
                    autoComplete="off"
                    disabled={isFormDisabled}
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
            isSubmitButtonDisabled || isFormDisabled ? "profile__button_disabled" : ""
          }`}
          type="submit"
          disabled={isSubmitButtonDisabled || isFormDisabled}
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
