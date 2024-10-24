import { createI18n } from 'vue-i18n';
import ko from '@/locales/ko.json';
import en from '@/locales/en.json';

const messages = {
  ko,
  en
};

const i18n = createI18n({
  locale: 'ko', // 기본 언어 설정
  fallbackLocale: 'en', // 기본 언어가 없을 때 대체할 언어
  messages,
});

export default i18n;
