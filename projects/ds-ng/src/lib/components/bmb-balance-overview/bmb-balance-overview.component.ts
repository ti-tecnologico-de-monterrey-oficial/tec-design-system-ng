import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BmbProgressCircleComponent } from '../bmb-progress-cirlce/bmb-progress-circle.component';
import { BmbLegendComponent } from '../bmb-legend/bmb-legend.component';

@Component({
  selector: 'bmb-balance-overview',
  standalone: true,
  imports: [CommonModule, BmbProgressCircleComponent, BmbLegendComponent],
  templateUrl: './bmb-balance-overview.component.html',
  styleUrl: './bmb-balance-overview.component.scss',
})
export class BmbBalanceOverviewComponent {
  //Inputs for Progress Circle
  @Input() progressCirclePercent?: number = 0;
  @Input() progressCircleValue?: string = 'Progress Value';
  @Input() showProgressCircleValue?: boolean = true;
  @Input() progressCircleTitle?: string | Array<string> = 'Title';
  @Input() showProgressCircleTitle?: boolean = true;
  @Input() showProgressCircleBackground?: boolean = true;

  //Inputs for legeds
  @Input() labelPrimary?: string = 'Text';
  @Input() valuePrimary?: string = '$0';

  @Input() labelSecondary?: string = 'Text';
  @Input() valueSecondary?: string = '$0';
}
