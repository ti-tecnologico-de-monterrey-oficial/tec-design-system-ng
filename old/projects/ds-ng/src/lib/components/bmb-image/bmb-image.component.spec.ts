import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbImageComponent } from './bmb-image.component';
import { ComponentRef } from '@angular/core';
import { BmbImageItem } from './types';

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

  it('should detect when it is a carousel', () => {
    const images: BmbImageItem[] = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ];

    componentRef.setInput('images', images);
    componentRef.setInput('enableZoom', false);
    componentRef.setInput('isBlurredBackdrop', false);
    fixture.detectChanges();

    expect(component.isCarousel()).toBeTrue();
  });

  it('should not be a carousel when zoom is enabled or blurred backdrop is true', () => {
    const images: BmbImageItem[] = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ];

    componentRef.setInput('images', images);
    componentRef.setInput('enableZoom', true);
    componentRef.setInput('isBlurredBackdrop', false);
    fixture.detectChanges();

    expect(component.isCarousel()).toBeFalse();

    componentRef.setInput('enableZoom', false);
    componentRef.setInput('isBlurredBackdrop', true);
    fixture.detectChanges();

    expect(component.isCarousel()).toBeFalse();
  });

  it('should return currentImage from inputs when not a carousel', () => {
    componentRef.setInput('src', 'simple.jpg');
    componentRef.setInput('mobileSrc', 'simple-mobile.jpg');
    componentRef.setInput('alt', 'Simple');
    componentRef.setInput('images', null);
    fixture.detectChanges();

    const current = component.currentImage();
    expect(current.src).toBe('simple.jpg');
    expect(current.mobileSrc).toBe('simple-mobile.jpg');
    expect(current.alt).toBe('Simple');
  });

  it('should return currentImage from images when it is a carousel', () => {
    const images: BmbImageItem[] = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ];

    componentRef.setInput('images', images);
    componentRef.setInput('enableZoom', false);
    componentRef.setInput('isBlurredBackdrop', false);
    fixture.detectChanges();

    expect(component.isCarousel()).toBeTrue();
    expect(component.currentImage()).toEqual(images[0]);
  });

  it('should encode URLs correctly', () => {
    componentRef.setInput('src', 'image with space.jpg');
    componentRef.setInput('mobileSrc', 'mobile image.jpg');
    fixture.detectChanges();

    expect(component.encodedURL()).toBe('image%20with%20space.jpg');
    expect(component.encodedMobileURL()).toBe('mobile%20image.jpg');
  });

  it('should navigate to next and previous images in carousel', () => {
    const images: BmbImageItem[] = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
      { src: 'image3.jpg', alt: 'Image 3' },
    ];

    componentRef.setInput('images', images);
    componentRef.setInput('enableZoom', false);
    componentRef.setInput('isBlurredBackdrop', false);
    fixture.detectChanges();

    expect(component.currentIndex()).toBe(0);

    component.next();
    expect(component.currentIndex()).toBe(1);

    component.next();
    expect(component.currentIndex()).toBe(2);

    component.next();
    expect(component.currentIndex()).toBe(0);

    component.prev();
    expect(component.currentIndex()).toBe(2);
  });

  it('should not change index when not a carousel', () => {
    componentRef.setInput('images', null);
    fixture.detectChanges();

    const initialIndex = component.currentIndex();
    component.next();
    component.prev();
    expect(component.currentIndex()).toBe(initialIndex);
  });

  it('should emit imageClick on handleImageClick', () => {
    const images: BmbImageItem[] = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ];

    const spy = jasmine.createSpy('imageClickSpy');
    component.imageClick.subscribe(spy);

    component.handleImageClick(images[1], 1);

    expect(spy).toHaveBeenCalledWith({
      img: images[1],
      index: 1,
      cbParams: {},
    });
  });

  it('should emit imageClick on Enter or Space key press', () => {
    const img: BmbImageItem = { src: 'image1.jpg', alt: 'Image 1' };
    const spy = jasmine.createSpy('imageClickSpy');
    component.imageClick.subscribe(spy);

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleImageKeyDown(enterEvent, img, 0);
    expect(spy).toHaveBeenCalledWith({
      img,
      index: 0,
      cbParams: {},
    });

    spy.calls.reset();

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    component.handleImageKeyDown(spaceEvent, img, 1);
    expect(spy).toHaveBeenCalledWith({
      img,
      index: 1,
      cbParams: {},
    });
  });

  it('should not emit imageClick for other keys', () => {
    const img: BmbImageItem = { src: 'image1.jpg', alt: 'Image 1' };
    const spy = jasmine.createSpy('imageClickSpy');
    component.imageClick.subscribe(spy);

    const otherEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    component.handleImageKeyDown(otherEvent, img, 0);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render carousel arrows and call navigation methods on click', () => {
    const images: BmbImageItem[] = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ];

    const nextSpy = spyOn(component, 'next').and.callThrough();
    const prevSpy = spyOn(component, 'prev').and.callThrough();

    componentRef.setInput('images', images);
    componentRef.setInput('enableZoom', false);
    componentRef.setInput('isBlurredBackdrop', false);
    fixture.detectChanges();

    const arrows = fixture.nativeElement.querySelectorAll(
      '.bmb_image-arrow bmb-button-icon',
    );
    expect(arrows.length).toBe(2);

    // Disparamos el evento personalizado que el botón emite
    const leftArrow = arrows[0];
    const rightArrow = arrows[1];

    leftArrow.dispatchEvent(
      new CustomEvent('onButtonClick', { bubbles: true }),
    );
    fixture.detectChanges();
    expect(prevSpy).toHaveBeenCalled();

    rightArrow.dispatchEvent(
      new CustomEvent('onButtonClick', { bubbles: true }),
    );
    fixture.detectChanges();
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should render clickable images in carousel and emit on click', () => {
    const images: BmbImageItem[] = [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ];

    componentRef.setInput('images', images);
    componentRef.setInput('enableZoom', false);
    componentRef.setInput('isBlurredBackdrop', false);
    fixture.detectChanges();

    const spy = jasmine.createSpy('imageClickSpy');
    component.imageClick.subscribe(spy);

    const imgs = fixture.nativeElement.querySelectorAll(
      '.bmb_image-figure-images img.bmb_image-figure-image',
    );
    expect(imgs.length).toBe(2);

    imgs[1].click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith({
      img: images[1],
      index: 1,
      cbParams: {},
    });
  });
});
