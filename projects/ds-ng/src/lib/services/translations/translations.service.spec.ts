import es from '../../../assets/i18n/es.json';
import en from '../../../assets/i18n/en.json';

describe('TranslationsService', () => {
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

  // En la prueba:
  it('debe tener la misma estructura de claves', () => {
    expect(getAllKeys(es).sort()).toEqual(
      getAllKeys(en).sort(),
    );
  });
});
