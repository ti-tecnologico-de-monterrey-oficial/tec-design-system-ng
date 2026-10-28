import { Component } from '@angular/core';
import { BmbFilterCardComponent } from 'ui-angular';
import { PropertyPlayground } from '../property-playground/property-playground';
import { createDemoConfiguration } from '../property-playground/demo-configurations';

@Component({
  selector: 'app-filter-card-test-component',
  imports: [PropertyPlayground],
  templateUrl: './filter-card-test.component.html',
  styles: [':host { display: block; min-height: 0; }'],
})
export class FilterCardTestComponent {
  readonly component = BmbFilterCardComponent;
  readonly configuration = createDemoConfiguration('filter-card');
}
