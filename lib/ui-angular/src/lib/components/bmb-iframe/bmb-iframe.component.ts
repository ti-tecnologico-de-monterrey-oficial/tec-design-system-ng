import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIframePipeTransform } from './bmb-iframe.pipe';

import { type BmbIframeReferrerPolicy } from '../../_core/logic/components/iframe/iframe';

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
  loading = input<'eager' | 'lazy'>('eager');
  name = input<string>('');
}
