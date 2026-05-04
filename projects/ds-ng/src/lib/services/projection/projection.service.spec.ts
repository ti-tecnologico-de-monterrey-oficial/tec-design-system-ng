import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from './projection.service';

import { TestBed } from '@angular/core/testing';
import { ApplicationRef, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('BmbProjectionContentService', () => {
  let service: BmbProjectionContentService;
  let appRef: ApplicationRef;

  function createContent(
    overrides: Partial<IBmbProjectionContent> = {},
  ): IBmbProjectionContent {
    return {
      content: null,
      ...overrides,
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BmbProjectionContentService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: DOCUMENT, useValue: document },
      ],
    });

    appRef = TestBed.inject(ApplicationRef);
    spyOn(appRef, 'attachView');
    spyOn(appRef, 'detachView');

    service = TestBed.inject(BmbProjectionContentService);
    service.closeContent();
    spyOn<any>(service, 'getOrCreatePortal').and.stub();
  });

  it('debe inicializar con contenido proyectado nulo', () => {
    expect(service.getProjectedContent()).toBeNull();
    expect(service.isThereContentProjected()).toBe(false);
  });

  it('debe abrir contenido proyectado y normalizar valores por defecto', () => {
    const content = createContent({
      mode: 'over',
      inputContext: { test: 'valor' },
      showBackdrop: true,
    });

    const id = service.openContent(content);
    const projected = service.getProjectedContent();

    expect(id).toBeDefined();
    expect(projected).toEqual(jasmine.objectContaining(content));
    expect(projected?.id).toBeDefined();
    expect(projected?.fixSizeToRef).toBe(false);
    expect(projected?.outputContext).toEqual({});
    expect(projected?.focusOnOpen).toBe(true);
    expect(projected?.forceMobileCenter).toBe(false);
    expect(service.isThereContentProjected()).toBe(true);
  });

  it('debe cerrar todo el contenido proyectado', () => {
    service.openContent(createContent());

    expect(service.isThereContentProjected()).toBe(true);

    service.closeContent();

    expect(service.getProjectedContent()).toBeNull();
    expect(service.getAllProjectedContents()).toEqual([]);
    expect(service.isThereContentProjected()).toBe(false);
  });

  it('debe ejecutar beforeCloseContent y afterCloseContent al cerrar un contenido por id', () => {
    const beforeCloseContent = jasmine.createSpy('beforeCloseContent');
    const afterCloseContent = jasmine.createSpy('afterCloseContent');

    const id = service.openContent(
      createContent({
        beforeCloseContent,
        afterCloseContent,
      }),
    );

    service.closeContent(id);

    expect(beforeCloseContent).toHaveBeenCalledOnceWith({
      id,
      reason: 'single',
    });
    expect(afterCloseContent).toHaveBeenCalledOnceWith({
      id,
      reason: 'single',
    });
  });

  it('debe mantener una pila y restaurar el anterior al cerrar el último', () => {
    const firstId = service.openContent(createContent({ mode: 'partial' }));
    const secondId = service.openContent(createContent({ mode: 'over' }));

    expect(service.getProjectedContent()?.id).toBe(secondId);

    service.closeContent(secondId);

    expect(service.getProjectedContent()?.id).toBe(firstId);
  });

  it('debe ejecutar beforeCloseContent y afterCloseContent al cerrar todo el contenido', () => {
    const beforeFirst = jasmine.createSpy('beforeFirst');
    const afterFirst = jasmine.createSpy('afterFirst');
    const beforeSecond = jasmine.createSpy('beforeSecond');
    const afterSecond = jasmine.createSpy('afterSecond');

    const firstId = service.openContent(
      createContent({
        id: 'content-1',
        beforeCloseContent: beforeFirst,
        afterCloseContent: afterFirst,
      }),
    );
    const secondId = service.openContent(
      createContent({
        id: 'content-2',
        beforeCloseContent: beforeSecond,
        afterCloseContent: afterSecond,
      }),
    );

    service.closeContent();

    expect(beforeFirst).toHaveBeenCalledOnceWith({
      id: firstId,
      reason: 'all',
    });
    expect(afterFirst).toHaveBeenCalledOnceWith({
      id: firstId,
      reason: 'all',
    });
    expect(beforeSecond).toHaveBeenCalledOnceWith({
      id: secondId,
      reason: 'all',
    });
    expect(afterSecond).toHaveBeenCalledOnceWith({
      id: secondId,
      reason: 'all',
    });
  });

  it('debe lanzar error si se intenta abrir contenido con id duplicado', () => {
    service.openContent(createContent({ id: 'duplicate-id' }));

    expect(() => service.openContent(createContent({ id: 'duplicate-id' }))).toThrowError(
      'Projected content with id "duplicate-id" is already open.',
    );
  });

  it('debe destruir el portal al cerrar el último contenido', () => {
    const fakeHostView = { rootNodes: [document.createElement('bmb-portal')] } as any;
    const fakePortalRef = {
      hostView: fakeHostView,
      destroy: jasmine.createSpy('destroy'),
    } as any;

    (service as any).portalComponentRef = fakePortalRef;
    service.openContent(createContent({ id: 'projected-1' }));

    service.closeContent('projected-1');

    expect(appRef.detachView).toHaveBeenCalledWith(fakeHostView);
    expect(fakePortalRef.destroy).toHaveBeenCalled();
    expect((service as any).portalComponentRef).toBeNull();
  });

  it('debe permitir abrir contenido en servidor sin tocar el DOM', () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        BmbProjectionContentService,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: DOCUMENT, useValue: document },
      ],
    });

    const querySelectorSpy = spyOn(document, 'querySelector').and.callThrough();
    const serverAppRef = TestBed.inject(ApplicationRef);
    spyOn(serverAppRef, 'attachView');
    const serverService = TestBed.inject(BmbProjectionContentService);

    serverService.openContent(createContent({ id: 'server-content' }));

    expect(serverService.getProjectedContent()?.id).toBe('server-content');
    expect(querySelectorSpy).not.toHaveBeenCalled();
    expect(serverAppRef.attachView).not.toHaveBeenCalled();
  });
});
