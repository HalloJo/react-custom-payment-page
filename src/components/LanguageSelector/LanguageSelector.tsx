import React, { useState } from "react";
import { Language } from "../../types/types";
import "./LanguageSelector.scss";
import chevron from "../../assets/chevron-down.svg";
import { languages } from "../../data/Content";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    emoji: "🇳🇱",
    title: "Nederlands",
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="language">
      <div className="language__selected" onClick={toggleDropdown}>
        <span>{selectedLanguage.emoji}</span> <p>{selectedLanguage.title}</p>
        <span className="language__chevron">
          <img src={chevron} className={`${isOpen ? "open" : ""}`} />
        </span>
      </div>
      {isOpen && (
        <ul className="language__dropdown">
          {languages.map((language, index) => (
            <li
              key={index}
              className="language__dropdown_item"
              onClick={() => selectLanguage(language)}
            >
              <span>{language.emoji}</span> {language.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
