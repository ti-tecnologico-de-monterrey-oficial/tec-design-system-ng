import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPage } from './input-page';

describe('InputPage', () => {
  let component: InputPage;
  let fixture: ComponentFixture<InputPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPage],
    }).compileComponents();
    fixture = TestBed.createComponent(InputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should expose every type', () =>
    expect(component.types).toEqual(['text', 'password', 'number', 'text-area']));
  it('should update maxlength from a valid numeric string', () => {
    component.setMaxlength('20');
    expect(component.maxlength()).toBe(20);
  });
  it('should clear maxlength when the value is empty', () => {
    component.setMaxlength('20');
    component.setMaxlength('');
    expect(component.maxlength()).toBeUndefined();
  });
  it('should track the change/focus/blur events', () => {
    component.handleChange();
    expect(component.lastEvent()).toBe('onChange emitido');
    component.handleFocus();
    expect(component.lastEvent()).toBe('isFocus emitido');
    component.handleBlur();
    expect(component.lastEvent()).toBe('isBlur emitido');
  });
});
