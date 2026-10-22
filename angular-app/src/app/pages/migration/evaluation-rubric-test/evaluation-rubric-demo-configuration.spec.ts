import { reflectComponentType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BmbEvaluationRubricComponent } from 'ui-angular';
import { EvaluationRubricTestComponent } from './evaluation-rubric-test.component';
import { evaluationRubricPresets, createEvaluationRubricDemoConfiguration } from './evaluation-rubric-demo-configuration';
import { demoDrafts, parseDemoProperties } from '../property-playground/demo-properties';

describe('EvaluationRubric migration playground', () => {
  it('has a control for every input and two-way model', () => {
    const configuration = createEvaluationRubricDemoConfiguration();
    const inputs = reflectComponentType(BmbEvaluationRubricComponent)!.inputs;
    expect(
      configuration.properties.map((property) => property.name).sort(),
    ).toEqual(inputs.map((input) => input.templateName).sort());
  });
  it.each(evaluationRubricPresets.map((preset) => preset.id))(
    'renders Storybook preset %s with valid controls',
    async (preset) => {
      const configuration = createEvaluationRubricDemoConfiguration(preset);
      expect(() =>
        parseDemoProperties(
          configuration.properties,
          demoDrafts(configuration),
        ),
      ).not.toThrow();
      await TestBed.configureTestingModule({
        imports: [EvaluationRubricTestComponent],
      }).compileComponents();
      const fixture = TestBed.createComponent(EvaluationRubricTestComponent);
      fixture.componentInstance.selectPreset(preset);
      fixture.detectChanges();
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('bmb-evaluation-rubric'),
      ).toBeTruthy();
      fixture.destroy();
    },
  );
  it('clones fixture data so edits do not leak between examples', () => {
    const first = createEvaluationRubricDemoConfiguration();
    const second = createEvaluationRubricDemoConfiguration();
    expect(first.initial).toEqual(second.initial);
    expect(first.initial).not.toBe(second.initial);
  });
});
