import { TestBed } from '@angular/core/testing';
import { BmbNativeModalService } from './native-modal.service';
import { IBmbNativeModal } from '../../../components/bmb-modal/bmb-modal.interface';
import { getUUID } from '../../../_shared/logic/utils';

describe('BmbNativeModalService', () => {
  let service: BmbNativeModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BmbNativeModalService);
    spyOn<any>(service, 'getOrCreatePortal').and.returnValue(null);
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

    const id = service.openModal(newModal);

    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
    expect(service.checkIfModalExists(id)).toBe(true);
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

    service.openModal(modal1);
    service.openModal(modal2);
    expect(service.getModalList()).toHaveLength(2);

    service.closeAllModals();
    expect(service.getModalList()).toEqual([]);
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

    service.openModal(newModal);
    expect(service.checkIfModalExists('modal-duplicate')).toBe(true);

    // Opening the same modal again should not create a duplicate
    const id2 = service.openModal(newModal);
    expect(id2).toBe('modal-duplicate');
    expect(service.getModalList()).toHaveLength(1);
  });
});
