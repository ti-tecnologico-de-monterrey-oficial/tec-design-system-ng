import { Component } from '@angular/core';
import { BmbTimestreamComponent } from 'ui-angular';
import { PropertyPlayground } from '../property-playground/property-playground';
import { createDemoConfiguration } from '../property-playground/demo-configurations';

@Component({
  selector: 'app-timestream-test-component',
  imports: [PropertyPlayground],
  templateUrl: './timestream-test.component.html',
  styles: [':host { display: block; min-height: 0; }'],
})
export class TimestreamTestComponent {
  readonly component = BmbTimestreamComponent;
  readonly configuration = createDemoConfiguration('timestream');
}
