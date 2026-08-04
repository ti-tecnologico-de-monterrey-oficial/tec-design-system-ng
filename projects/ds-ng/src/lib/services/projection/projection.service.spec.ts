import { ApplicationRef, EnvironmentInjector } from '@angular/core';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from './projection.service';

describe('BmbProjectionContentService', () => {
  let service: BmbProjectionContentService;
  let mockAppRef: ApplicationRef;
  let mockEnvironmentInjector: EnvironmentInjector;

  beforeEach(() => {
    mockAppRef = {
      attachView: () => {},
    } as any;

    mockEnvironmentInjector = {} as any;

    service = new BmbProjectionContentService(mockAppRef, mockEnvironmentInjector);
    spyOn<any>(service, 'getOrCreatePortal').and.returnValue(null);
    service.closeContent();
  });

  it('debe inicializar sin contenido proyectado', () => {
    expect(service.getProjectedContent()).toEqual([]);
    expect(service.isThereContentProjected()).toBe(false);
  });

  it('debe abrir contenido proyectado y generar un id', () => {
    const content: IBmbProjectionContent = {
      content: null,
      mode: 'over',
      inputContext: { test: 'valor' },
      showBackdrop: true,
    };

    const id = service.openContent(content);
    const projected = service.getProjectedContent();

<<<<<<< HEAD
    expect(projected.length).toBe(1);
    expect(projected[0]).toEqual(jasmine.objectContaining(content));
    expect(projected[0].id).toBeDefined();
    expect(service.isThereContentProjected()).toBe(true);
=======
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
>>>>>>> f0ea6c288f6c146bb60e63394d84eec9e0f4a407
  });

  it('debe cerrar el contenido proyectado', () => {
    const content: IBmbProjectionContent = { content: null };
    service.openContent(content);
    expect(service.isThereContentProjected()).toBe(true);

    service.closeContent();
<<<<<<< HEAD
=======

>>>>>>> f0ea6c288f6c146bb60e63394d84eec9e0f4a407
    expect(service.getProjectedContent()).toEqual([]);
    expect(service.isThereContentProjected()).toBe(false);
  });

<<<<<<< HEAD
  it('debe agregar cada contenido nuevo a la lista', () => {
    const content1: IBmbProjectionContent = { content: null, mode: 'over' };
    const content2: IBmbProjectionContent = { content: null, mode: 'partial' };

    service.openContent(content1);
    const firstId = service.getProjectedContent()[0].id;

    service.openContent(content2);
    const projected = service.getProjectedContent();
    const secondId = projected[1].id;

    expect(firstId).not.toEqual(secondId);
    expect(projected.length).toBe(2);
=======
  it('debe cerrar contenido proyectado por id y mantener contenidos restantes', () => {
    const first: IBmbProjectionContent = { id: 'first', content: null };
    const second: IBmbProjectionContent = { id: 'second', content: null };

    service.openContent(first);
    service.openContent(second);
    service.closeContent('first');

    expect(service.isContentOpen('first')).toBe(false);
    expect(service.isContentOpen('second')).toBe(true);
    expect(service.getProjectedContent()).toEqual([
      jasmine.objectContaining({ id: 'second' }),
    ]);
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
>>>>>>> f0ea6c288f6c146bb60e63394d84eec9e0f4a407
  });
});
