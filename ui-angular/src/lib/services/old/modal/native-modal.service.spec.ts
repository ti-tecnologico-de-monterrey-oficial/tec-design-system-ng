import {
  ApplicationRef,
  Component,
  EnvironmentInjector,
  ElementRef,
  inject,
  NgModule,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BmbNativeModalService } from './native-modal.service';
import { IBmbNativeModal } from '../../../components/bmb-modal/bmb-modal.interface';
import { getUUID } from '../../../_shared/logic/utils';

@Component({
  selector: 'bmb-portal',
  standalone: true,
  template: '<div></div>',
})
class MockBmbPortalComponent {
  environmentInjector: any = null;
  instance: any = {};
  hostView: any = { rootNodes: [document.createElement('div')] };
  ref = { destroy: () => {} };

  static createEnvironmentInjector() {
    const injector = new EnvironmentInjector(null as any);
    return injector;
  }

  constructor() {
    this.environmentInjector = MockBmbPortalComponent.createEnvironmentInjector();
  }
}

@NgModule({
  declarations: [MockBmbPortalComponent],
  providers: [
    {
      provide: ElementRef,
      useValue: {
        nativeElement: document.createElement('div'),
      },
    },
  ],
})
export class BmbNativeMockModule { }

let mockApplicationRef: any;

beforeAll(() => {
  TestBed.configureTestingModule({
    imports: [BmbNativeMockModule, BmbNativeModalService],
    providers: [
      {
        provide: ApplicationRef,
        useValue: (mockApplicationRef = {
          attachView: jest.fn(),
          detachView: jest.fn(),
          updateInnerNoop: jest.fn(),
          markForCheck: jest.fn(),
        }),
      },
      EnvironmentInjector,
    ],
  });
});

describe('BmbNativeModalService', () => {
  let service: BmbNativeModalService;

  beforeEach(() => {
    service = TestBed.inject(BmbNativeModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize modalList as empty array', () => {
    expect(service.getModalList()).toEqual([]);
  });

  it('should open a modal with custom modalId', () => {
    const newModal: IBmbNativeModal = {
      modalId: 'custom-id-123',
      type: 'dialog',
      title: 'Test Modal',
      content: 'Modal content',
      responseClass: 'Modal',
      showBackdrop: true,
      showScroll: false,
      animate: true,
    };

    const id = service.openModal(newModal);

    expect(id).toBe('custom-id-123');
    expect(service.checkIfModalExists(id)).toBe(true);
    expect(service.getModalList()).toHaveLength(1);
    expect(service.getModalList()[0]).toEqual({ ...newModal, modalId: id });
  });

  it('should generate a UUID for modal without custom modalId', () => {
    const newModal: IBmbNativeModal = {
      type: 'dialog',
      title: 'Test Modal',
      content: 'Modal content',
      responseClass: 'Modal',
      showBackdrop: true,
      showScroll: false,
      animate: true,
    };

    const id = __TEST_SERVICE.openModal(newModal);

    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
    expect(__TEST_SERVICE.checkIfModalExists(id)).toBe(true);
  });

  it('should generate a valid UUID', () => {
    const uuid = getUUID();
    expect(typeof uuid).toBe('string');
    expect(uuid).toMatch(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i);
  });

  it('should close a modal by ID', () => {
    const newModal: IBmbNativeModal = {
      modalId: 'modal-123',
      type: 'dialog',
      title: 'Test Modal',
      content: 'Modal content',
      responseClass: 'Modal',
      showBackdrop: true,
      showScroll: false,
      animate: true,
    };

    service.openModal(newModal);
    expect(service.checkIfModalExists('modal-123')).toBe(true);

    service.closeModal('modal-123');
    expect(service.checkIfModalExists('modal-123')).toBe(false);
  });

  it('should close all modals', () => {
    const modal1: IBmbNativeModal = {
      modalId: 'modal-1',
      type: 'dialog',
      title: 'Test 1',
      content: 'Content 1',
      responseClass: 'Modal',
      showBackdrop: true,
      showScroll: false,
      animate: true,
    };

    const modal2: IBmbNativeModal = {
      modalId: 'modal-2',
      type: 'dialog',
      title: 'Test 2',
      content: 'Content 2',
      responseClass: 'Modal',
      showBackdrop: true,
      showScroll: false,
      animate: true,
    };

    __TEST_SERVICE.openModal(modal1);
    __TEST_SERVICE.openModal(modal2);
    expect(__TEST_SERVICE.getModalList()).toHaveLength(2);

    __TEST_SERVICE.closeAllModals();
    expect(__TEST_SERVICE.getModalList()).toEqual([]);
  });

  it('should not allow opening a modal that is already open', () => {
    const newModal: IBmbNativeModal = {
      modalId: 'modal-duplicate',
      type: 'dialog',
      title: 'Test Modal',
      content: 'Modal content',
      responseClass: 'Modal',
      showBackdrop: true,
      showScroll: false,
      animate: true,
    };

    __TEST_SERVICE.openModal(newModal);
    expect(__TEST_SERVICE.checkIfModalExists('modal-duplicate')).toBe(true);

    // Opening the same modal again should not create a duplicate
    const id2 = __TEST_SERVICE.openModal(newModal);
    expect(id2).toBe('modal-duplicate');
    expect(__TEST_SERVICE.getModalList()).toHaveLength(1);
  });
});
