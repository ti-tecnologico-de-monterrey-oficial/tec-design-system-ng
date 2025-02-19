import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbImageComponent } from './bmb-image.component';
import { ComponentRef } from '@angular/core';

describe('BmbImageComponent', () => {
  let component: BmbImageComponent;
  let fixture: ComponentFixture<BmbImageComponent>;
  let componentRef: ComponentRef<BmbImageComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbImageComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.src()).toBe('');
    expect(component.mobileSrc()).toBeUndefined();
    expect(component.alt()).toBe('');
    expect(component.width()).toBe('100%');
    expect(component.ratio()).toBeUndefined();
    expect(component.borderRadius()).toBe('m');
    expect(component.loading()).toBe('lazy');
    expect(component.enableZoom()).toBe(false);
    expect(component.isBlurredBackdrop()).toBe(false);
  });

  it('should return correct classes based on inputs', () => {
    componentRef.setInput('borderRadius', 'l');
    componentRef.setInput('enableZoom', true);
    fixture.detectChanges();

    const classes = component.getClasses();
    expect(classes).toContain('bmb_radius-l');
    expect(classes).toContain('bmb_image-figure-zoom');
  });

  it('should return correct classes when zoom is disabled', () => {
    componentRef.setInput('borderRadius', 's');
    componentRef.setInput('enableZoom', false);
    fixture.detectChanges();

    const classes = component.getClasses();
    expect(classes).toContain('bmb_radius-s');
    expect(classes).not.toContain('bmb_image-figure-zoom');
  });
});
