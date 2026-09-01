import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbGenericCardButtonComponent } from './bmb-generic-card-button.component';

describe('BmbGenericCardButtonComponent', () => {
  let component: BmbGenericCardButtonComponent;
  let fixture: ComponentFixture<BmbGenericCardButtonComponent>;
  let componentRef: ComponentRef<BmbGenericCardButtonComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbGenericCardButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cardClick on click when enabled', () => {
    const emitSpy = jest.spyOn(component.cardClick, 'emit');
    const event = new MouseEvent('click');

    component.handleClick(event);

    expect(emitSpy).toHaveBeenCalledWith(event);
  });

  it('should not emit cardClick on click when disabled', () => {
    componentRef.setInput('disabled', true);
    const emitSpy = jest.spyOn(component.cardClick, 'emit');

    component.handleClick(new MouseEvent('click'));

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit cardClick on Enter/Space keydown when enabled', () => {
    const emitSpy = jest.spyOn(component.cardClick, 'emit');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    component.handleKeydown(event);

    expect(emitSpy).toHaveBeenCalledWith(event);
  });

  it('should not emit cardClick on keydown when disabled', () => {
    componentRef.setInput('disabled', true);
    const emitSpy = jest.spyOn(component.cardClick, 'emit');

    component.handleKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should ignore non-keyboard events', () => {
    const emitSpy = jest.spyOn(component.cardClick, 'emit');

    component.handleKeydown(new Event('keydown'));

    expect(emitSpy).not.toHaveBeenCalled();
  });
});
