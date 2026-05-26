import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from '../../directives/bmb-layout-grid/bmb-layout-grid.directive';

export type BmbSkeletonType =
  | 'header'
  | 'input'
  | 'stray'
  | 'generic1'
  | 'generic2'
  | 'generic3';

@Component({
  selector: 'bmb-skeleton',
  standalone: true,
  imports: [CommonModule, BmbLayoutGridDirective, BmbLayoutGridItemDirective],
  styleUrl: './bmb-skeleton.component.scss',
  templateUrl: './bmb-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSkeletonComponent {
  type = input<BmbSkeletonType>('header');
}
