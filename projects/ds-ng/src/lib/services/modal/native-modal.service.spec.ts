import { BmbNativeModalService } from './native-modal.service';
import { IBmbNativeModal } from '../../components/bmb-modal/bmb-modal.interface';

import { TestBed } from '@angular/core/testing';
import { RendererFactory2 } from '@angular/core';

describe('BmbNativeModalService', () => {
  let service: BmbNativeModalService;

  // Mock dependencies for constructor
  const mockAppRef = {
    attachView: jasmine.createSpy('attachView'),
  } as any;

  // Mock RendererFactory2
  class MockRendererFactory2 {
    createRenderer() {
      return {
        setStyle: jasmine.createSpy('setStyle'),
        removeStyle: jasmine.createSpy('removeStyle'),
        setAttribute: jasmine.createSpy('setAttribute'),
        removeAttribute: jasmine.createSpy('removeAttribute'),
        listen: jasmine.createSpy('listen').and.callFake(() => () => {}),
        destroy: jasmine.createSpy('destroy'),
        createElement: jasmine
          .createSpy('createElement')
          .and.callFake((tag: string) => {
            return document.createElement(tag);
          }),
        createComment: jasmine
          .createSpy('createComment')
          .and.callFake((text: string) => {
            return document.createComment(text);
          }),
        appendChild: jasmine
          .createSpy('appendChild')
          .and.callFake((parent: any, child: any) => {
            if (parent && child) {
              parent.appendChild(child);
            }
          }),
        removeChild: jasmine
          .createSpy('removeChild')
          .and.callFake((parent: any, child: any) => {
            if (parent && child && parent.contains(child)) {
              parent.removeChild(child);
            }
          }),
      };
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BmbNativeModalService,
        { provide: RendererFactory2, useClass: MockRendererFactory2 },
        { provide: 'AppRef', useValue: mockAppRef },
      ],
    });
    service = TestBed.inject(BmbNativeModalService);
    service.closeAllModals(); // Reset state before each test
  });

  it('debe inicializar con la lista de modales vacía', () => {
    expect(service.getModalList()).toEqual([]);
  });

  it('debe abrir un modal y asignar un id si no existe', () => {
    const modal: IBmbNativeModal = {
      modalId: '',
      title: 'Test',
      content: 'Contenido',
    };
    const id = service.openModal(modal);
    const modals = service.getModalList();
    expect(modals.length).toBe(1);
    expect(modals[0].modalId).toBe(id);
    expect(modals[0].title).toBe('Test');
    expect(modals[0].content).toBe('Contenido');
  });

  it('debe abrir un modal y respetar el id proporcionado', () => {
    const modal: IBmbNativeModal = {
      modalId: 'custom-id',
      title: 'Test',
      content: 'Contenido',
    };
    const id = service.openModal(modal);
    expect(id).toBe('custom-id');
    expect(service.getModalList()[0].modalId).toBe('custom-id');
  });

  it('debe cerrar un modal por id', () => {
    const modal: IBmbNativeModal = {
      modalId: '',
      title: 'Test',
      content: 'Contenido',
    };
    const id = service.openModal(modal);
    expect(service.getModalList().length).toBe(1);
    service.closeModal(id);
    expect(service.getModalList().length).toBe(0);
  });

  it('debe cerrar todos los modales', () => {
    service.openModal({ modalId: '', title: 'Modal 1', content: 'A' });
    service.openModal({ modalId: '', title: 'Modal 2', content: 'B' });
    expect(service.getModalList().length).toBe(2);
    service.closeAllModals();
    expect(service.getModalList().length).toBe(0);
  });

  it('debe verificar si existe un modal por id', () => {
    const id = service.openModal({ modalId: '', title: 'Modal', content: 'C' });
    expect(service.checkIfModalExists(id)).toBe(true);
    service.closeModal(id);
    expect(service.checkIfModalExists(id)).toBe(false);
  });
});
