import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'
import es from './locales/es/translation.json'

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es }
  },
  lng: localStorage.getItem('language') || 'en', // default language from localStorage or 'en'
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // React already escapes values
  }
})

export default i18next
