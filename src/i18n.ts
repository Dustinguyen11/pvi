import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '@app/messages/en.lang'
import vi from '@app/messages/en.lang'

export const defaultNS = 'translations'
export const defaultLanguage = 'en'
export const resources = {
  en: {
    translations :en
  },
  vi: {
    translations: vi
  },
} as const;

i18n.use(LanguageDetector).init({
    lng: defaultLanguage,
    ns: ['translations'],
    defaultNS,
    resources,
    fallbackLng: defaultLanguage, 
    keySeparator: false,
  });

export function translateCell(cell: string) {
  return (i18n.t(cell));
}
export default i18n;