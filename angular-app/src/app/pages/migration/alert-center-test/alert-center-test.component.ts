import { Component } from '@angular/core';
import { BmbAlertCenterComponent, BmbAlertCenterService } from 'ui-angular';
import { PropertyPlayground } from '../property-playground/property-playground';
import { createDemoConfiguration } from '../property-playground/demo-configurations';

@Component({
  selector: 'app-alert-center-test-component',
  imports: [PropertyPlayground],
  providers: [BmbAlertCenterService],
  templateUrl: './alert-center-test.component.html',
  styles: [':host { display: block; min-height: 0; }'],
})
export class AlertCenterTestComponent {
  readonly component = BmbAlertCenterComponent;
  readonly configuration = createDemoConfiguration('alert-center');
}
