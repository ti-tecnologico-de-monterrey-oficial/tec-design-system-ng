import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbToastComponent } from './bmb-toast.component';
import { ToastService } from '../../services';

describe('BmbToastComponent', () => {
  let component: BmbToastComponent;
  let fixture: ComponentFixture<BmbToastComponent>;
  let mockToastService: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    mockToastService = jasmine.createSpyObj('ToastService', [
      'isOpen$',
      'closeToast',
    ]);

    TestBed.configureTestingModule({
      declarations: [BmbToastComponent],
      providers: [{ provide: ToastService, useValue: mockToastService }],
    });

    fixture = TestBed.createComponent(BmbToastComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
