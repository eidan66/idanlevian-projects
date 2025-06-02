import { useTranslation } from "react-i18next";
import logo from '@/assets/logo.svg';

export const Navbar = ()=>{
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
  
    const toggleLang = () => {
      const next = lang === 'en' ? 'he' : 'en';
      i18n.changeLanguage(next);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center">
              <a
                href="https://idanlevian.com"
                className="flex-shrink-0"
              >
                <img
                  src={logo}
                  alt="Idan Levian logo"
                  className="h-16 w-auto p-1 rounded-md"
                />
              </a>
            </div>
            <button
              onClick={toggleLang}
              className="text-md text-sky-300 border border-sky-700 px-3 py-1 rounded hover:bg-sky-800 transition"
            >
              {lang === 'en' ? t('layout.switchHebrew') : t('layout.switchEnglish')}
            </button>
          </div>
        </div>
      </nav>
    )
}