import { Component, Input, ViewChild } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {BmbOverlayComponent } from './bmb-overlay.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';

@Component({
  standalone: true,
  imports: [BmbOverlayComponent, BmbButtonDirective, BmbIconComponent],
  selector: 'storybook-toast-wrapper',
  template: `
  <div style="width: 100%; height: 500px">
    <button
      style="position: absolute; z-index: 3;"
      bmbButton
      appearance="primary"
      icon="home"
      size="small"
      position="left"
      [case]="false"
      (click)="showOverlay()"
    >
      Open Overlay
    </button>

    <bmb-overlay [active]="this.showOverlayComponent"/>
</div>
  `,
})
class StorybookToastWrapperComponent {
    showOverlayComponent: boolean = false
    constructor() {}

    showOverlay() {
        this.showOverlayComponent = !this.showOverlayComponent
    }
}

export default {
  title: 'Micro Componentes/Overlay',
  component: BmbOverlayComponent,
  decorators: [
    moduleMetadata({
      imports: [
        StorybookToastWrapperComponent,
        BmbOverlayComponent,
        BmbIconComponent,
        BmbButtonDirective,
      ],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbOverlayComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [BmbOverlayComponent],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    active: {
        name: 'Active',
        control: { type: 'boolean' },
        description: 'Show or hide overlay',
        table: {
          category: 'Properties',
          defaultValue: { summary: 'false' },
          type: { summary: 'boolean' },
        },
      },
  },
  args: {
    active: false,
  },
} as Meta<typeof BmbOverlayComponent>;

export const Default: StoryFn<typeof StorybookToastWrapperComponent> = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-toast-wrapper></storybook-toast-wrapper>
      <!-- Start copying from here -->
      <div class="actions">
      <button bmbButton appearance="primary" icon="home" size="small" position="left" [case]="false" (click)="onButtonClick()">Open Modal</button>
      `,
  };
};
