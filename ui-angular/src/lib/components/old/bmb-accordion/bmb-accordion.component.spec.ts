import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbAccordionComponent } from './bmb-accordion.component';
import { ComponentRef } from '@angular/core';

describe('BmbAccordionComponent', () => {
  let component: BmbAccordionComponent;
  let fixture: ComponentFixture<BmbAccordionComponent>;
  let componentRef: ComponentRef<BmbAccordionComponent>;
  const event: MouseEvent = new MouseEvent('click');

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbAccordionComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expanded state', () => {
    component.toggle(event);
    expect(component['_expanded']()).toBe(true);
    component.toggle(event);
    expect(component['_expanded']()).toBe(false);
  });

  it('should emit opened and closed events', () => {
    jest.spyOn(component.opened, 'emit');
    jest.spyOn(component.closed, 'emit');

    component.toggle(event);
    expect(component.opened.emit).toHaveBeenCalled();

    component.toggle(event);
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should return correct classes for accordion', () => {
    componentRef.setInput('borderRadius', 'm');
    componentRef.setInput('margin', 'm');
    componentRef.setInput('disabled', false);
    componentRef.setInput('active', true);
    fixture.detectChanges();

    const classes = component.getClassesAccordion();
    expect(classes).toContain('bmb_radius-m');
    expect(classes).toContain('bmb_margin-m');
    expect(classes).toContain('active');
  });

  it('should return correct classes for header', () => {
    componentRef.setInput('paddingHeader', 'm');
    componentRef.setInput('hideToggle', 'false');
    componentRef.setInput('icon', 'home');

    const classes = component.getClassesHeader();
    expect(classes).toContain('bmb_padding-m');
    expect(classes).toContain('bmb_accordion-header-icon');
  });

  it('should return correct styles', () => {
    componentRef.setInput('borderRadius', ['m', 'l']);
    componentRef.setInput('margin', ['m', 'l']);

    const styles = component.getStyles();
    expect(styles['border-radius']).toBe(
      'var(--bmb-radius-m) var(--bmb-radius-l)',
    );
    expect(styles.margin).toBe('var(--bmb-radius-m) var(--bmb-radius-l)');
  });

  it('should return correct icon toggle', () => {
    component.toggle(event);
    expect(component.getIconToggle()).toBe('keyboard_arrow_up');

    component.toggle(event);
    expect(component.getIconToggle()).toBe('keyboard_arrow_down');
  });

  it('should handle disabled state correctly', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.toggle(event);
    expect(component['_expanded']()).toBe(false);
  });

  it('should apply active class when active input is true', () => {
    componentRef.setInput('active', true);
    fixture.detectChanges();

    const classes = component.getClassesAccordion();
    expect(classes).toContain('active');
  });

  it('should not apply active class when active input is false', () => {
    componentRef.setInput('active', false);
    fixture.detectChanges();

    const classes = component.getClassesAccordion();
    expect(classes).not.toContain('active');
  });

  it('should return correct padding classes for header', () => {
    componentRef.setInput('paddingHeader', 'l');
    fixture.detectChanges();

    const classes = component.getClassesHeader();
    expect(classes).toContain('bmb_padding-l');
  });

  it('should include icon class when icon is provided', () => {
    componentRef.setInput('icon', 'settings');
    fixture.detectChanges();

    const classes = component.getClassesHeader();
    expect(classes).toContain('bmb_accordion-header-icon');
  });

  it('should apply multiple border radius values', () => {
    componentRef.setInput('borderRadius', ['m', 's', 'l', 'xl']);
    fixture.detectChanges();

    const styles = component.getStyles();
    expect(styles['border-radius']).toContain('var(--bmb-radius-m)');
    expect(styles['border-radius']).toContain('var(--bmb-radius-s)');
    expect(styles['border-radius']).toContain('var(--bmb-radius-l)');
    expect(styles['border-radius']).toContain('var(--bmb-radius-xl)');
  });

  it('should apply multiple margin values', () => {
    componentRef.setInput('margin', ['s', 'm', 'l']);
    fixture.detectChanges();

    const styles = component.getStyles();
    expect(styles.margin).toContain('var(--bmb-radius-s)');
    expect(styles.margin).toContain('var(--bmb-radius-m)');
    expect(styles.margin).toContain('var(--bmb-radius-l)');
  });

  it('should emit opened event only when toggling to expanded', () => {
    jest.spyOn(component.opened, 'emit');

    component.toggle(event);
    expect(component.opened.emit).toHaveBeenCalledTimes(1);

    component.toggle(event);
    expect(component.opened.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit closed event only when toggling to collapsed', () => {
    jest.spyOn(component.closed, 'emit');

    component.toggle(event);
    expect(component.closed.emit).toHaveBeenCalledTimes(0);

    component.toggle(event);
    expect(component.closed.emit).toHaveBeenCalledTimes(1);
  });

  it('should toggle multiple times correctly', () => {
    for (let i = 0; i < 5; i++) {
      component.toggle(event);
      const expectedState = i % 2 === 0;
      expect(component['_expanded']()).toBe(expectedState);
    }
  });
});
