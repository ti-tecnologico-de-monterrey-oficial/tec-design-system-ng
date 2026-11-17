import { reflectComponentType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BmbGradesComponent } from 'ui-angular';
import { GradesTestComponent } from './grades-test.component';
import { gradesPresets, createGradesDemoConfiguration } from './grades-demo-configuration';
import { demoDrafts, parseDemoProperties } from '../property-playground/demo-properties';

describe('Grades migration playground', () => {
  it('has a control for every input and two-way model', () => {
    const configuration = createGradesDemoConfiguration();
    const inputs = reflectComponentType(BmbGradesComponent)!.inputs;
    expect(
      configuration.properties.map((property) => property.name).sort(),
    ).toEqual(inputs.map((input) => input.templateName).sort());
  });
  it.each(gradesPresets.map((preset) => preset.id))(
    'renders Storybook preset %s with valid controls',
    async (preset) => {
      const configuration = createGradesDemoConfiguration(preset);
      expect(() =>
        parseDemoProperties(
          configuration.properties,
          demoDrafts(configuration),
        ),
      ).not.toThrow();
      await TestBed.configureTestingModule({
        imports: [GradesTestComponent],
      }).compileComponents();
      const fixture = TestBed.createComponent(GradesTestComponent);
      fixture.componentInstance.selectPreset(preset);
      fixture.detectChanges();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('bmb-grades')).toBeTruthy();
      fixture.destroy();
    },
  );
  it('clones fixture data so edits do not leak between examples', () => {
    const first = createGradesDemoConfiguration();
    const second = createGradesDemoConfiguration();
    expect(first.initial).toEqual(second.initial);
    expect(first.initial).not.toBe(second.initial);
  });
});
