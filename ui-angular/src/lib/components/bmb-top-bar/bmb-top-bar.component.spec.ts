import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTopBarComponent } from './bmb-top-bar.component';
import { ComponentRef } from '@angular/core';

describe('BmbTopBarComponent', () => {
  let component: BmbTopBarComponent;
  let fixture: ComponentFixture<BmbTopBarComponent>;
  let componentRef: ComponentRef<BmbTopBarComponent>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [BmbTopBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTopBarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to the non-mitec logos when image/mobileImage are empty', () => {
    expect(component.image()).toBe(component.imageDefault);
    expect(component.mobileImage()).toBe(component.mobileImageDefault);
  });

  it('should default to the mitec logos when mitec is enabled', () => {
    localStorage.clear();
    const mitecFixture = TestBed.createComponent(BmbTopBarComponent);
    const mitecComponentRef = mitecFixture.componentRef;
    mitecComponentRef.setInput('mitec', true);
    mitecFixture.detectChanges();
    const mitecComponent = mitecFixture.componentInstance;

    expect(mitecComponent.image()).toBe(mitecComponent.imageMitecDefault);
    expect(mitecComponent.mobileImage()).toBe(
      mitecComponent.mobileImageMitecDefault,
    );
  });

  it('should keep the provided image/mobileImage values when they are not empty', () => {
    localStorage.clear();
    const customFixture = TestBed.createComponent(BmbTopBarComponent);
    const customComponentRef = customFixture.componentRef;
    customComponentRef.setInput('image', 'custom-image.svg');
    customComponentRef.setInput('mobileImage', 'custom-mobile-image.svg');
    customFixture.detectChanges();
    const customComponent = customFixture.componentInstance;

    expect(customComponent.image()).toBe('custom-image.svg');
    expect(customComponent.mobileImage()).toBe('custom-mobile-image.svg');
  });

  it('should show the animation the first time and skip it afterwards', () => {
    localStorage.clear();
    const firstFixture = TestBed.createComponent(BmbTopBarComponent);
    firstFixture.detectChanges();
    expect(firstFixture.componentInstance.showAnimation).toBe(true);
    expect(localStorage.getItem('bmbTopBarViewed')).toBe('true');

    const secondFixture = TestBed.createComponent(BmbTopBarComponent);
    secondFixture.detectChanges();
    expect(secondFixture.componentInstance.showAnimation).toBe(false);
  });
});
