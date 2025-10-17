import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // Limpia localStorage antes de cada prueba
    localStorage.removeItem('theme');
    service = new ThemeService('dark');
  });

  it('debe inicializar con el tema de localStorage si existe', (done) => {
    localStorage.setItem('theme', 'custom');
    service = new ThemeService('light');
    service.theme$.subscribe((theme) => {
      expect(theme).toBe('custom');
      done();
    });
  });

  it('debe inicializar con el tema por defecto si no hay tema en localStorage', (done) => {
    service = new ThemeService('dark');
    service.theme$.subscribe((theme) => {
      expect(theme).toBe('dark');
      done();
    });
  });

  it('debe retornar el tema por defecto con getDefaultTheme()', () => {
    expect(service.getDefaultTheme()).toBe('dark');
  });

  it('debe retornar "light" si no se proporciona tema por defecto', () => {
    service = new ThemeService(undefined as any);
    expect(service.getDefaultTheme()).toBe('light');
  });

  it('debe actualizar el tema con setTheme()', (done) => {
    service.setTheme('blue');
    service.theme$.subscribe((theme) => {
      expect(theme).toBe('blue');
      done();
    });
  });
});
