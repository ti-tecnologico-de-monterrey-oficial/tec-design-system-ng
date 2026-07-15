import { computed, Injectable, signal } from '@angular/core';

export interface BmbDictionaries {
  [key: string]: {
    [key: string]:
      | string
      | {
          [key: string]:
            | string
            | {
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
  private dictionaries = signal<{ [key: string]: BmbDictionaries }>({});
  private selectedDictionary = computed<BmbDictionaries>(() => {
    return this.dictionaries()[this.currentLanguage()] ?? {};
  });

  constructor() {
    void this.loadDictionaryFromAssets('es');
    void this.loadDictionaryFromAssets('en');
  }

  getCurrentLanguage() {
    return this.currentLanguage();
  }

  setLanguage(lang: string) {
    this.currentLanguage.set(lang);

    if (!this.dictionaries()[lang]) {
      void this.loadDictionaryFromAssets(lang);
    }
  }

  async loadDictionaryFromAssets(
    lang: string,
    basePath: string = '/assets/i18n',
  ): Promise<boolean> {
    try {
      const response = await fetch(`${basePath}/${lang}.json`);

      if (!response.ok) {
        console.warn(
          `Could not load dictionary for language "${lang}" from ${basePath}.`,
        );
        return false;
      }

      const dictionary = (await response.json()) as BmbDictionaries;
      this.addDictionary(lang, dictionary);
      return true;
    } catch {
      console.warn(
        `An error occurred while loading dictionary for language "${lang}" from ${basePath}.`,
      );
      return false;
    }
  }

  updateDictionary(lang: string, dictionary: BmbDictionaries) {
    this.dictionaries.update((dicts) => {
      dicts[lang] = {
        ...dicts[lang],
        ...dictionary,
      };
      return dicts;
    });
  }

  addDictionary(lang: string, dictionary: BmbDictionaries) {
    this.dictionaries.update((dicts) => {
      dicts[lang] = dictionary;
      return dicts;
    });
  }

  translate(keyList: string): string {
    const translatedValue = keyList?.split('.').reduce((acc: any, key: string) => {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, this.selectedDictionary());

    return typeof translatedValue === 'string' ? translatedValue : keyList;
  }
}
