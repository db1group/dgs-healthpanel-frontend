import { createI18n } from 'vue-i18n';

const en = (await import('./locales/en.json')).default;
const pt = (await import('./locales/pt-BR.json')).default;

type MessageSchema = typeof en;

const SUPPORTED_LANGUAGES = ['en', 'pt'] as const;

type SupportedLanguages = (typeof SUPPORTED_LANGUAGES)[number];

const messages: Record<(typeof SUPPORTED_LANGUAGES)[number], MessageSchema> = {
  en,
  pt,
};

const i18n = createI18n<[MessageSchema], SupportedLanguages>({
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
      i18n.global.locale = lang as (typeof SUPPORTED_LANGUAGES)[number];
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
