import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
