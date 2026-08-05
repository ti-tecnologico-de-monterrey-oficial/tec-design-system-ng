import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCheckboxComponent } from './bmb-checkbox.component';
import { ComponentRef } from '@angular/core';

describe('BmbCheckboxComponent', () => {
  let component: BmbCheckboxComponent;
  let fixture: ComponentFixture<BmbCheckboxComponent>;
  let componentRef: ComponentRef<BmbCheckboxComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbCheckboxComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
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

    expect(component.checked()).toBe(true);
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

    expect(component.checked()).toBe(false);
    expect(component.change.emit).toHaveBeenCalledWith(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
