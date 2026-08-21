import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  BmbIframeComponent,
  type BmbIframeAlign,
  type BmbIframeImportance,
  type BmbIframeLoading,
  type BmbIframeReferrerPolicy,
  type BmbIframeScrolling,
} from 'ui-angular';

@Component({
  selector: 'app-iframe-page',
  imports: [BmbIframeComponent],
  templateUrl: './iframe-page.html',
  styleUrl: './iframe-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframePage {
  readonly loadingOptions: BmbIframeLoading[] = ['eager', 'lazy'];
  readonly importanceOptions: BmbIframeImportance[] = ['auto', 'high', 'low'];
  readonly scrollingOptions: BmbIframeScrolling[] = ['auto', 'yes', 'no'];
  readonly alignOptions: BmbIframeAlign[] = [
    'top',
    'middle',
    'bottom',
    'left',
    'right',
  ];
  readonly referrerPolicyOptions: BmbIframeReferrerPolicy[] = [
    'no-referrer',
    'no-referrer-when-downgrade',
    'origin',
    'origin-when-cross-origin',
    'same-origin',
    'strict-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url',
  ];
  readonly src = signal(
    'https://www.openstreetmap.org/export/embed.html?bbox=-118.5%2C14.3%2C-86.5%2C32.8&layer=mapnik',
  );
  readonly useSrcdoc = signal(false);
  readonly srcdoc = signal(
    '<!doctype html><html><body><h1>Bamboo iframe</h1><p>Inline srcdoc content.</p></body></html>',
  );
  readonly width = signal('100%');
  readonly height = signal('360');
  readonly loading = signal<BmbIframeLoading>('lazy');
  readonly importance = signal<BmbIframeImportance>('auto');
  readonly frameborder = signal<string | number>('0');
  readonly scrolling = signal<BmbIframeScrolling>('auto');
  readonly align = signal<BmbIframeAlign | null>(null);
  readonly longdesc = signal<string | null>(null);
  readonly name = signal('Bamboo iframe demo');
  readonly title = signal('Bamboo component preview');
  readonly sandbox = signal<string | null>(null);
  readonly allow = signal<string | null>('fullscreen');
  readonly allowFullscreen = signal(true);
  readonly credentialless = signal(false);
  readonly csp = signal<string | null>(null);
  readonly referrerPolicy = signal<BmbIframeReferrerPolicy | null>(
    'strict-origin-when-cross-origin',
  );
  readonly iframeId = signal('bamboo-iframe-preview');
  readonly iframeClass = signal('bamboo-iframe-preview');
  readonly iframeStyle = signal('background: white;');
  readonly ariaLabel = signal('Interactive Bamboo iframe preview');
  readonly dataDemo = signal('iframe-page');
  readonly loadCount = signal(0);
  readonly iframeAttributes = computed(() => ({
    'aria-label': this.ariaLabel(),
    'data-demo': this.dataDemo(),
  }));
  readonly configurationJson = computed(() =>
    JSON.stringify(
      {
        src: this.useSrcdoc() ? null : this.src(),
        srcdoc: this.useSrcdoc() ? this.srcdoc() : null,
        width: this.width(),
        height: this.height(),
        loading: this.loading(),
        importance: this.importance(),
        frameborder: this.frameborder(),
        scrolling: this.scrolling(),
        align: this.align(),
        longdesc: this.longdesc(),
        name: this.name(),
        title: this.title(),
        sandbox: this.sandbox(),
        allow: this.allow(),
        allowFullscreen: this.allowFullscreen(),
        credentialless: this.credentialless(),
        csp: this.csp(),
        referrerPolicy: this.referrerPolicy(),
        iframeId: this.iframeId(),
        iframeClass: this.iframeClass(),
        iframeStyle: this.iframeStyle(),
        iframeAttributes: this.iframeAttributes(),
      },
      null,
      2,
    ),
  );

  setSrc(value: string): void {
    this.src.set(value);
  }

  setUseSrcdoc(value: boolean): void {
    this.useSrcdoc.set(value);
  }

  setSrcdoc(value: string): void {
    this.srcdoc.set(value);
  }

  setWidth(value: string): void {
    this.width.set(value);
  }

  setHeight(value: string): void {
    this.height.set(value);
  }

  setLoading(value: BmbIframeLoading): void {
    this.loading.set(value);
  }

  setImportance(value: BmbIframeImportance): void {
    this.importance.set(value);
  }

  setFrameborder(value: string): void {
    this.frameborder.set(value);
  }

  setScrolling(value: BmbIframeScrolling): void {
    this.scrolling.set(value);
  }

  setAlign(value: string): void {
    this.align.set(value ? (value as BmbIframeAlign) : null);
  }

  setLongdesc(value: string): void {
    this.longdesc.set(value || null);
  }

  setName(value: string): void {
    this.name.set(value);
  }

  setTitle(value: string): void {
    this.title.set(value);
  }

  setSandboxEnabled(enabled: boolean): void {
    this.sandbox.set(enabled ? '' : null);
  }

  setSandbox(value: string): void {
    this.sandbox.set(value);
  }

  setAllowEnabled(enabled: boolean): void {
    this.allow.set(enabled ? '' : null);
  }

  setAllow(value: string): void {
    this.allow.set(value);
  }

  setAllowFullscreen(value: boolean): void {
    this.allowFullscreen.set(value);
  }

  setCredentialless(value: boolean): void {
    this.credentialless.set(value);
  }

  setCspEnabled(enabled: boolean): void {
    this.csp.set(enabled ? '' : null);
  }

  setCsp(value: string): void {
    this.csp.set(value);
  }

  setReferrerPolicy(value: string): void {
    this.referrerPolicy.set(value ? (value as BmbIframeReferrerPolicy) : null);
  }

  onIframeLoad(): void {
    this.loadCount.update((count) => count + 1);
  }
}
