import './SearchForm.css';
import { useState } from "react";
import { SearchFormError } from "../../hooks/Validator";

function SearchForm() {
  const [searchValue, setSearchValue] = useState("");
  const [isInputActive, setInputActive] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleInputFocus = () => {
    setInputActive(true);
  };

  const handleInputBlur = () => {
    setInputActive(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Дополнительная логика для обработки отправки формы
  };

  const isSearchEmpty = searchValue.trim() === "";
  const isSearchError = isSearchEmpty && isInputActive;

  return (
    <form className="search" onSubmit={handleSubmit} noValidate>
      <div className="search__container">
        <label className="search__label">
          <input
            className={`search__input ${isSearchError ? "search__input_type_error" : ""}`}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={searchValue}
            type="text"
            placeholder="Фильм"
            id="search-input"
            name="search-input"
            autoComplete="off"
            required
          />
          {isSearchError && <span className="search__error">{ SearchFormError} </span>}
        </label>

        <button
          className={`search__button ${isSearchEmpty ? "search__button_disabled" : ""}`}
          type="submit"
          disabled={isSearchEmpty}
        >
          Найти
        </button>
      </div>

      <div className="search__filter">
        <label className="search__tumbler">
          <input className="search__checkbox" type="checkbox" />
          <span className="search__slider" />
        </label>
        <p className="search__tumbler-label">Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;
