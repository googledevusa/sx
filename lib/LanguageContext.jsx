'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  lang: 'bn',
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('bn');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}