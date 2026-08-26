import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from '../../directives/old/bmb-layout-grid/bmb-layout-grid.directive';
import type { BmbSkeletonType } from '../../_shared/types/components/skeleton';

@Component({
  selector: 'bmb-skeleton',
  standalone: true,
  imports: [BmbLayoutGridDirective, BmbLayoutGridItemDirective],
  styleUrl: './bmb-skeleton.component.scss',
  templateUrl: './bmb-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSkeletonComponent {
  type = input<BmbSkeletonType>('header');
}
