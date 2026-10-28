import { Component } from '@angular/core';
import { BmbTitleContentComponent } from 'ui-angular';
import { PropertyPlayground } from '../property-playground/property-playground';
import { createDemoConfiguration } from '../property-playground/demo-configurations';

@Component({
  selector: 'app-title-content-test-component',
  imports: [PropertyPlayground],
  templateUrl: './title-content-test.component.html',
  styles: [':host { display: block; min-height: 0; }'],
})
export class TitleContentTestComponent {
  readonly component = BmbTitleContentComponent;
  readonly configuration = createDemoConfiguration('title-content');
}
