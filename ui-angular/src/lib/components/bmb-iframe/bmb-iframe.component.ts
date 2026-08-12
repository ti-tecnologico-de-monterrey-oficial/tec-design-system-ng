import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIframePipeTransform } from './bmb-iframe.pipe';
import type {
  BmbIframeLoading,
  BmbIframeReferrerPolicy,
} from '../../_shared/types/components/iframe';

export type { BmbIframeLoading, BmbIframeReferrerPolicy };

@Component({
  selector: 'bmb-iframe',
  standalone: true,
  imports: [BmbIframePipeTransform],
  templateUrl: './bmb-iframe.component.html',
  styleUrl: './bmb-iframe.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIframeComponent {
  height = input<string | number>('100%');
  src = input.required<string>();
  width = input<string | number>('100%');
  loading = input<BmbIframeLoading>('eager');
  name = input<string>('');
}
