import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';

@Component({
  selector: 'bmb-item-default',
  standalone: true,
  imports: [BmbIconComponent, BmbLayoutDirective, BmbLayoutItemDirective],
  templateUrl: './bmb-item-default.component.html',
  styleUrl: './bmb-item-default.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbItemDefaultComponent {
  icon = input<string>('');
  label = input.required<string>();
  value = input<string>('');
}
