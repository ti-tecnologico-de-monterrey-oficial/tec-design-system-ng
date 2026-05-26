import { TestBed } from '@angular/core/testing';
import {
  BmbTranslationsService,
  BmbDictionaries,
} from './translations.service';
import es from '../../../assets/i18n/es.json';
import en from '../../../assets/i18n/en.json';

describe('BmbTranslationsService', () => {
  let service: BmbTranslationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BmbTranslationsService],
    });
    service = TestBed.inject(BmbTranslationsService);
  });

  function getAllKeys(obj: any, prefix = ''): string[] {
    let keys: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (
          typeof obj[key] === 'object' &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          keys = keys.concat(getAllKeys(obj[key], path));
        } else {
          keys.push(path);
        }
      }
    }
    return keys;
  }

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with Spanish as default language', () => {
      expect(service.getCurrentLanguage()).toBe('es');
    });

    it('should have es and en dictionaries loaded by default', () => {
      expect(service.translate('account_statement.title')).toBe(
        'Estado de cuenta',
      );
      service.setLanguage('en');
      expect(service.translate('account_statement.title')).toBe(
        'Account Statement',
      );
    });
  });

  describe('Language Management', () => {
    it('should get current language', () => {
      expect(service.getCurrentLanguage()).toBe('es');
    });

    it('should change language to English', () => {
      service.setLanguage('en');
      expect(service.getCurrentLanguage()).toBe('en');
    });

    it('should change language to Spanish', () => {
      service.setLanguage('es');
      expect(service.getCurrentLanguage()).toBe('es');
    });

    it('should not change language if dictionary does not exist', () => {
      spyOn(console, 'warn');
      const initialLang = service.getCurrentLanguage();

      service.setLanguage('fr');

      expect(service.getCurrentLanguage()).toBe(initialLang);
      expect(console.warn).toHaveBeenCalledWith(
        'The selected language "fr" does not have an associated dictionary.',
      );
    });

    it('should warn when trying to set non-existent language', () => {
      spyOn(console, 'warn');

      service.setLanguage('invalid');

      expect(console.warn).toHaveBeenCalledWith(
        'The selected language "invalid" does not have an associated dictionary.',
      );
    });
  });

  describe('Dictionary Management', () => {
    it('should add new dictionary', () => {
      const frenchDict: BmbDictionaries = {
        account_statement: {
          title: 'État du compte',
        },
        common: {
          save: 'Sauvegarder',
        },
      };

      service.addDictionary('fr', frenchDict);
      service.setLanguage('fr');

      expect(service.getCurrentLanguage()).toBe('fr');
      expect(service.translate('account_statement.title')).toBe(
        'État du compte',
      );
      expect(service.translate('common.save')).toBe('Sauvegarder');
    });

    it('should update existing dictionary', () => {
      const originalTranslation = service.translate('account_statement.title');

      const updates: BmbDictionaries = {
        account_statement: {
          title: 'Nuevo Estado de Cuenta',
        },
        new_section: {
          test: 'Prueba',
        },
      };

      service.updateDictionary('es', updates);

      expect(service.translate('account_statement.title')).toBe(
        'Nuevo Estado de Cuenta',
      );
      expect(service.translate('new_section.test')).toBe('Prueba');
      // Should preserve existing translations
      expect(service.translate('advertisement_card.title')).toBe(
        'Mis anuncios',
      );
    });

    it('should preserve existing keys when updating dictionary', () => {
      const originalValue = service.translate(
        'account_statement.label_primary',
      );

      const partialUpdate: BmbDictionaries = {
        new_category: {
          new_key: 'New Value',
        },
      };

      service.updateDictionary('es', partialUpdate);

      expect(service.translate('account_statement.label_primary')).toBe(
        originalValue,
      );
      expect(service.translate('new_category.new_key')).toBe('New Value');
    });
  });

  describe('Translation Function', () => {
    it('should translate simple keys', () => {
      expect(service.translate('account_statement.title')).toBe(
        'Estado de cuenta',
      );
    });

    it('should translate nested keys', () => {
      expect(service.translate('account_statement.label_primary')).toBe(
        'Cuota Mensual',
      );
    });

    it('should translate deep nested keys', () => {
      // Add a deep nested structure for testing
      const deepDict: BmbDictionaries = {
        deep: {
          level: {
            test: 'Deep Value',
          },
        },
      };

      service.updateDictionary('es', deepDict);
      expect(service.translate('deep.level.test')).toBe('Deep Value');
    });

    it('should return original key if translation not found', () => {
      expect(service.translate('non.existent.key')).toBe('non.existent.key');
    });

    it('should return original key for empty string', () => {
      expect(service.translate('')).toBe('');
    });

    it('should handle partial path matches', () => {
      expect(service.translate('account_statement.non_existent')).toBe(
        'account_statement.non_existent',
      );
    });

    it('should translate in different languages', () => {
      // Spanish
      service.setLanguage('es');
      expect(service.translate('account_statement.title')).toBe(
        'Estado de cuenta',
      );

      // English
      service.setLanguage('en');
      expect(service.translate('account_statement.title')).toBe(
        'Account Statement',
      );
    });

    it('should handle keys with single level', () => {
      const singleLevelDict: BmbDictionaries = {
        category: {
          simple: 'Simple Value',
        },
      };

      service.updateDictionary('es', singleLevelDict);
      expect(service.translate('category.simple')).toBe('Simple Value');
    });

    it('should handle special characters in keys', () => {
      const specialDict: BmbDictionaries = {
        'special-key': {
          with_underscore: 'Special Value',
        },
      };

      service.updateDictionary('es', specialDict);
      expect(service.translate('special-key.with_underscore')).toBe(
        'Special Value',
      );
    });
  });

  describe('Reactive Behavior', () => {
    it('should reflect language changes immediately', () => {
      service.setLanguage('es');
      expect(service.translate('account_statement.title')).toBe(
        'Estado de cuenta',
      );

      service.setLanguage('en');
      expect(service.translate('account_statement.title')).toBe(
        'Account Statement',
      );

      service.setLanguage('es');
      expect(service.translate('account_statement.title')).toBe(
        'Estado de cuenta',
      );
    });

    it('should reflect dictionary updates immediately', () => {
      const key = 'test.immediate';
      expect(service.translate(key)).toBe(key); // Should return key if not found

      const newDict: BmbDictionaries = {
        test: {
          immediate: 'Updated Value',
        },
      };

      service.updateDictionary('es', newDict);
      expect(service.translate(key)).toBe('Updated Value');
    });
  });

  describe('Dictionary Structure Consistency', () => {
    it('should have the same key structure in all default dictionaries', () => {
      expect(getAllKeys(es).sort()).toEqual(getAllKeys(en).sort());
    });

    it('should maintain consistency after adding new dictionaries', () => {
      const esKeys = getAllKeys(es);

      // Create French dictionary with same structure
      const frenchDict: BmbDictionaries = {};
      esKeys.forEach((key) => {
        const keyParts = key?.split('.');
        let current: any = frenchDict;

        keyParts.forEach((part, index) => {
          if (index === keyParts.length - 1) {
            current[part] = `FR_${key}`;
          } else {
            current[part] = current[part] || {};
            current = current[part];
          }
        });
      });

      service.addDictionary('fr', frenchDict);

      expect(getAllKeys(frenchDict).sort()).toEqual(getAllKeys(es).sort());
    });
  });

  describe('Edge Cases', () => {
    it('should handle null values gracefully', () => {
      const dictWithNull: BmbDictionaries = {
        test: {
          // @ts-ignore - Testing edge case
          nullValue: null,
        },
      };

      service.updateDictionary('es', dictWithNull);
      expect(service.translate('test.nullValue')).toBe('test.nullValue');
    });

    it('should handle undefined values gracefully', () => {
      const dictWithUndefined: BmbDictionaries = {
        test: {
          // @ts-ignore - Testing edge case
          undefinedValue: undefined,
        },
      };

      service.updateDictionary('es', dictWithUndefined);
      expect(service.translate('test.undefinedValue')).toBe(
        'test.undefinedValue',
      );
    });

    it('should handle empty objects', () => {
      const emptyDict: BmbDictionaries = {};
      service.updateDictionary('es', emptyDict);

      // Should still work with existing translations
      expect(service.translate('account_statement.title')).toBe(
        'Estado de cuenta',
      );
    });

    it('should handle keys with dots in the translation value', () => {
      const dottedValueDict: BmbDictionaries = {
        version: {
          number: 'v1.0.0',
        },
      };

      service.updateDictionary('es', dottedValueDict);
      expect(service.translate('version.number')).toBe('v1.0.0');
    });
  });

  describe('Performance', () => {
    it('should handle large number of translation calls efficiently', () => {
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        service.translate('account_statement.title');
        service.translate('account_statement.label_primary');
        service.translate('non.existent.key');
      }

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100); // Should complete in less than 100ms
    });

    it('should handle language switching efficiently', () => {
      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        service.setLanguage('es');
        service.setLanguage('en');
      }

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(50); // Should complete in less than 50ms
    });
  });
});
