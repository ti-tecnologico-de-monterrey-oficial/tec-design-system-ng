import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbIframeComponent, type BmbIframeLoading } from 'ui-angular';

@Component({
  selector: 'app-iframe-page',
  imports: [BmbIframeComponent],
  templateUrl: './iframe-page.html',
  styleUrl: './iframe-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframePage {
  readonly loadingOptions: BmbIframeLoading[] = ['eager', 'lazy'];
  readonly src = signal(
    'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-containers-ai-chat-bubble--documentation',
  );
  readonly width = signal('100%');
  readonly height = signal('360');
  readonly loading = signal<BmbIframeLoading>('lazy');
  readonly name = signal('Bamboo iframe demo');

  setSrc(value: string): void {
    this.src.set(value);
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
}
