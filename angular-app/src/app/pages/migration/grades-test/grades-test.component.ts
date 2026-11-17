import { Component, signal } from '@angular/core';
import { BmbGradesComponent } from 'ui-angular';
import { PropertyPlayground } from '../property-playground/property-playground';
import { createDemoConfiguration } from '../property-playground/demo-configurations';
import { gradesPresets } from './grades-demo-configuration';

@Component({
  selector: 'app-grades-test-component',
  imports: [PropertyPlayground],
  templateUrl: './grades-test.component.html',
  styleUrl: './grades-test.component.scss',
})
export class GradesTestComponent {
  readonly component = BmbGradesComponent;
  readonly presets = gradesPresets;
  readonly selectedPreset = signal('Default');
  configuration = createDemoConfiguration('grades');

  selectPreset(preset: string): void {
    this.configuration = createDemoConfiguration('grades', preset);
    this.selectedPreset.set(preset);
  }
}
