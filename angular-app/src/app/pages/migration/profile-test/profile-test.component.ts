import { Component, signal } from '@angular/core';
import { BmbProfileComponent } from 'ui-angular';
import { PropertyPlayground } from '../property-playground/property-playground';
import { createDemoConfiguration } from '../property-playground/demo-configurations';
import { profilePresets } from './profile-demo-configuration';

@Component({
  selector: 'app-profile-test-component',
  imports: [PropertyPlayground],
  templateUrl: './profile-test.component.html',
  styleUrl: './profile-test.component.scss',
})
export class ProfileTestComponent {
  readonly component = BmbProfileComponent;
  readonly presets = profilePresets;
  readonly selectedPreset = signal('Default');
  configuration = createDemoConfiguration('profile');

  selectPreset(preset: string): void {
    this.configuration = createDemoConfiguration('profile', preset);
    this.selectedPreset.set(preset);
  }
}
