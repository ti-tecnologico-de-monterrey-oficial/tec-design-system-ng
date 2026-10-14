import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbInteractiveIconComponent } from './bmb-interactive-icon.component';

describe('BmbInteractiveIconComponent', () => {
  let component: BmbInteractiveIconComponent;
  let fixture: ComponentFixture<BmbInteractiveIconComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbInteractiveIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default icon value', () => {
    expect(component.icon()).toBe('face');
  });

  describe('getClasses', () => {
    it('should return the base and layout classes by default', () => {
      expect(component.getClasses()).toEqual([
        'bmb_interactive_icon',
        'bmb_interactive_icon-regular',
      ]);
    });

    it('should add the primary class when appearanceContrast is primary', () => {
      fixture.componentRef.setInput('appearanceContrast', 'primary');

      expect(component.getClasses()).toEqual([
        'bmb_interactive_icon',
        'bmb_interactive_icon-regular',
        'bmb_interactive_icon-primary',
      ]);
    });

    it('should add the alternative class when appearanceContrast is alternative', () => {
      fixture.componentRef.setInput('appearanceContrast', 'alternative');

      expect(component.getClasses()).toEqual([
        'bmb_interactive_icon',
        'bmb_interactive_icon-regular',
        'bmb_interactive_icon-alternative',
      ]);
    });

    it('should add the horizontal class when horizontal is true', () => {
      fixture.componentRef.setInput('horizontal', true);

      expect(component.getClasses()).toEqual([
        'bmb_interactive_icon',
        'bmb_interactive_icon-regular',
        'bmb_interactive_icon-horizontal',
      ]);
    });

    it('should use the given layout', () => {
      fixture.componentRef.setInput('layout', 'button');

      expect(component.getClasses()).toEqual([
        'bmb_interactive_icon',
        'bmb_interactive_icon-button',
      ]);
    });
  });

  describe('handleClick', () => {
    it('should emit the buttonClick event', () => {
      const emitSpy = jest.spyOn(component.buttonClick, 'emit');
      const event = new MouseEvent('click');

      component.handleClick(event);

      expect(emitSpy).toHaveBeenCalledWith(event);
    });
  });
});
