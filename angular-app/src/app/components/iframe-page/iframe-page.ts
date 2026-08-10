import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  BmbIframeComponent,
  type BmbIframeLoading,
  type BmbIframeReferrerPolicy,
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
    'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-containers-ai-chat-bubble--documentation',
  );
  readonly useSrcdoc = signal(false);
  readonly srcdoc = signal(
    '<!doctype html><html><body><h1>Bamboo iframe</h1><p>Inline srcdoc content.</p></body></html>',
  );
  readonly width = signal('100%');
  readonly height = signal('360');
  readonly loading = signal<BmbIframeLoading>('lazy');
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
