import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTitleContentComponent } from './bmb-title-content.component';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbFullTextDirective } from '../../directives/bmb-full-text/bmb-full-text.directive';

const TITLE_FIXTURE = 'A title used to verify title-content behavior';

describe('BmbTitleContentTemplateComponent', () => {
  let component: BmbTitleContentComponent;
  let fixture: ComponentFixture<BmbTitleContentComponent>;
  let componentRef: ComponentRef<BmbTitleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTitleContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTitleContentComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', TITLE_FIXTURE);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep the title unclamped and not focusable by default', () => {
    const heading: HTMLElement = fixture.nativeElement.querySelector('h2');

    expect(component.showFullText()).toBe(false);
    expect(
      heading.classList.contains(
        'bmb_title-content-container-wrapper-title--clamp',
      ),
    ).toBe(false);
    expect(heading.hasAttribute('tabindex')).toBe(false);
    expect(
      fixture.debugElement
        .query(By.directive(BmbFullTextDirective))
        .injector.get(BmbFullTextDirective)
        .bmbFullTextEnabled(),
    ).toBe(false);
  });

  it('should clamp the title and enable the full text when showFullText is true', () => {
    componentRef.setInput('componentTitle', TITLE_FIXTURE);
    componentRef.setInput('showFullText', true);
    fixture.detectChanges();

    const heading: HTMLElement = fixture.nativeElement.querySelector('h2');
    const directive = fixture.debugElement
      .query(By.directive(BmbFullTextDirective))
      .injector.get(BmbFullTextDirective);

    expect(
      heading.classList.contains(
        'bmb_title-content-container-wrapper-title--clamp',
      ),
    ).toBe(true);
    expect(
      fixture.nativeElement
        .querySelector('.bmb_title-content-container-wrapper')
        .classList.contains('bmb_title-content-container-wrapper--clamp'),
    ).toBe(true);
    expect(heading.getAttribute('tabindex')).toBe('0');
    expect(heading.textContent?.trim()).toBe(TITLE_FIXTURE);
    expect(directive.bmbFullText()).toBe(TITLE_FIXTURE);
    expect(directive.bmbFullTextEnabled()).toBe(true);
  });

  it('should render a plain icon using the requested size', () => {
    componentRef.setInput('icon', 'assets/svg/warning_fill.svg');
    componentRef.setInput('iconSize', 48);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.directive(BmbIconComponent));

    expect(icon).toBeTruthy();
    expect(icon.componentInstance.size()).toBe(48);
    expect(fixture.nativeElement.querySelector('bmb-box-icon')).toBeNull();
  });

  it('should preserve the boxed icon when a background is requested', () => {
    componentRef.setInput('icon', 'home');
    componentRef.setInput('bgIconAppearance', 'white-primary');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('bmb-box-icon')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector(
        '.bmb_title-content-container-icon bmb-icon',
      ),
    ).toBeNull();
  });

  it('should report when no title is provided', () => {
    const emptyFixture = TestBed.createComponent(BmbTitleContentComponent);

    expect(() => emptyFixture.detectChanges()).toThrow(
      'The "componentTitle" input is required. Please provide a value for it.',
    );
  });

  it('should keep supporting the deprecated title input', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const legacyFixture = TestBed.createComponent(BmbTitleContentComponent);
    legacyFixture.componentRef.setInput('title', TITLE_FIXTURE);

    expect(() => legacyFixture.detectChanges()).not.toThrow();
    expect(legacyFixture.nativeElement.querySelector('h2').textContent).toContain(
      TITLE_FIXTURE,
    );

    warn.mockRestore();
  });

  it('should identify image paths for icon rendering', () => {
    expect(component.isImage('assets/icon.svg')).toBe(true);
    expect(component.isImage('home')).toBe(false);
  });
});
