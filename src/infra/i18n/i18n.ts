import { createI18n } from 'vue-i18n';

import * as en from './locales/en.json';
import * as pt from './locales/pt-BR.json';

type MessageSchema = typeof en;

const SUPPORTED_LANGUAGES = ['en', 'pt'];

type SupportedLanguages = (typeof SUPPORTED_LANGUAGES)[number];

const messages: Readonly<Record<SupportedLanguages, MessageSchema>> = {
  en,
  pt,
};

const i18n = createI18n({
  messages,
});

function setupI18nLanguageByBrowser() {
  for (const lang of navigator.languages) {
    if (
      SUPPORTED_LANGUAGES.map((l) => l.split('-')[0]).includes(
        lang.split('-')[0],
      ) &&
      i18n.global.locale !== lang
    ) {
      i18n.global.locale = lang as SupportedLanguages;
      document.querySelector('html')!.lang = lang;
      document.title = 'DGS - ' + i18n.global.t('appName');
      return;
    }
  }
  i18n.global.locale = 'en';
}

setupI18nLanguageByBrowser();
addEventListener('languagechange', () => {
  setupI18nLanguageByBrowser();
});

export { i18n };
