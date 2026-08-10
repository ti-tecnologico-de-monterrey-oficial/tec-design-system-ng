import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  Renderer2,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import type {
  BmbIframeAttributes,
  BmbIframeLoading,
  BmbIframeReferrerPolicy,
} from '../../_shared/types/components/iframe';

export type { BmbIframeAttributes, BmbIframeLoading, BmbIframeReferrerPolicy };

const MANAGED_ATTRIBUTES = new Set([
  'allow',
  'allowfullscreen',
  'class',
  'credentialless',
  'csp',
  'frameborder',
  'height',
  'id',
  'loading',
  'name',
  'referrerpolicy',
  'sandbox',
  'src',
  'srcdoc',
  'style',
  'title',
  'width',
]);

@Component({
  selector: 'bmb-iframe',
  standalone: true,
  templateUrl: './bmb-iframe.component.html',
  styleUrl: './bmb-iframe.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIframeComponent {
  private readonly renderer = inject(Renderer2);
  private readonly iframeContainer =
    viewChild<ElementRef<HTMLElement>>('iframeContainer');

  height = input<string | number>('100%');
  src = input<string>('');
  srcdoc = input<string | null>(null);
  width = input<string | number>('100%');
  loading = input<BmbIframeLoading>('eager');
  name = input<string>('');
  title = input<string>('');
  sandbox = input<string | null>(null);
  allow = input<string | null>(null);
  allowFullscreen = input<boolean>(false);
  credentialless = input<boolean>(false);
  csp = input<string | null>(null);
  referrerPolicy = input<BmbIframeReferrerPolicy | null>(null);
  iframeId = input<string>('');
  iframeClass = input<string>('');
  iframeStyle = input<string>('');
  iframeAttributes = input<BmbIframeAttributes>({});

  iframeLoad = output<Event>();

  constructor() {
    effect((onCleanup) => {
      const container = this.iframeContainer()?.nativeElement;
      if (!container) return;

      const iframe = this.renderer.createElement('iframe') as HTMLIFrameElement;

      // Security-sensitive attributes must exist before src or srcdoc is set.
      this.setNullableAttribute(iframe, 'sandbox', this.sandbox());
      this.setNullableAttribute(iframe, 'allow', this.allow());
      this.setBooleanAttribute(
        iframe,
        'allowfullscreen',
        this.allowFullscreen(),
      );
      this.setBooleanAttribute(iframe, 'credentialless', this.credentialless());
      this.setNullableAttribute(iframe, 'csp', this.csp());
      this.setNullableAttribute(
        iframe,
        'referrerpolicy',
        this.referrerPolicy(),
      );

      this.renderer.setAttribute(iframe, 'frameborder', '0');
      this.renderer.setAttribute(iframe, 'width', String(this.width()));
      this.renderer.setAttribute(iframe, 'height', String(this.height()));
      this.renderer.setAttribute(iframe, 'loading', this.loading());
      this.setOptionalAttribute(iframe, 'name', this.name());
      this.setOptionalAttribute(iframe, 'title', this.title());
      this.setOptionalAttribute(iframe, 'id', this.iframeId());
      this.setOptionalAttribute(iframe, 'class', this.iframeClass());
      this.setOptionalAttribute(iframe, 'style', this.iframeStyle());
      this.setAdditionalAttributes(iframe);

      const stopListening = this.renderer.listen(iframe, 'load', (event) =>
        this.iframeLoad.emit(event),
      );

      const srcdoc = this.srcdoc();
      if (srcdoc !== null) {
        this.renderer.setAttribute(iframe, 'srcdoc', srcdoc);
      } else if (this.src()) {
        this.renderer.setAttribute(iframe, 'src', this.src());
      }

      this.renderer.appendChild(container, iframe);

      onCleanup(() => {
        stopListening();
        this.renderer.removeChild(container, iframe);
      });
    });
  }

  private setNullableAttribute(
    iframe: HTMLIFrameElement,
    name: string,
    value: string | null,
  ): void {
    if (value !== null) this.renderer.setAttribute(iframe, name, value);
  }

  private setOptionalAttribute(
    iframe: HTMLIFrameElement,
    name: string,
    value: string,
  ): void {
    if (value) this.renderer.setAttribute(iframe, name, value);
  }

  private setBooleanAttribute(
    iframe: HTMLIFrameElement,
    name: string,
    value: boolean,
  ): void {
    if (value) this.renderer.setAttribute(iframe, name, '');
  }

  private setAdditionalAttributes(iframe: HTMLIFrameElement): void {
    Object.entries(this.iframeAttributes()).forEach(([name, value]) => {
      const normalizedName = name.toLowerCase();
      if (
        MANAGED_ATTRIBUTES.has(normalizedName) ||
        normalizedName.startsWith('on') ||
        value === null ||
        value === undefined ||
        value === false
      ) {
        return;
      }

      this.renderer.setAttribute(
        iframe,
        name,
        value === true ? '' : String(value),
      );
    });
  }
}
