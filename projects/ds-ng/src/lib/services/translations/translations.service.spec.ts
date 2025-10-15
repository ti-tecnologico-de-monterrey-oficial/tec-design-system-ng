// import { TranslationsService } from './translations.service';

// describe('TranslationsService', () => {
//   let service: TranslationsService;

//   beforeEach(() => {
//     service = new TranslationsService();
//     // Limpia diccionarios y establece idioma por defecto antes de cada prueba
//     service.addDictionary('es', {});
//     service.addDictionary('en', {});
//     service.setLanguage('es');
//   });

//   it('debe inicializar con idioma por defecto "es"', () => {
//     expect(service.getCurrentLanguage()).toBe('es');
//   });

//   it('debe agregar y obtener traducciones en español', () => {
//     service.addDictionary('es', { greeting: '¡Hola!' });
//     expect(service.translate('greeting')).toBe('¡Hola!');
//   });

//   it('debe agregar y obtener traducciones en inglés', () => {
//     service.addDictionary('en', { greeting: 'Hello!' });
//     service.setLanguage('en');
//     expect(service.translate('greeting')).toBe('Hello!');
//   });

//   it('debe cambiar el idioma activo', () => {
//     service.setLanguage('en');
//     expect(service.getCurrentLanguage()).toBe('en');
//   });

//   it('debe retornar la clave si no existe traducción', () => {
//     expect(service.translate('noExiste')).toBe('noExiste');
//   });

//   it('debe actualizar el diccionario de un idioma', () => {
//     service.addDictionary('es', { farewell: '¡Adiós!' });
//     expect(service.translate('farewell')).toBe('¡Adiós!');
//   });

//   it('debe mantener traducciones previas al actualizar el diccionario', () => {
//     service.addDictionary('es', { greeting: '¡Hola!' });
//     service.addDictionary('es', { farewell: '¡Adiós!' });
//     expect(service.translate('greeting')).toBe('¡Hola!');
//     expect(service.translate('farewell')).toBe('¡Adiós!');
//   });
// });
