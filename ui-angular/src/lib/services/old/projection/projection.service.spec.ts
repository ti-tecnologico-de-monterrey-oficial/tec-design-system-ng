import { TestBed } from '@angular/core/testing';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from './projection.service';

describe('BmbProjectionContentService', () => {
  let service: BmbProjectionContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BmbProjectionContentService);
    spyOn<any>(service, 'getOrCreatePortal');
    service.closeContent();
  });

  it('debe inicializar sin contenido proyectado', () => {
    expect(service.getAllProjectedContents()).toEqual([]);
  });

  it('debe abrir contenido proyectado y generar un id', () => {
    const content: IBmbProjectionContent = {
      content: null,
      mode: 'over',
      inputContext: { test: 'valor' },
      showBackdrop: true,
    };

    const id = service.openContent(content);
    const projected = service.getAllProjectedContents();

    expect(typeof id).toBe('string');
    expect(service.isContentOpen(id)).toBe(true);
    expect(projected.length).toBe(1);
    expect(projected[0]).toEqual(
      jasmine.objectContaining({
        id,
        mode: 'over',
        inputContext: { test: 'valor' },
        showBackdrop: true,
      }),
    );
  });

  it('debe cerrar el contenido proyectado', () => {
    const content: IBmbProjectionContent = { content: null };
    service.openContent(content);
    expect(service.getAllProjectedContents().length).toBe(1);

    service.closeContent();
    expect(service.getAllProjectedContents()).toEqual([]);
  });

  it('debe agregar cada contenido nuevo a la lista', () => {
    const content1: IBmbProjectionContent = { content: null, mode: 'over' };
    const content2: IBmbProjectionContent = { content: null, mode: 'partial' };

    service.openContent(content1);
    const firstId = service.getAllProjectedContents()[0].id;

    service.openContent(content2);
    const projected = service.getAllProjectedContents();
    const secondId = projected[1].id;

    expect(firstId).not.toEqual(secondId);
    expect(projected.length).toBe(2);
  });

  it('debe cerrar contenido proyectado por id y mantener contenidos restantes', () => {
    const first: IBmbProjectionContent = { id: 'first', content: null };
    const second: IBmbProjectionContent = { id: 'second', content: null };

    service.openContent(first);
    service.openContent(second);
    service.closeContent('first');

    expect(service.isContentOpen('first')).toBe(false);
    expect(service.isContentOpen('second')).toBe(true);
    expect(service.getAllProjectedContents()).toEqual([
      jasmine.objectContaining({ id: 'second' }),
    ]);
  });

  it('debe rechazar contenido con un id ya existente', () => {
    const content: IBmbProjectionContent = { id: 'duplicated', content: null };
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

    service.openContent(content);
    service.openContent(content);

    expect(service.getAllProjectedContents().length).toBe(1);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('debe generar un id propio cuando crypto.randomUUID no está disponible', () => {
    const originalCrypto = globalThis.crypto;

    Object.defineProperty(globalThis, 'crypto', {
      value: { ...originalCrypto, randomUUID: undefined },
      configurable: true,
    });

    try {
      const id = service.openContent({ content: null });
      expect(id).toMatch(/^projected-\d+-/);
      expect(service.isContentOpen(id)).toBe(true);
    } finally {
      Object.defineProperty(globalThis, 'crypto', {
        value: originalCrypto,
        configurable: true,
      });
    }
  });

  it('debe ejecutar los hooks al abrir y cerrar contenido', () => {
    const afterOpen = jasmine.createSpy('afterOpen');
    const beforeClose = jasmine.createSpy('beforeClose');
    const afterClose = jasmine.createSpy('afterClose');

    const content: IBmbProjectionContent = {
      id: 'hooked',
      content: null,
      afterOpenContent: afterOpen,
      beforeCloseContent: beforeClose,
      afterCloseContent: afterClose,
    };

    service.openContent(content);

    expect(afterOpen).toHaveBeenCalledWith({
      contentId: 'hooked',
      reason: 'single',
    });

    service.closeContent('hooked');

    expect(beforeClose).toHaveBeenCalledWith({
      contentId: 'hooked',
      reason: 'single',
    });
    expect(afterClose).toHaveBeenCalledWith({
      contentId: 'hooked',
      reason: 'single',
    });
  });
});
