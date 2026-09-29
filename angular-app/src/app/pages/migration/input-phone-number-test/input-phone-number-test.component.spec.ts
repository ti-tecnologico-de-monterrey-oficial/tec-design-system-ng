import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPhoneNumberTestComponent } from './input-phone-number-test.component';

describe('InputPhoneNumberTestComponent', () => {
  let component: InputPhoneNumberTestComponent;
  let fixture: ComponentFixture<InputPhoneNumberTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPhoneNumberTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputPhoneNumberTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should track control value changes as the last event', () => {
    component.control.setValue('+525512345678');
    expect(component.lastEvent()).toBe('Valor actual: +525512345678');
  });

  it('should unsubscribe on destroy without throwing', () => {
    expect(() => fixture.destroy()).not.toThrow();
  });
});
