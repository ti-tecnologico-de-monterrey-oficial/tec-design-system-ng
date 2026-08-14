import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPage } from './modal-page';
import { BmbNativeModalService } from 'ui-angular';

describe('ModalPage', () => {
  let component: ModalPage;
  let fixture: ComponentFixture<ModalPage>;
  let modalService: BmbNativeModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPage);
    component = fixture.componentInstance;
    modalService = TestBed.inject(BmbNativeModalService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the warning modal used by DS01-3722', () => {
    const openModal = jest.spyOn(modalService, 'openModal');

    component.openWarningModal();

    expect(openModal).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Modal title',
        iconStyle: 'warning',
        size: 'medium',
      }),
    );
    expect(component.status()).toBe('Abierto');
  });
});
