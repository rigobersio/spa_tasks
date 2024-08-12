import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [castelian, setCastelian] = useState(false);

  // Al montar el componente, verifica el idioma en sessionStorage
  useEffect(() => {
    const storedLanguage = sessionStorage.getItem('language');
    if (storedLanguage === 'castelian') {
      setCastelian(true);
    } else {
      setCastelian(false);
    }
  }, []);

  // Cambia el idioma y guarda la selección en sessionStorage
  const changeLanguage = (isCastelian) => {
    setCastelian(isCastelian);
    sessionStorage.setItem('language', isCastelian ? 'castelian' : 'english');
  };

  return (
    <LanguageContext.Provider value={{ castelian, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};