import { Component, } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbOverlayComponent } from './bmb-overlay.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';

@Component({
  standalone: true,
  imports: [BmbOverlayComponent, BmbButtonDirective],
  selector: 'storybook-toast-wrapper',
  template: `
    <button
    style="z-index:3; position: relative;"
    bmbButton
    appearance="primary"
    icon="home"
    size="small"
    position="left"
    [case]="false"
    (click)="openOverlay()"
    >
    Click Here
    </button>

    <bmb-overlay [active]="activeOverlay"/>
  `,
})
class StorybookToastWrapperComponent {
  activeOverlay = false

  openOverlay() {
    this.activeOverlay = !this.activeOverlay
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
      ],
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
  imports: [ BmbOverlayComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class Component {
    activeOverlay = false
  
    openOverlay() {
      this.activeOverlay = !this.activeOverlay
    }
}
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    active: {
      name: 'Active',
      control: {
        type: 'boolean',
      },
      description:
        'Specifies if the overlay is active',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    active: false
  },
} as Meta<typeof BmbOverlayComponent>;

