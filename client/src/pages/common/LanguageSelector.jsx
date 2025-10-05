import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = ['ar', 'he', 'fa', 'ur'].includes(lng) ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-selector-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative language-selector-container">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-400 hover:text-white text-sm transition-colors"
        aria-label="Select language"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FaGlobe className="mr-1" /> {i18n.language.toUpperCase()}
      </button>
      
      {isOpen && (
        <div 
          className="absolute bottom-full left-0 mb-2 w-32 bg-gray-800 rounded-md shadow-lg py-1 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {Object.entries(t('common.language', { returnObjects: true })).map(([code, name]) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                i18n.language === code 
                  ? 'bg-amber-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;