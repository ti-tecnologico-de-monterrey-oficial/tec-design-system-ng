import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTextLinkComponent } from './bmb-text-link.component';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';

describe('BmbTextLinkComponent', () => {
  let component: BmbTextLinkComponent;
  let fixture: ComponentFixture<BmbTextLinkComponent>;
  let componentRef: ComponentRef<BmbTextLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTextLinkComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTextLinkComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('textLink', 'Text Link');
    componentRef.setInput('link', 'https://external.com');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reuse the existing test ID for the link and automation attribute', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector(
      'bmb-check-external-link-button',
    );
    expect(element.getAttribute('data-testid')).toBe(component.testId());

    componentRef.setInput('testId', 'custom-text-link');
    fixture.detectChanges();

    const wrapper: HTMLElement =
      fixture.nativeElement.querySelector('.bmb_text-link');
    expect(element.getAttribute('data-testid')).toBe('custom-text-link');
    expect(wrapper.getAttribute('data-automation-id')).toBe('custom-text-link');
  });
});
