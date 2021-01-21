import { store } from '@opensrp/store';
import { Dictionary } from '@onaio/utils';
import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getConfigsFactory } from './ducks';

export type LanguageCode = 'en' | 'sw';
export type ProjectLanguageCode = 'eusm' | 'core';

/** interface for configs for this package */
export interface LanguageConfigs {
  languageCode?: LanguageCode;
  projectLanguageCode?: ProjectLanguageCode;
}

export interface LanguageResource {
  translation: Dictionary;
}

export interface LanguageResources {
  en_core?: LanguageResource;
  sw_core?: LanguageResource;
  en_eusm?: LanguageResource;
  sw_eusm?: LanguageResource;
}

/** gets configs from the store */
export const getConfigs = (): LanguageConfigs => {
  const configsSelector = getConfigsFactory();
  const allConfigs = configsSelector(store.getState());
  return allConfigs;
};

export const initializei18n = (opensrpResources: LanguageResources) => {
  // const configurable:
  const languageCode = getConfigs().languageCode ?? 'en';
  const projectLanguageCode = getConfigs().projectLanguageCode ?? 'core';
  const resources = (opensrpResources as unknown) as Resource;

  i18n
    .use(initReactI18next)
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      resources,
      lng: `${languageCode}_${projectLanguageCode}`,
      fallbackLng: `${languageCode}_${projectLanguageCode}`,
      interpolation: { escapeValue: false },
      returnEmptyString: false,
    })
    .catch((err) => err);
};
