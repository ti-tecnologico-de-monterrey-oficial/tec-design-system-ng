import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { BMB_DEFAULT_THEME } from './theme-config';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.removeItem('theme');
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: BMB_DEFAULT_THEME, useValue: 'dark' }
      ]
    });
  });

  it('debe inicializar con el tema de localStorage si existe', () => {
    localStorage.setItem('theme', 'custom');
    service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('custom');
  });

  it('debe inicializar con el tema por defecto si no hay tema en localStorage', () => {
    service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('dark');
  });

  it('debe retornar el tema por defecto con getDefaultTheme()', () => {
    service = TestBed.inject(ThemeService);
    expect(service.getDefaultTheme()).toBe('dark');
  });

  it('debe actualizar el tema con setThemeAndSaveInLocal()', () => {
    service = TestBed.inject(ThemeService);
    service.setThemeAndSaveInLocal('blue');
    expect(service.theme()).toBe('blue');
    expect(localStorage.getItem('theme')).toBe('blue');
  });
});
