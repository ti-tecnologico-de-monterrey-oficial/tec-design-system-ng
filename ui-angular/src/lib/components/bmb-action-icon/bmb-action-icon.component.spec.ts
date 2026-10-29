import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbActionIconComponent } from './bmb-action-icon.component';
import { ComponentRef } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('BmbActionIconComponent', () => {
  let component: BmbActionIconComponent;
  let fixture: ComponentFixture<BmbActionIconComponent>;
  let componentRef: ComponentRef<BmbActionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbActionIconComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbActionIconComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'face');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the default test ID', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector(
      'bmb-check-external-link-button',
    );
    expect(element.getAttribute('data-testid')).toBe('action-icon-button');
  });

  it.each(['', 'https://example.com', '/internal'])(
    'should update the test ID for link "%s"',
    (link) => {
      componentRef.setInput('link', link);
      componentRef.setInput('testId', 'custom-action');
      fixture.detectChanges();

      const element: HTMLElement = fixture.nativeElement.querySelector(
        'bmb-check-external-link-button',
      );
      expect(element.getAttribute('data-testid')).toBe('custom-action');

      componentRef.setInput('testId', 'updated-action');
      fixture.detectChanges();
      expect(element.getAttribute('data-testid')).toBe('updated-action');
    },
  );

  it('should emit buttonPress on handlePress', () => {
    jest.spyOn(component.buttonPress, 'emit');
    component.handlePress();
    expect(component.buttonPress.emit).toHaveBeenCalled();
  });

  it('should emit buttonClick on handleClick', () => {
    jest.spyOn(component.buttonClick, 'emit');
    component.handleClick();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should return correct icon when isToggleActive is true', () => {
    componentRef.setInput('isToggleActive', true);
    componentRef.setInput('toggleIconActive', 'toggle');
    expect(component.getIcon()).toBe('toggle');
  });

  it('should return correct icon when isToggleActive is false', () => {
    componentRef.setInput('isToggleActive', false);
    componentRef.setInput('toggleIconActive', 'toggle');
    expect(component.getIcon()).toBe('face');
  });

  it('should return correct icon when toggleIconActive is undefined', () => {
    componentRef.setInput('isToggleActive', true);
    componentRef.setInput('toggleIconActive', undefined);
    expect(component.getIcon()).toBe('face');
  });

  it('should toggle isToggleActive on handleClick when toggleIconActive is set', () => {
    componentRef.setInput('toggleIconActive', 'toggle');
    expect(component.isToggleActive()).toBe(false);

    component.handleClick();

    expect(component.isToggleActive()).toBe(true);
  });

  it('should not toggle isToggleActive on handleClick when toggleIconActive is not set', () => {
    component.handleClick();
    expect(component.isToggleActive()).toBe(false);
  });

  it('should return null for safeSVG when not an SVG template but a custom icon is set', () => {
    (component as unknown as { customActionIcon: () => unknown }).customActionIcon =
      () => 'template';
    componentRef.setInput('isSVGTemplate', false);
    expect(component.safeSVG).toBeNull();
  });

  it('should return null for safeSVG when an SVG template but no custom icon is set', () => {
    (component as unknown as { customActionIcon: () => unknown }).customActionIcon =
      () => undefined;
    componentRef.setInput('isSVGTemplate', true);
    expect(component.safeSVG).toBeNull();
  });

  it('should return sanitized safe html for safeSVG when an SVG template with a custom icon', () => {
    (component as unknown as { customActionIcon: () => unknown }).customActionIcon =
      () => 'template';
    componentRef.setInput('isSVGTemplate', true);
    expect(component.safeSVG).not.toBeNull();
  });

  it('should detect image icons via isImage', () => {
    expect(component.isImage('https://example.com/icon.png')).toBe(true);
    expect(component.isImage('face')).toBe(false);
  });

  it('should emit imageNotFoundError on handleImageNotFoundError', () => {
    jest.spyOn(component.imageNotFoundError, 'emit');
    component.handleImageNotFoundError();
    expect(component.imageNotFoundError.emit).toHaveBeenCalled();
  });
});
