import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translation.json';
import arTranslations from './locales/ar/translation.json';

// Retrieve the stored language or default to 'ar'
const storedLanguage = localStorage.getItem('i18nextLng') || 'ar';
const initialDirection = storedLanguage === 'ar' ? 'rtl' : 'ltr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations }
    },
    lng: storedLanguage, // Use stored language or default to 'ar'
    fallbackLng: 'ar',
    interpolation: { escapeValue: false },
    react: { useSuspense: false } // Optional if you want to disable suspense
  })
  .then(() => {
    // Set the direction based on the stored language
    document.documentElement.dir = initialDirection;
  });

// Update HTML element direction and store language preference based on language change
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  localStorage.setItem('i18nextLng', lng); // Store the language preference
});

export default i18n;
