import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbProgressCircleComponent } from '../bmb-progress-cirlce/bmb-progress-circle.component';
import { BmbLegendComponent } from '../bmb-legend/bmb-legend.component';

@Component({
  selector: 'bmb-balance-overview',
  standalone: true,
  imports: [CommonModule, BmbProgressCircleComponent, BmbLegendComponent],
  templateUrl: './bmb-balance-overview.component.html',
  styleUrl: './bmb-balance-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbBalanceOverviewComponent {
  progressCirclePercent = input<number>(0);
  progressCircleValue = input<string>('Progress Value');
  showProgressCircleValue = input<boolean>(true);
  progressCircleTitle = input<string | string[]>('Title');
  showProgressCircleTitle = input<boolean>(true);
  showProgressCircleBackground = input<boolean>(true);
  labelPrimary = input<string>('Primary Label');
  valuePrimary = input<string>('$0');
  labelSecondary = input<string>('Secondary Label');
  valueSecondary = input<string>('$0');
}
