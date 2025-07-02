import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import he from '../i18n/locales/he.json';
import en from '../i18n/locales/en.json';

export type Language = 'he' | 'en';

export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  direction: 'ltr' | 'rtl';
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const translations: Record<Language, Record<string, string>> = {
  he,
  en,
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [language, setLanguage] = useState<Language>('he');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    }
  }, [language]);

  const t = (key: string): string => translations[language]?.[key] || key;
  const direction: 'ltr' | 'rtl' = language === 'he' ? 'rtl' : 'ltr';
  const value: AppContextType = { language, setLanguage, t, direction };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
