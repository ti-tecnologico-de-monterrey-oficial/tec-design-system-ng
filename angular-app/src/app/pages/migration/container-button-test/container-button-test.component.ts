import { Component, signal } from '@angular/core';
import { BmbContainerButtonComponent } from 'ui-angular';
import { PropertyPlayground } from '../property-playground/property-playground';
import { createDemoConfiguration } from '../property-playground/demo-configurations';
import { containerButtonPresets } from './container-button-demo-configuration';

@Component({
  selector: 'app-container-button-test-component',
  imports: [PropertyPlayground],
  templateUrl: './container-button-test.component.html',
  styleUrl: './container-button-test.component.scss',
})
export class ContainerButtonTestComponent {
  readonly component = BmbContainerButtonComponent;
  readonly presets = containerButtonPresets;
  readonly selectedPreset = signal('Default');
  configuration = createDemoConfiguration('container-button');

  selectPreset(preset: string): void {
    this.configuration = createDemoConfiguration('container-button', preset);
    this.selectedPreset.set(preset);
  }
}
