import { reflectComponentType } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BmbProfileComponent } from 'ui-angular';
import { ProfileTestComponent } from './profile-test.component';
import { profilePresets, createProfileDemoConfiguration } from './profile-demo-configuration';
import { demoDrafts, parseDemoProperties } from '../property-playground/demo-properties';

describe('Profile migration playground', () => {
  it('has a control for every input and two-way model', () => {
    const configuration = createProfileDemoConfiguration();
    const inputs = reflectComponentType(BmbProfileComponent)!.inputs;
    expect(
      configuration.properties.map((property) => property.name).sort(),
    ).toEqual(inputs.map((input) => input.templateName).sort());
  });
  it.each(profilePresets.map((preset) => preset.id))(
    'renders Storybook preset %s with valid controls',
    async (preset) => {
      const configuration = createProfileDemoConfiguration(preset);
      expect(() =>
        parseDemoProperties(
          configuration.properties,
          demoDrafts(configuration),
        ),
      ).not.toThrow();
      await TestBed.configureTestingModule({
        imports: [ProfileTestComponent],
      }).compileComponents();
      const fixture = TestBed.createComponent(ProfileTestComponent);
      fixture.componentInstance.selectPreset(preset);
      fixture.detectChanges();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('bmb-profile')).toBeTruthy();
      fixture.destroy();
    },
  );
  it('clones fixture data so edits do not leak between examples', () => {
    const first = createProfileDemoConfiguration();
    const second = createProfileDemoConfiguration();
    expect(first.initial).toEqual(second.initial);
    expect(first.initial).not.toBe(second.initial);
  });
});
