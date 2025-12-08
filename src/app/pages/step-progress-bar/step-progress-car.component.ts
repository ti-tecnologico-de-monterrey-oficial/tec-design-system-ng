import { Component } from '@angular/core';
import {
  BmbDividerComponent,
  BmbStepProgressBarComponent,
  BmbThemeComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-step-progress-bar-page',
  templateUrl: './step-progress-bar.component.html',
  standalone: true,
  imports: [
    BmbThemeComponent,
    BmbDividerComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbStepProgressBarComponent,
  ],
})
export class BmbStepProgressBarPageComponent {
  onStepPanelClicked(event: any) {
    console.info('onStepPanelClicked', event);
  }
  onStepClicked(event: any) {
    console.info('onStepClicked', event);
  }
  onStepPanelPress(event: any) {
    console.info('onStepPanelPress', event);
  }
  onStepPress(event: any) {
    console.info('onStepPress', event);
  }
}
