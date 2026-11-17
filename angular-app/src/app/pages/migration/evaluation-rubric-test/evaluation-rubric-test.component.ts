import { Component, signal } from '@angular/core';
import { BmbEvaluationRubricComponent } from 'ui-angular';
import { PropertyPlayground } from '../property-playground/property-playground';
import { createDemoConfiguration } from '../property-playground/demo-configurations';
import { evaluationRubricPresets } from './evaluation-rubric-demo-configuration';

@Component({
  selector: 'app-evaluation-rubric-test-component',
  imports: [PropertyPlayground],
  templateUrl: './evaluation-rubric-test.component.html',
  styleUrl: './evaluation-rubric-test.component.scss',
})
export class EvaluationRubricTestComponent {
  readonly component = BmbEvaluationRubricComponent;
  readonly presets = evaluationRubricPresets;
  readonly selectedPreset = signal('Default');
  configuration = createDemoConfiguration('evaluation-rubric');

  selectPreset(preset: string): void {
    this.configuration = createDemoConfiguration('evaluation-rubric', preset);
    this.selectedPreset.set(preset);
  }
}
