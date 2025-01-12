import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your Arabic translation resources
import arTranslation from './locales/ar/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: arTranslation,
      },
    },
    lng: 'ar',                   // Set default language to Arabic
    fallbackLng: false,          // Disable fallback to another language
    interpolation: {
      escapeValue: false,        // React already escapes values
    },
    react: {
      useSuspense: false,        // Optional: Disable suspense for loading translations
    },
  });

export default i18n;
