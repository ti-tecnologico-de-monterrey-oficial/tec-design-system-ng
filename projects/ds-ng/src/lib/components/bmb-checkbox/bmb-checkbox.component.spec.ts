import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCheckboxComponent } from './bmb-checkbox.component';

describe('BmbCheckboxComponent', () => {
  let component: BmbCheckboxComponent;
  let fixture: ComponentFixture<BmbCheckboxComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbCheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update checked state and emit change event on handleChange', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      value: { checked: true },
      writable: false,
    });

    spyOn(component.change, 'emit');
    spyOn(event, 'stopPropagation');

    component.handleChange(event);

    expect(component.checked).toBe(true);
    expect(component.change.emit).toHaveBeenCalledWith(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should update checked state to false and emit change event on handleChange', () => {
    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      value: { checked: false },
      writable: false,
    });

    spyOn(component.change, 'emit');
    spyOn(event, 'stopPropagation');

    component.handleChange(event);

    expect(component.checked).toBe(false);
    expect(component.change.emit).toHaveBeenCalledWith(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
