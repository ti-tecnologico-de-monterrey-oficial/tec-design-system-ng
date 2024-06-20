import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bmb-datepicker',
  standalone: true,
  imports: [],
  templateUrl: './bmb-datepicker.component.html',
  styleUrl: './bmb-datepicker.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BmbDatepickerComponent {

}
