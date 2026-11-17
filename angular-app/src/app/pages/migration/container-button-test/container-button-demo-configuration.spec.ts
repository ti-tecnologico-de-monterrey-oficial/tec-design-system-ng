import { reflectComponentType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BmbContainerButtonComponent } from 'ui-angular';
import { ContainerButtonTestComponent } from './container-button-test.component';
import { containerButtonPresets,
  createContainerButtonDemoConfiguration } from './container-button-demo-configuration';
import { demoDrafts, parseDemoProperties } from '../property-playground/demo-properties';

describe('ContainerButton migration playground', () => {
  it('has a control for every input and two-way model', () => {
    const configuration = createContainerButtonDemoConfiguration();
    const inputs = reflectComponentType(BmbContainerButtonComponent)!.inputs;
    expect(
      configuration.properties.map((property) => property.name).sort(),
    ).toEqual(inputs.map((input) => input.templateName).sort());
  });
  it.each(containerButtonPresets.map((preset) => preset.id))(
    'renders Storybook preset %s with valid controls',
    async (preset) => {
      const configuration = createContainerButtonDemoConfiguration(preset);
      expect(() =>
        parseDemoProperties(
          configuration.properties,
          demoDrafts(configuration),
        ),
      ).not.toThrow();
      await TestBed.configureTestingModule({
        imports: [ContainerButtonTestComponent],
      }).compileComponents();
      const fixture = TestBed.createComponent(ContainerButtonTestComponent);
      fixture.componentInstance.selectPreset(preset);
      fixture.detectChanges();
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('bmb-container-button'),
      ).toBeTruthy();
      fixture.destroy();
    },
  );
  it('clones fixture data so edits do not leak between examples', () => {
    const first = createContainerButtonDemoConfiguration();
    const second = createContainerButtonDemoConfiguration();
    expect(first.initial).toEqual(second.initial);
    expect(first.initial).not.toBe(second.initial);
  });
});
