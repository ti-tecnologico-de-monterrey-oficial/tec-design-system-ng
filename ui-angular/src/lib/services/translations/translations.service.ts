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
  private readonly currentLanguage = signal<string>('es');
  private readonly dictionaries = signal<{ [key: string]: BmbDictionaries }>({});
  private readonly translationsVersion = signal<number>(0);
  private defaultDictionariesLoadRequested = false;
  private readonly selectedDictionary = computed<BmbDictionaries>(() => {
    return this.dictionaries()[this.currentLanguage()] ?? {};
  });

  getCurrentLanguage() {
    return this.currentLanguage();
  }

  getTranslationVersion() {
    return this.translationsVersion();
  }

  setLanguage(lang: string) {
    this.ensureDefaultDictionariesLoaded();

    if (this.currentLanguage() === lang) {
      if (
        !this.dictionaries()[lang] &&
        !(this.defaultDictionariesLoadRequested && ['es', 'en'].includes(lang))
      ) {
        void this.loadDictionaryFromAssets(lang);
      }
      return;
    }

    if (!this.dictionaries()[lang]) {
      console.warn(
        `The selected language "${lang}" does not have an associated dictionary.`,
      );
      return;
    }

    this.currentLanguage.set(lang);
    this.bumpTranslationsVersion();
  }

  async loadDictionaryFromAssets(
    lang: string,
    basePath = '/assets/i18n',
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
      const updatedDictionary = {
        ...dicts[lang],
        ...dictionary,
      };

      return {
        ...dicts,
        [lang]: updatedDictionary,
      };
    });
    this.bumpTranslationsVersion();
  }

  addDictionary(lang: string, dictionary: BmbDictionaries) {
    this.dictionaries.update((dicts) => {
      return {
        ...dicts,
        [lang]: dictionary,
      };
    });
    this.bumpTranslationsVersion();
  }

  private bumpTranslationsVersion() {
    this.translationsVersion.update((version) => version + 1);
  }

  translate(keyList: string): string {
    this.ensureDefaultDictionariesLoaded();

    const translatedValue = keyList
      ?.split('.')
      .reduce((acc: any, key: string) => acc?.[key], this.selectedDictionary());

    return typeof translatedValue === 'string' ? translatedValue : keyList;
  }

  private ensureDefaultDictionariesLoaded() {
    const dictionaries = this.dictionaries();
    if (dictionaries['es'] && dictionaries['en']) {
      return;
    }

    if (this.defaultDictionariesLoadRequested) {
      return;
    }

    this.defaultDictionariesLoadRequested = true;
    void this.loadDictionaryFromAssets('es');
    void this.loadDictionaryFromAssets('en');
  }
}
