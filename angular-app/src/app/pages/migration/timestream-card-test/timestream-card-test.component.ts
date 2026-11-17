import { Component } from '@angular/core';
import { BmbTimestreamCardComponent } from 'ui-angular';
import { PropertyPlayground } from '../property-playground/property-playground';
import { createDemoConfiguration } from '../property-playground/demo-configurations';

@Component({
  selector: 'app-timestream-card-test-component',
  imports: [PropertyPlayground],
  templateUrl: './timestream-card-test.component.html',
  styles: [':host { display: block; min-height: 0; }'],
})
export class TimestreamCardTestComponent {
  readonly component = BmbTimestreamCardComponent;
  readonly configuration = createDemoConfiguration('timestream-card');
}
