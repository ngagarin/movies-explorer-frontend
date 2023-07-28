import React from "react";
import "../AutocompleteList/AutocompleteList.css";
import clapperboard from "../../images/search/clapperboard.svg";

const AutocompleteList = ({ suggestions, onItemClick }) => {
  return (
    <ul className="autocomplete-list">
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.nameRU}
          className="autocomplete-item"
          onClick={() => onItemClick(suggestion)}
        >
          <img
            className="autocomplete-icon"
            src={clapperboard}
            alt="Хлопушка для киносъемок"
          />
          {suggestion.nameRU}
        </li>
      ))}
    </ul>
  );
};

export default AutocompleteList;
