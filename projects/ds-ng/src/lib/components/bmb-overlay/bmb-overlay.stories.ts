import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbOverlayComponent } from './bmb-overlay.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

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

      <bmb-overlay [active]="this.showOverlayComponent" />
    </div>
  `,
})
class StorybookToastWrapperComponent {
  showOverlayComponent: boolean = false;
  constructor() {}

  showOverlay() {
    this.showOverlayComponent = !this.showOverlayComponent;
  }
}

export default {
  title: 'Components/Containers/Overlay',
  component: BmbOverlayComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookToastWrapperComponent],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['displayStyle', 'ngAfterViewInit', 'ngOnChanges'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'overlay' })} to display an overlay element.`, 'https://bamboo.tec.mx/latest/componentes/overlay/descripcion-general-20iCzyFB')}
${getBasicExampleBlock(
  'BmbOverlayComponent',
  '',
  `
showOverlayComponent: boolean = false;

showOverlay() {
  this.showOverlayComponent = !this.showOverlayComponent;
}
  `,
)}
\`\`\`html
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

  <bmb-overlay [active]="this.showOverlayComponent" />
</div>
\`\`\`html
        `,
      },
    },
  },
  argTypes: {
    active: {
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

export const Default: StoryFn<typeof StorybookToastWrapperComponent> = (
  args,
) => {
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
