import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IframePage } from './iframe-page';

describe('IframePage', () => {
  let component: IframePage;
  let fixture: ComponentFixture<IframePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IframePage],
    }).compileComponents();
    fixture = TestBed.createComponent(IframePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update all iframe controls', () => {
    component.setSrc('https://example.com/embed');
    component.setUseSrcdoc(true);
    component.setSrcdoc('<p>Inline demo</p>');
    component.setWidth('640');
    component.setHeight('480');
    component.setLoading('eager');
    component.setImportance('high');
    component.setFrameborder('1');
    component.setScrolling('no');
    component.setAlign('right');
    component.setLongdesc('https://example.com/description');
    component.setName('Example iframe');
    component.setTitle('Example title');
    component.setSandboxEnabled(true);
    component.setSandbox('allow-scripts');
    component.setAllow('fullscreen; camera');
    component.setAllowFullscreen(false);
    component.setCredentialless(true);
    component.setCspEnabled(true);
    component.setCsp("default-src 'self'");
    component.setReferrerPolicy('no-referrer');
    component.iframeId.set('example-frame');
    component.iframeClass.set('responsive-frame');
    component.iframeStyle.set('border: 0;');
    component.ariaLabel.set('Example preview');
    component.dataDemo.set('example');

    expect(component.src()).toBe('https://example.com/embed');
    expect(component.useSrcdoc()).toBe(true);
    expect(component.srcdoc()).toBe('<p>Inline demo</p>');
    expect(component.width()).toBe('640');
    expect(component.height()).toBe('480');
    expect(component.loading()).toBe('eager');
    expect(component.importance()).toBe('high');
    expect(component.frameborder()).toBe('1');
    expect(component.scrolling()).toBe('no');
    expect(component.align()).toBe('right');
    expect(component.longdesc()).toBe('https://example.com/description');
    expect(component.name()).toBe('Example iframe');
    expect(component.title()).toBe('Example title');
    expect(component.sandbox()).toBe('allow-scripts');
    expect(component.allow()).toBe('fullscreen; camera');
    expect(component.allowFullscreen()).toBe(false);
    expect(component.credentialless()).toBe(true);
    expect(component.csp()).toBe("default-src 'self'");
    expect(component.referrerPolicy()).toBe('no-referrer');
    expect(component.iframeAttributes()).toEqual({
      'aria-label': 'Example preview',
      'data-demo': 'example',
    });
  });

  it('should expose every loading and referrer policy option', () => {
    const values = (selector: string) =>
      Array.from(fixture.nativeElement.querySelectorAll(selector)).map(
        (option: unknown) => (option as HTMLOptionElement).value,
      );
    expect(values('#iframe-loading option')).toEqual(['eager', 'lazy']);
    expect(values('#iframe-importance option')).toEqual([
      'auto',
      'high',
      'low',
    ]);
    expect(values('#iframe-scrolling option')).toEqual(['auto', 'yes', 'no']);
    expect(values('#iframe-align option')).toEqual([
      '',
      'top',
      'middle',
      'bottom',
      'left',
      'right',
    ]);
    expect(values('#iframe-referrer-policy option')).toEqual([
      '',
      'no-referrer',
      'no-referrer-when-downgrade',
      'origin',
      'origin-when-cross-origin',
      'same-origin',
      'strict-origin',
      'strict-origin-when-cross-origin',
      'unsafe-url',
    ]);
  });

  it('should bind every property to the native iframe', () => {
    component.setUseSrcdoc(true);
    component.setSrcdoc('<p>Bound content</p>');
    component.setWidth('720');
    component.setHeight('405');
    component.setLoading('lazy');
    component.setImportance('low');
    component.setFrameborder('1');
    component.setScrolling('yes');
    component.setAlign('left');
    component.setLongdesc('https://example.com/long-description');
    component.setName('bound-frame');
    component.setTitle('Bound frame');
    component.setSandboxEnabled(true);
    component.setSandbox('allow-scripts allow-same-origin');
    component.setAllow('fullscreen; microphone');
    component.setAllowFullscreen(true);
    component.setCredentialless(true);
    component.setCspEnabled(true);
    component.setCsp("default-src 'none'");
    component.setReferrerPolicy('origin-when-cross-origin');
    component.iframeId.set('bound-frame-id');
    component.iframeClass.set('bound-frame-class');
    component.iframeStyle.set('background: black;');
    component.ariaLabel.set('Bound iframe');
    component.dataDemo.set('bound');
    fixture.detectChanges();

    const iframe = getIframe();
    expect(iframe.getAttribute('srcdoc')).toBe('<p>Bound content</p>');
    expect(iframe.hasAttribute('src')).toBe(false);
    expect(iframe.getAttribute('width')).toBe('720');
    expect(iframe.getAttribute('height')).toBe('405');
    expect(iframe.getAttribute('loading')).toBe('lazy');
    expect(iframe.getAttribute('importance')).toBe('low');
    expect(iframe.getAttribute('frameborder')).toBe('1');
    expect(iframe.getAttribute('scrolling')).toBe('yes');
    expect(iframe.getAttribute('align')).toBe('left');
    expect(iframe.getAttribute('longdesc')).toBe(
      'https://example.com/long-description',
    );
    expect(iframe.getAttribute('name')).toBe('bound-frame');
    expect(iframe.getAttribute('title')).toBe('Bound frame');
    expect(iframe.getAttribute('sandbox')).toBe(
      'allow-scripts allow-same-origin',
    );
    expect(iframe.getAttribute('allow')).toBe('fullscreen; microphone');
    expect(iframe.hasAttribute('allowfullscreen')).toBe(true);
    expect(iframe.hasAttribute('credentialless')).toBe(true);
    expect(iframe.getAttribute('csp')).toBe("default-src 'none'");
    expect(iframe.getAttribute('referrerpolicy')).toBe(
      'origin-when-cross-origin',
    );
    expect(iframe.id).toBe('bound-frame-id');
    expect(iframe.className).toBe('bound-frame-class');
    expect(iframe.getAttribute('style')).toBe('background: black;');
    expect(iframe.getAttribute('aria-label')).toBe('Bound iframe');
    expect(iframe.getAttribute('data-demo')).toBe('bound');
  });

  it('should show the effective configuration in the diagnostic panel', () => {
    component.setUseSrcdoc(true);
    component.setSrcdoc('<p>Diagnostic content</p>');
    component.setSandboxEnabled(true);
    component.setSandbox('allow-scripts');
    component.setReferrerPolicy('strict-origin');
    component.setCredentialless(true);
    fixture.detectChanges();

    const configuration = JSON.parse(
      fixture.nativeElement.querySelector(
        '[data-testid="iframe-configuration"]',
      ).textContent,
    );

    expect(configuration.src).toBeNull();
    expect(configuration.srcdoc).toBe('<p>Diagnostic content</p>');
    expect(configuration.importance).toBe('auto');
    expect(configuration.frameborder).toBe('0');
    expect(configuration.scrolling).toBe('auto');
    expect(configuration.align).toBeNull();
    expect(configuration.longdesc).toBeNull();
    expect(configuration.sandbox).toBe('allow-scripts');
    expect(configuration.referrerPolicy).toBe('strict-origin');
    expect(configuration.credentialless).toBe(true);
    expect(configuration.iframeAttributes).toEqual({
      'aria-label': 'Interactive Bamboo iframe preview',
      'data-demo': 'iframe-page',
    });
  });

  it('should add and remove nullable security attributes', () => {
    component.setSandboxEnabled(true);
    component.setAllowEnabled(true);
    component.setCspEnabled(true);
    expect(component.sandbox()).toBe('');
    expect(component.allow()).toBe('');
    expect(component.csp()).toBe('');
    component.setSandboxEnabled(false);
    component.setAllowEnabled(false);
    component.setCspEnabled(false);
    component.setReferrerPolicy('');
    expect(component.sandbox()).toBeNull();
    expect(component.allow()).toBeNull();
    expect(component.csp()).toBeNull();
    expect(component.referrerPolicy()).toBeNull();
  });

  it('should count iframe load events', () => {
    const initialLoadCount = component.loadCount();
    getIframe().dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(component.loadCount()).toBe(initialLoadCount + 1);
    expect(
      fixture.nativeElement.querySelector('[role="status"]').textContent,
    ).toContain(String(initialLoadCount + 1));
  });

  function getIframe(): HTMLIFrameElement {
    return fixture.nativeElement.querySelector('iframe');
  }
});
