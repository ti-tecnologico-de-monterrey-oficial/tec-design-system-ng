import { Component } from '@angular/core';
import {
  BmbDividerComponent,
  BmbStepProgressBarComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
} from 'ui-angular';

@Component({
  selector: 'bmb-step-progress-bar-page',
  templateUrl: './step-progress-bar.component.html',
  standalone: true,
  imports: [
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
