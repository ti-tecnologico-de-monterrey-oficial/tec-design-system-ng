import { computed, Injectable, signal } from '@angular/core';
import es from '../../../assets/i18n/es.json';
import en from '../../../assets/i18n/en.json';

export interface BmbDictionaries {
  [key: string]: {
    [key: string]: string | {
      [key: string]: string | {
        [key: string]: string;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class BmbTranslationsService {
  private currentLanguage = signal<string>('es');
  private dictionaries = signal<{ [key: string]: BmbDictionaries }>({ es, en });
  private selectedDictionary = computed<BmbDictionaries>(() => {
    return this.dictionaries()[this.currentLanguage()];
  });

  getCurrentLanguage() {
    return this.currentLanguage();
  }

  setLanguage(lang: string) {
    if (this.dictionaries()[lang]) {
      this.currentLanguage.set(lang);
    } else {
      console.warn(
        `The selected language "${lang}" does not have an associated dictionary.`,
      );
    }
  }

  updateDictionary(
    lang: string,
    dictionary: BmbDictionaries,
  ) {
    this.dictionaries.update((dicts) => {
      dicts[lang] = {
        ...dicts[lang],
        ...dictionary,
      };
      return dicts;
    });
  }

  addDictionary(
    lang: string,
    dictionary: BmbDictionaries,
  ) {
    this.dictionaries.update((dicts) => {
      dicts[lang] = dictionary;
      return dicts;
    });
  }

  translate(keyList: string): string {
    return keyList.split('.').reduce((acc: any, clave: string) => {
      return acc && acc[clave] !== undefined ? acc[clave] : undefined;
    }, this.dictionaries()[this.currentLanguage()]) ?? keyList;
  }
}
