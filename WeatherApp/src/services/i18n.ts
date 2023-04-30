import {NativeModules, Platform} from 'react-native';

type StringResource = typeof import('../locales/en.json');

const translations: Record<string, StringResource> = {
  en: require('../locales/en.json'),
};

export function getTranslation(): StringResource {
  const locale = getLocale();
  return translations[locale] || translations.en;
}

export const getLocale = () => {
  return Platform.select({
    ios:
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0],
    android: NativeModules.I18nManager.localeIdentifier,
  });
};
