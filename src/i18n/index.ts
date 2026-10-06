import { useApp } from '../context/AppContext';
import { Language } from '../types';

import en from './en';
import ta from './ta';
import hi from './hi';
import ml from './ml';

export const translations: Record<Language, any> = {
  en,
  ta,
  hi,
  ml
};

export const useTranslation = () => {
  const { language } = useApp();

  const t = (key: string, variables?: Record<string, string | number>) => {
    const keys = key.split('.');
    let value = translations[language] || translations['en'];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    if (value === undefined) {
      // Fallback to English
      value = translations['en'];
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }
    }

    if (typeof value === 'string' && variables) {
      return Object.keys(variables).reduce((str, vKey) => {
        return str.replace(new RegExp(`{{${vKey}}}`, 'g'), String(variables[vKey]));
      }, value);
    }

    return value || key;
  };

  return { t };
};
