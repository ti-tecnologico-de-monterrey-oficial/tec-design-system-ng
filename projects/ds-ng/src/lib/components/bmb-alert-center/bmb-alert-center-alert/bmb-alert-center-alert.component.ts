import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbDataAlert } from '../bmb-alert-center.component';

@Component({
  selector: 'bmb-alert-center-alert',
  standalone: true,
  imports: [],
  templateUrl: './bmb-alert-center-alert.component.html',
  styleUrl: './bmb-alert-center-alert.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterAlertComponent {
  alerts = input.required<IBmbDataAlert[]>();
}
