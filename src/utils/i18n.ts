import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import nlTranslations from "../../public/locales/nl/translation.json";
import enTranslations from "../../public/locales/en/translation.json";

const isDev = import.meta.env.DEV;

const resources = {
  nl: {
    translation: nlTranslations,
  },
  en: {
    translation: enTranslations,
  },
};

i18n
  // Detect user language from browser
  .use(LanguageDetector)
  // Bind i18next to React
  .use(initReactI18next)
  .init({
    resources,
    debug: isDev,
    fallbackLng: "en",
    supportedLngs: ["nl", "en"],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
