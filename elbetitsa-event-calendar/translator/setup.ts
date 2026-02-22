import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTr from './en.json';
import bgTr from './bg.json';

i18n
.use(initReactI18next)
.init({
  resources: {
    en: { translation: enTr },
    bg: { translation: bgTr },
  }, 
  lng: 'bg',
  fallbackLng: 'bg',
  supportedLngs: ['bg', 'en'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;