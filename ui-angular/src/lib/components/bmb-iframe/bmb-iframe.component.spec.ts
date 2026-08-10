import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  BmbIframeComponent,
  type BmbIframeLoading,
  type BmbIframeReferrerPolicy,
} from './bmb-iframe.component';

const LOADING_OPTIONS: BmbIframeLoading[] = ['eager', 'lazy'];
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.height()).toBe('100%');
    expect(component.src()).toBe('https://example.com/embed');
    expect(component.width()).toBe('100%');
    expect(component.loading()).toBe('eager');
    expect(component.name()).toBe('');
    expect(component.title()).toBe('');
    expect(component.srcdoc()).toBeNull();
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

  it('should render only the default native attributes when optional inputs are omitted', () => {
    const iframe = getIframe();

    expect(iframe.getAttribute('src')).toBe('https://example.com/embed');
    expect(iframe.getAttribute('width')).toBe('100%');
    expect(iframe.getAttribute('height')).toBe('100%');
    expect(iframe.getAttribute('loading')).toBe('eager');
    expect(iframe.getAttribute('frameborder')).toBe('0');
    [
      'srcdoc',
      'name',
      'title',
      'sandbox',
      'allow',
      'allowfullscreen',
      'credentialless',
      'csp',
      'referrerpolicy',
      'id',
      'class',
      'style',
    ].forEach((attribute) =>
      expect(iframe.hasAttribute(attribute)).toBe(false),
    );
  });

  it('should set input values correctly', () => {
    componentRef.setInput('height', '500px');
    componentRef.setInput('width', '500px');
    componentRef.setInput('loading', 'lazy');
    componentRef.setInput('name', 'iframeName');
    componentRef.setInput('src', 'https://example.com');
    componentRef.setInput('title', 'Embedded example');

    expect(component.height()).toBe('500px');
    expect(component.width()).toBe('500px');
    expect(component.loading()).toBe('lazy');
    expect(component.name()).toBe('iframeName');
    expect(component.src()).toBe('https://example.com');

    fixture.detectChanges();
    const iframe: HTMLIFrameElement =
      fixture.nativeElement.querySelector('iframe');

    expect(iframe.getAttribute('height')).toBe('500px');
    expect(iframe.getAttribute('width')).toBe('500px');
    expect(iframe.getAttribute('loading')).toBe('lazy');
    expect(iframe.getAttribute('name')).toBe('iframeName');
    expect(iframe.getAttribute('title')).toBe('Embedded example');
    expect(iframe.getAttribute('src')).toBe('https://example.com');
  });

  it('should render numeric width and height values', () => {
    componentRef.setInput('width', 640);
    componentRef.setInput('height', 360);
    fixture.detectChanges();

    expect(getIframe().getAttribute('width')).toBe('640');
    expect(getIframe().getAttribute('height')).toBe('360');
  });

  it.each(LOADING_OPTIONS)('should render the %s loading option', (loading) => {
    componentRef.setInput('loading', loading);
    fixture.detectChanges();

    expect(component.loading()).toBe(loading);
    expect(getIframe().getAttribute('loading')).toBe(loading);
  });

  it.each(REFERRER_POLICY_OPTIONS)(
    'should render the %s referrer policy option',
    (referrerPolicy) => {
      componentRef.setInput('referrerPolicy', referrerPolicy);
      fixture.detectChanges();

      expect(component.referrerPolicy()).toBe(referrerPolicy);
      expect(getIframe().getAttribute('referrerpolicy')).toBe(referrerPolicy);
    },
  );

  it('should apply native security and permission attributes', () => {
    componentRef.setInput('sandbox', 'allow-scripts allow-same-origin');
    componentRef.setInput('allow', 'fullscreen; camera');
    componentRef.setInput('allowFullscreen', true);
    componentRef.setInput('credentialless', true);
    componentRef.setInput('csp', "default-src 'self'");
    componentRef.setInput('referrerPolicy', 'no-referrer');
    fixture.detectChanges();

    const iframe = getIframe();
    expect(iframe.getAttribute('sandbox')).toBe(
      'allow-scripts allow-same-origin',
    );
    expect(iframe.getAttribute('allow')).toBe('fullscreen; camera');
    expect(iframe.hasAttribute('allowfullscreen')).toBe(true);
    expect(iframe.hasAttribute('credentialless')).toBe(true);
    expect(iframe.getAttribute('csp')).toBe("default-src 'self'");
    expect(iframe.getAttribute('referrerpolicy')).toBe('no-referrer');
  });

  it('should preserve empty values for nullable security attributes', () => {
    componentRef.setInput('sandbox', '');
    componentRef.setInput('allow', '');
    componentRef.setInput('csp', '');
    fixture.detectChanges();

    const iframe = getIframe();
    expect(iframe.getAttribute('sandbox')).toBe('');
    expect(iframe.getAttribute('allow')).toBe('');
    expect(iframe.getAttribute('csp')).toBe('');
  });

  it('should remove nullable and boolean attributes when they are reset', () => {
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

    const iframe = getIframe();
    [
      'sandbox',
      'allow',
      'allowfullscreen',
      'credentialless',
      'csp',
      'referrerpolicy',
    ].forEach((attribute) =>
      expect(iframe.hasAttribute(attribute)).toBe(false),
    );
  });

  it('should prefer srcdoc over src', () => {
    componentRef.setInput('src', 'https://example.com/fallback');
    componentRef.setInput('srcdoc', '<p>Embedded content</p>');
    fixture.detectChanges();

    const iframe = getIframe();
    expect(iframe.getAttribute('srcdoc')).toBe('<p>Embedded content</p>');
    expect(iframe.hasAttribute('src')).toBe(false);
  });

  it('should prefer an empty srcdoc over src', () => {
    componentRef.setInput('srcdoc', '');
    fixture.detectChanges();

    const iframe = getIframe();
    expect(iframe.getAttribute('srcdoc')).toBe('');
    expect(iframe.hasAttribute('src')).toBe(false);
  });

  it('should render a blank iframe when src and srcdoc are both absent', () => {
    componentRef.setInput('src', '');
    componentRef.setInput('srcdoc', null);
    fixture.detectChanges();

    const iframe = getIframe();
    expect(iframe.hasAttribute('src')).toBe(false);
    expect(iframe.hasAttribute('srcdoc')).toBe(false);
  });

  it('should support global attributes on the native iframe', () => {
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

  it('should remove optional global attributes when they are reset', () => {
    componentRef.setInput('iframeId', 'frame');
    componentRef.setInput('iframeClass', 'frame-class');
    componentRef.setInput('iframeStyle', 'display: block;');
    componentRef.setInput('name', 'frame-name');
    componentRef.setInput('title', 'Frame title');
    fixture.detectChanges();

    componentRef.setInput('iframeId', '');
    componentRef.setInput('iframeClass', '');
    componentRef.setInput('iframeStyle', '');
    componentRef.setInput('name', '');
    componentRef.setInput('title', '');
    fixture.detectChanges();

    const iframe = getIframe();
    ['id', 'class', 'style', 'name', 'title'].forEach((attribute) =>
      expect(iframe.hasAttribute(attribute)).toBe(false),
    );
  });

  it('should prevent additional attributes from overriding managed attributes or adding event handlers', () => {
    componentRef.setInput('iframeAttributes', {
      SRC: 'https://malicious.example',
      SandBox: 'allow-everything',
      onClick: 'alert(1)',
      ONLOAD: 'alert(2)',
    });
    fixture.detectChanges();

    const iframe = getIframe();
    expect(iframe.getAttribute('src')).toBe('https://example.com/embed');
    expect(iframe.hasAttribute('sandbox')).toBe(false);
    expect(iframe.hasAttribute('onclick')).toBe(false);
    expect(iframe.hasAttribute('onload')).toBe(false);
  });

  it('should recreate the iframe when a sensitive attribute changes', () => {
    const originalIframe = getIframe();

    componentRef.setInput('sandbox', 'allow-scripts');
    fixture.detectChanges();

    const updatedIframe = getIframe();
    expect(updatedIframe).not.toBe(originalIframe);
    expect(updatedIframe.getAttribute('sandbox')).toBe('allow-scripts');
  });

  it('should emit iframeLoad when the native iframe loads', () => {
    const listener = jest.fn();
    component.iframeLoad.subscribe(listener);
    const iframe = getIframe();

    iframe.dispatchEvent(new Event('load'));

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(expect.any(Event));
  });

  it('should stop forwarding load events from a replaced iframe', () => {
    const listener = jest.fn();
    component.iframeLoad.subscribe(listener);
    const originalIframe = getIframe();

    componentRef.setInput('sandbox', 'allow-scripts');
    fixture.detectChanges();
    originalIframe.dispatchEvent(new Event('load'));
    getIframe().dispatchEvent(new Event('load'));

    expect(listener).toHaveBeenCalledTimes(1);
  });

  function getIframe(): HTMLIFrameElement {
    return fixture.nativeElement.querySelector('iframe');
  }
});
