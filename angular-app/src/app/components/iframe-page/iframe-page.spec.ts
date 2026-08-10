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

  it('should update the iframe controls', () => {
    component.setSrc('https://example.com/embed');
    component.setUseSrcdoc(true);
    component.setSrcdoc('<p>Inline demo</p>');
    component.setWidth('640');
    component.setHeight('480');
    component.setLoading('eager');
    component.setName('Example iframe');
    component.setTitle('Example title');
    component.setSandboxEnabled(true);
    component.setSandbox('allow-scripts');
    component.setAllowEnabled(true);
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
    fixture.detectChanges();

    expect(component.src()).toBe('https://example.com/embed');
    expect(component.useSrcdoc()).toBe(true);
    expect(component.srcdoc()).toBe('<p>Inline demo</p>');
    expect(component.width()).toBe('640');
    expect(component.height()).toBe('480');
    expect(component.loading()).toBe('eager');
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
    const loadingOptions = Array.from(
      fixture.nativeElement.querySelectorAll<HTMLSelectElement>(
        '#iframe-loading option',
      ),
    ).map((option) => option.value);
    const referrerPolicyOptions = Array.from(
      fixture.nativeElement.querySelectorAll<HTMLSelectElement>(
        '#iframe-referrer-policy option',
      ),
    ).map((option) => option.value);

    expect(loadingOptions).toEqual(['eager', 'lazy']);
    expect(referrerPolicyOptions).toEqual([
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
