import { BmbNativeModalService } from './native-modal.service';
import { IBmbNativeModal } from '../../components/bmb-modal/bmb-modal.interface';

import { TestBed } from '@angular/core/testing';
import { ApplicationRef, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('BmbNativeModalService', () => {
  let service: BmbNativeModalService;
  let appRef: ApplicationRef;

  function createModal(overrides: Partial<IBmbNativeModal> = {}): IBmbNativeModal {
    return {
      modalId: '',
      title: 'Test',
      content: 'Contenido',
      ...overrides,
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BmbNativeModalService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: DOCUMENT, useValue: document },
      ],
    });

    appRef = TestBed.inject(ApplicationRef);
    spyOn(appRef, 'attachView');
    spyOn(appRef, 'detachView');
    service = TestBed.inject(BmbNativeModalService);
    service.closeAllModals();
    spyOn<any>(service, 'getOrCreatePortal').and.stub();
  });

  it('debe inicializar con la lista de modales vacía', () => {
    expect(service.getModalList()).toEqual([]);
  });

  it('debe abrir un modal y asignar un id si no existe', () => {
    const modal = createModal();

    const id = service.openModal(modal);
    const modals = service.getModalList();

    expect(modals.length).toBe(1);
    expect(modals[0].modalId).toBe(id);
    expect(modals[0].title).toBe('Test');
    expect(modals[0].content).toBe('Contenido');
  });

  it('debe abrir un modal y respetar el id proporcionado', () => {
    const modal = createModal({ modalId: 'custom-id' });

    const id = service.openModal(modal);

    expect(id).toBe('custom-id');
    expect(service.getModalList()[0].modalId).toBe('custom-id');
  });

  it('debe lanzar error si se intenta abrir un modal con id duplicado', () => {
    service.openModal(createModal({ modalId: 'duplicate-id' }));

    expect(() =>
      service.openModal(createModal({ modalId: 'duplicate-id' })),
    ).toThrowError('A modal with id "duplicate-id" already exists.');
  });

  it('debe cerrar un modal por id', () => {
    const modal = createModal();

    const id = service.openModal(modal);

    expect(service.getModalList().length).toBe(1);

    service.closeModal(id);

    expect(service.getModalList().length).toBe(0);
  });

  it('debe ejecutar beforeCloseModal y afterCloseModal al cerrar un modal', () => {
    const beforeCloseModal = jasmine.createSpy('beforeCloseModal');
    const afterCloseModal = jasmine.createSpy('afterCloseModal');

    const id = service.openModal(
      createModal({
        beforeCloseModal,
        afterCloseModal,
      }),
    );

    service.closeModal(id);

    expect(beforeCloseModal).toHaveBeenCalledOnceWith({
      modalId: id,
      reason: 'single',
    });
    expect(afterCloseModal).toHaveBeenCalledOnceWith({
      modalId: id,
      reason: 'single',
    });
  });

  it('debe cerrar todos los modales', () => {
    service.openModal(createModal({ title: 'Modal 1', content: 'A' }));
    service.openModal(createModal({ title: 'Modal 2', content: 'B' }));

    expect(service.getModalList().length).toBe(2);

    service.closeAllModals();

    expect(service.getModalList().length).toBe(0);
  });

  it('debe ejecutar beforeCloseModal y afterCloseModal al cerrar todos los modales', () => {
    const beforeFirst = jasmine.createSpy('beforeFirst');
    const afterFirst = jasmine.createSpy('afterFirst');
    const beforeSecond = jasmine.createSpy('beforeSecond');
    const afterSecond = jasmine.createSpy('afterSecond');

    const firstId = service.openModal(
      createModal({
        modalId: 'modal-1',
        beforeCloseModal: beforeFirst,
        afterCloseModal: afterFirst,
      }),
    );
    const secondId = service.openModal(
      createModal({
        modalId: 'modal-2',
        beforeCloseModal: beforeSecond,
        afterCloseModal: afterSecond,
      }),
    );

    service.closeAllModals();

    expect(beforeFirst).toHaveBeenCalledOnceWith({
      modalId: firstId,
      reason: 'all',
    });
    expect(afterFirst).toHaveBeenCalledOnceWith({
      modalId: firstId,
      reason: 'all',
    });
    expect(beforeSecond).toHaveBeenCalledOnceWith({
      modalId: secondId,
      reason: 'all',
    });
    expect(afterSecond).toHaveBeenCalledOnceWith({
      modalId: secondId,
      reason: 'all',
    });
  });

  it('debe verificar si existe un modal por id', () => {
    const id = service.openModal(createModal({ title: 'Modal', content: 'C' }));

    expect(service.checkIfModalExists(id)).toBe(true);

    service.closeModal(id);

    expect(service.checkIfModalExists(id)).toBe(false);
  });

  it('debe destruir el portal cuando no quedan modales', () => {
    const fakeHostView = { rootNodes: [document.createElement('bmb-portal')] } as any;
    const fakePortalRef = {
      hostView: fakeHostView,
      destroy: jasmine.createSpy('destroy'),
    } as any;

    (service as any).portalComponentRef = fakePortalRef;
    service.openModal(createModal({ modalId: 'to-close' }));

    service.closeModal('to-close');

    expect(appRef.detachView).toHaveBeenCalledWith(fakeHostView);
    expect(fakePortalRef.destroy).toHaveBeenCalled();
    expect((service as any).portalComponentRef).toBeNull();
  });

  it('debe permitir abrir modal en servidor sin tocar el DOM', () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        BmbNativeModalService,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: DOCUMENT, useValue: document },
      ],
    });

    const querySelectorSpy = spyOn(document, 'querySelector').and.callThrough();
    const serverAppRef = TestBed.inject(ApplicationRef);
    spyOn(serverAppRef, 'attachView');
    const serverService = TestBed.inject(BmbNativeModalService);

    serverService.openModal(createModal({ modalId: 'server-modal' }));

    expect(serverService.getModalList().length).toBe(1);
    expect(querySelectorSpy).not.toHaveBeenCalled();
    expect(serverAppRef.attachView).not.toHaveBeenCalled();
  });
});
