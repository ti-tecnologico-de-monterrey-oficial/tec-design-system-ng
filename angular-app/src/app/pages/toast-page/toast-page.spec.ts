import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastPage } from './toast-page';

describe('ToastPage', () => {
  let component: ToastPage;
  let fixture: ComponentFixture<ToastPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastPage],
    }).compileComponents();
    fixture = TestBed.createComponent(ToastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should expose every appearance', () =>
    expect(component.appearances).toContain('neutral'));
  it('should track the close event', () => {
    component.handleClose();
    expect(component.lastEvent()).toBe('onClose emitido');
  });
});
