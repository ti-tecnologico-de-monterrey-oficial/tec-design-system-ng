import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbButtonIconComponent } from './bmb-button-icon.component';
import { ComponentRef } from '@angular/core';

describe('BmbButtonIconComponent', () => {
  let component: BmbButtonIconComponent;
  let fixture: ComponentFixture<BmbButtonIconComponent>;
  let componentRef: ComponentRef<BmbButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbButtonIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbButtonIconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'face');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the active state when handlePress is called', () => {
    // Initial state
    expect(componentRef.instance.active()).toBe(false);

    // Call handlePress to toggle the state
    component.handlePress();
    expect(componentRef.instance.active()).toBe(true);

    // Call handlePress again to toggle back
    component.handlePress();
    expect(componentRef.instance.active()).toBe(false);
  });

  it('should add the active class once the button is pressed', () => {
    expect(component.getClassList()).not.toContain('bmb_button_icon-active');

    component.handlePress();

    expect(component.getClassList()).toContain('bmb_button_icon-active');
  });

  it('should only add the container and outline classes when showContainer is true', () => {
    componentRef.setInput('showContainer', false);
    componentRef.setInput('isOutline', true);
    fixture.detectChanges();

    expect(component.getClassList()).not.toContain('bmb_button_icon-container');
    expect(component.getClassList()).not.toContain(
      'bmb_button_icon-container-outline',
    );

    componentRef.setInput('showContainer', true);
    fixture.detectChanges();

    expect(component.getClassList()).toContain('bmb_button_icon-container');
    expect(component.getClassList()).toContain(
      'bmb_button_icon-container-outline',
    );
  });

  it('should add the disabled class when disabled is true', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(component.getClassList()).toContain('bmb_button_icon-disabled');
  });

  it('should add the matching class for each contrast appearance', () => {
    (['primary', 'alternative', 'solid'] as const).forEach((contrast) => {
      componentRef.setInput('appearanceContrast', contrast);
      fixture.detectChanges();

      expect(component.getClassList()).toContain(
        `bmb_button_icon-container-${contrast}`,
      );
    });

    componentRef.setInput('appearanceContrast', 'default');
    fixture.detectChanges();

    expect(component.getClassList()).not.toContain(
      'bmb_button_icon-container-default',
    );
  });

  it('should emit onButtonClick with the originating event', () => {
    const emitSpy = jest.fn();
    component.onButtonClick.subscribe(emitSpy);
    const event = new MouseEvent('click');

    component.handleClick(event);

    expect(emitSpy).toHaveBeenCalledWith(event);
  });
});
