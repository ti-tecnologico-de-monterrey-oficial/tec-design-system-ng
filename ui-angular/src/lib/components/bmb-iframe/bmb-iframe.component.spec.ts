import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BmbIframeComponent,
  type BmbIframeAlign,
  type BmbIframeImportance,
  type BmbIframeLoading,
  type BmbIframeReferrerPolicy,
  type BmbIframeScrolling,
} from './bmb-iframe.component';

const LOADING_OPTIONS: BmbIframeLoading[] = ['eager', 'lazy'];
const IMPORTANCE_OPTIONS: BmbIframeImportance[] = ['auto', 'high', 'low'];
const SCROLLING_OPTIONS: BmbIframeScrolling[] = ['auto', 'yes', 'no'];
const ALIGN_OPTIONS: BmbIframeAlign[] = [
  'top',
  'middle',
  'bottom',
  'left',
  'right',
];
const REFERRER_POLICY_OPTIONS: BmbIframeReferrerPolicy[] = [
  'no-referrer',
  'no-referrer-when-downgrade',
  'origin',
  'origin-when-cross-origin',
  'same-origin',
  'strict-origin',
  'strict-origin-when-cross-origin',
  'unsafe-url',
];

describe('BmbIframeComponent', () => {
  let component: BmbIframeComponent;
  let fixture: ComponentFixture<BmbIframeComponent>;
  let componentRef: ComponentRef<BmbIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbIframeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbIframeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('src', 'https://example.com/embed');
    fixture.detectChanges();
  });

  it('should create with all default input values', () => {
    expect(component).toBeTruthy();
    expect(component.height()).toBe('100%');
    expect(component.src()).toBe('https://example.com/embed');
    expect(component.srcdoc()).toBeNull();
    expect(component.width()).toBe('100%');
    expect(component.loading()).toBe('eager');
    expect(component.importance()).toBe('auto');
    expect(component.frameborder()).toBe('0');
    expect(component.scrolling()).toBe('auto');
    expect(component.align()).toBeNull();
    expect(component.longdesc()).toBeNull();
    expect(component.name()).toBe('');
    expect(component.title()).toBe('');
    expect(component.sandbox()).toBeNull();
    expect(component.allow()).toBeNull();
    expect(component.allowFullscreen()).toBe(false);
    expect(component.credentialless()).toBe(false);
    expect(component.csp()).toBeNull();
    expect(component.referrerPolicy()).toBeNull();
    expect(component.iframeId()).toBe('');
    expect(component.iframeClass()).toBe('');
    expect(component.iframeStyle()).toBe('');
    expect(component.iframeAttributes()).toEqual({});
  });

  it('should render only the default native attributes', () => {
    const iframe = getIframe();
    expect(iframe.getAttribute('src')).toBe('https://example.com/embed');
    expect(iframe.getAttribute('width')).toBe('100%');
    expect(iframe.getAttribute('height')).toBe('100%');
    expect(iframe.getAttribute('loading')).toBe('eager');
    expect(iframe.getAttribute('importance')).toBe('auto');
    expect(iframe.getAttribute('frameborder')).toBe('0');
    expect(iframe.getAttribute('scrolling')).toBe('auto');
    [
      'srcdoc',
      'sandbox',
      'allow',
      'allowfullscreen',
      'credentialless',
      'csp',
      'referrerpolicy',
      'align',
      'longdesc',
    ].forEach((attribute) =>
      expect(iframe.hasAttribute(attribute)).toBe(false),
    );
  });

  it('should set content, dimension, name and title inputs', () => {
    componentRef.setInput('height', '500px');
    componentRef.setInput('width', 640);
    componentRef.setInput('loading', 'lazy');
    componentRef.setInput('name', 'iframeName');
    componentRef.setInput('src', 'https://example.com');
    componentRef.setInput('title', 'Embedded example');
    fixture.detectChanges();

    const iframe = getIframe();
    expect(iframe.getAttribute('height')).toBe('500px');
    expect(iframe.getAttribute('width')).toBe('640');
    expect(iframe.getAttribute('loading')).toBe('lazy');
    expect(iframe.getAttribute('name')).toBe('iframeName');
    expect(iframe.getAttribute('title')).toBe('Embedded example');
    expect(iframe.getAttribute('src')).toBe('https://example.com');
  });

  it.each(LOADING_OPTIONS)('should render the %s loading option', (loading) => {
    componentRef.setInput('loading', loading);
    fixture.detectChanges();
    expect(getIframe().getAttribute('loading')).toBe(loading);
  });

  it.each(IMPORTANCE_OPTIONS)(
    'should render the %s importance option',
    (importance) => {
      componentRef.setInput('importance', importance);
      fixture.detectChanges();
      expect(component.importance()).toBe(importance);
      expect(getIframe().getAttribute('importance')).toBe(importance);
    },
  );

  it.each(SCROLLING_OPTIONS)(
    'should render the %s scrolling option',
    (scrolling) => {
      componentRef.setInput('scrolling', scrolling);
      fixture.detectChanges();
      expect(getIframe().getAttribute('scrolling')).toBe(scrolling);
    },
  );

  it.each(ALIGN_OPTIONS)('should render the %s align option', (align) => {
    componentRef.setInput('align', align);
    fixture.detectChanges();
    expect(getIframe().getAttribute('align')).toBe(align);
  });

  it('should render frameborder and longdesc values', () => {
    componentRef.setInput('frameborder', 1);
    componentRef.setInput('longdesc', 'https://example.com/description');
    fixture.detectChanges();
    expect(getIframe().getAttribute('frameborder')).toBe('1');
    expect(getIframe().getAttribute('longdesc')).toBe(
      'https://example.com/description',
    );
  });

  it.each(REFERRER_POLICY_OPTIONS)(
    'should render the %s referrer policy option',
    (referrerPolicy) => {
      componentRef.setInput('referrerPolicy', referrerPolicy);
      fixture.detectChanges();
      expect(getIframe().getAttribute('referrerpolicy')).toBe(referrerPolicy);
    },
  );

  it('should apply native security and permission attributes', () => {
    componentRef.setInput('sandbox', 'allow-scripts allow-same-origin');
    componentRef.setInput('allow', 'fullscreen; camera');
    componentRef.setInput('allowFullscreen', true);
    componentRef.setInput('credentialless', true);
    componentRef.setInput('csp', "default-src 'self'");
    fixture.detectChanges();

    const iframe = getIframe();
    expect(iframe.getAttribute('sandbox')).toBe(
      'allow-scripts allow-same-origin',
    );
    expect(iframe.getAttribute('allow')).toBe('fullscreen; camera');
    expect(iframe.hasAttribute('allowfullscreen')).toBe(true);
    expect(iframe.hasAttribute('credentialless')).toBe(true);
    expect(iframe.getAttribute('csp')).toBe("default-src 'self'");
  });

  it('should preserve empty nullable security attributes', () => {
    componentRef.setInput('sandbox', '');
    componentRef.setInput('allow', '');
    componentRef.setInput('csp', '');
    fixture.detectChanges();
    expect(getIframe().getAttribute('sandbox')).toBe('');
    expect(getIframe().getAttribute('allow')).toBe('');
    expect(getIframe().getAttribute('csp')).toBe('');
  });

  it('should remove nullable and boolean attributes when reset', () => {
    componentRef.setInput('sandbox', 'allow-scripts');
    componentRef.setInput('allow', 'camera');
    componentRef.setInput('allowFullscreen', true);
    componentRef.setInput('credentialless', true);
    componentRef.setInput('csp', "default-src 'none'");
    componentRef.setInput('referrerPolicy', 'same-origin');
    fixture.detectChanges();
    componentRef.setInput('sandbox', null);
    componentRef.setInput('allow', null);
    componentRef.setInput('allowFullscreen', false);
    componentRef.setInput('credentialless', false);
    componentRef.setInput('csp', null);
    componentRef.setInput('referrerPolicy', null);
    fixture.detectChanges();

    [
      'sandbox',
      'allow',
      'allowfullscreen',
      'credentialless',
      'csp',
      'referrerpolicy',
    ].forEach((attribute) =>
      expect(getIframe().hasAttribute(attribute)).toBe(false),
    );
  });

  it('should prefer srcdoc over src, including an empty srcdoc', () => {
    componentRef.setInput('srcdoc', '<p>Embedded content</p>');
    fixture.detectChanges();
    expect(getIframe().getAttribute('srcdoc')).toBe('<p>Embedded content</p>');
    expect(getIframe().hasAttribute('src')).toBe(false);

    componentRef.setInput('srcdoc', '');
    fixture.detectChanges();
    expect(getIframe().getAttribute('srcdoc')).toBe('');
    expect(getIframe().hasAttribute('src')).toBe(false);
  });

  it('should render a blank iframe when src and srcdoc are absent', () => {
    componentRef.setInput('src', '');
    componentRef.setInput('srcdoc', null);
    fixture.detectChanges();
    expect(getIframe().hasAttribute('src')).toBe(false);
    expect(getIframe().hasAttribute('srcdoc')).toBe(false);
  });

  it('should support global and additional attributes', () => {
    componentRef.setInput('iframeId', 'video-frame');
    componentRef.setInput('iframeClass', 'responsive-frame');
    componentRef.setInput('iframeStyle', 'border: 0;');
    componentRef.setInput('iframeAttributes', {
      'aria-label': 'Tutorial video',
      'data-testid': 'tutorial',
      tabindex: 0,
      inert: true,
      hidden: false,
      'data-null': null,
      'data-undefined': undefined,
    });
    fixture.detectChanges();

    const iframe = getIframe();
    expect(iframe.id).toBe('video-frame');
    expect(iframe.className).toBe('responsive-frame');
    expect(iframe.getAttribute('style')).toBe('border: 0;');
    expect(iframe.getAttribute('aria-label')).toBe('Tutorial video');
    expect(iframe.getAttribute('data-testid')).toBe('tutorial');
    expect(iframe.getAttribute('tabindex')).toBe('0');
    expect(iframe.getAttribute('inert')).toBe('');
    expect(iframe.hasAttribute('hidden')).toBe(false);
    expect(iframe.hasAttribute('data-null')).toBe(false);
    expect(iframe.hasAttribute('data-undefined')).toBe(false);
  });

  it('should prevent managed overrides and event-handler attributes', () => {
    componentRef.setInput('iframeAttributes', {
      SRC: 'https://malicious.example',
      SandBox: 'allow-everything',
      onClick: 'alert(1)',
      ONLOAD: 'alert(2)',
    });
    fixture.detectChanges();
    expect(getIframe().getAttribute('src')).toBe('https://example.com/embed');
    expect(getIframe().hasAttribute('sandbox')).toBe(false);
    expect(getIframe().hasAttribute('onclick')).toBe(false);
    expect(getIframe().hasAttribute('onload')).toBe(false);
  });

  it('should recreate the iframe when an input changes', () => {
    const originalIframe = getIframe();
    componentRef.setInput('sandbox', 'allow-scripts');
    fixture.detectChanges();
    expect(getIframe()).not.toBe(originalIframe);
    expect(getIframe().getAttribute('sandbox')).toBe('allow-scripts');
  });

  it('should emit iframeLoad and stop listening to replaced iframes', () => {
    const listener = jest.fn();
    component.iframeLoad.subscribe(listener);
    const originalIframe = getIframe();
    originalIframe.dispatchEvent(new Event('load'));
    componentRef.setInput('sandbox', 'allow-scripts');
    fixture.detectChanges();
    originalIframe.dispatchEvent(new Event('load'));
    getIframe().dispatchEvent(new Event('load'));
    expect(listener).toHaveBeenCalledTimes(2);
  });

  function getIframe(): HTMLIFrameElement {
    return fixture.nativeElement.querySelector('iframe');
  }
});
