import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbAccordionComponent } from './bmb-accordion.component';
import { ComponentRef } from '@angular/core';

describe('BmbAccordionComponent', () => {
  let component: BmbAccordionComponent;
  let fixture: ComponentFixture<BmbAccordionComponent>;
  let componentRef: ComponentRef<BmbAccordionComponent>;

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
    component.toggle();
    expect(component['_expanded']()).toBe(true);
    component.toggle();
    expect(component['_expanded']()).toBe(false);
  });

  it('should emit opened and closed events', () => {
    spyOn(component.opened, 'emit');
    spyOn(component.closed, 'emit');

    component.toggle();
    expect(component.opened.emit).toHaveBeenCalled();

    component.toggle();
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should return correct classes for accordion', () => {
    componentRef.setInput('borderRadius', 'm');
    componentRef.setInput('margin', 'm');
    componentRef.setInput('disabled', false);
    componentRef.setInput('active', true);

    const classes = component.getClassesAccordion();
    expect(classes).toContain('bmb_border-radius-m');
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
    component.toggle();
    expect(component.getIconToggle()).toBe('expand_less');

    component.toggle();
    expect(component.getIconToggle()).toBe('expand_more');
  });
});
