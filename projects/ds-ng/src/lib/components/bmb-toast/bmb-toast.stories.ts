import { Component, Input, ViewChild } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbToastComponent } from './bmb-toast.component';
import { ToastService } from '../../services/toast.service';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';

@Component({
  standalone: true,
  imports: [BmbToastComponent, BmbButtonDirective],
  selector: 'storybook-toast-wrapper',
  template: `
    <button
      bmbButton
      appearance="primary"
      icon="home"
      size="small"
      position="left"
      [case]="false"
      (click)="onButtonClick()"
    >
      Click Here
    </button>
    <bmb-toast
      [title]="title"
      [description]="description"
      [appearance]="appearance"
      [duration]="duration"
      [position]="position"
    ></bmb-toast>
  `,
})
class StorybookToastWrapperComponent {
  @Input() appearance: string = '';
  @Input() title: string = '';
  @Input() description?: string;
  @Input() duration?: number;
  @Input() position?: 'top' | 'bottom' | 'middle';

  @ViewChild(BmbToastComponent)
  private toastComponent!: BmbToastComponent;

  onButtonClick() {
    this.toastComponent.openToast();
  }
}

export default {
  title: 'Micro Componentes/Toast',
  component: BmbToastComponent,
  decorators: [
    moduleMetadata({
      imports: [
        StorybookToastWrapperComponent,
        BmbToastComponent,
        BmbIconComponent,
        BmbButtonDirective,
      ],
      providers: [ToastService],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbButtonDirective, BmbToastComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbButtonDirective, BmbToastComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class Component {
  title = 'my-app';

  @ViewChild(BmbToastComponent)
  private toastComponent!: BmbToastComponent;
  onButtonClick() {
    this.toastComponent.openToast();
  }
}
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description:
        'Specifies the title displayed within the toast notification. This title should be concise and direct, providing the user with immediate feedback or information related to their actions.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    description: {
      name: 'Description',
      control: {
        type: 'text',
      },
      description:
        'Provides additional details or context in the toast notification, displayed beneath the title. This is optional and should be used when more information is needed.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    appearance: {
      name: 'Appearance',
      control: 'select',
      options: [
        'neutral',
        'primary',
        'successful',
        'warning',
        'error',
        'event',
        'reminder',
      ],
      description:
        'Defines the visual style of the toast, allowing it to match the context of the notification. Each option represents a different level of notification severity or type, such as informational (neutral), success (successful), warning (warning), error (error), event (event), or reminder (reminder).',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'neutral' },
        type: { summary: 'string' },
      },
    },
    duration: {
      name: 'Duration',
      control: {
        type: 'number',
      },
      description:
        'Determines how long the toast remains visible to the user, in milliseconds. A longer duration can be useful for more complex messages that require additional reading time, whereas shorter durations are suitable for succinct, immediate feedback',
      table: {
        category: 'Properties',
        defaultValue: { summary: '5000' },
        type: { summary: 'number' },
      },
    },
    position: {
      name: 'Position',
      control: 'select',
      options: ['top', 'bottom', 'middle'],
      description:
        "Controls the position of the toast on the screen, helping to ensure the notification does not obstruct important interface elements. Options include top, bottom, and middle, allowing you to choose the most appropriate placement based on your application's layout and user experience requirements.",
      table: {
        category: 'Properties',
        defaultValue: { summary: 'top' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    title: 'Your toast title here',
    description: 'Your toast description here (optional)',
    appearance: 'neutral',
    duration: 5000,
    position: 'top',
  },
} as Meta<typeof BmbToastComponent>;

function attributes(object: { [key: string]: any }): string {
  return Object.entries(object)
    .filter(([key]) => key !== 'text')
    .map(([key, value]) => {
      if (key === 'duration') {
        return `[${key}]="${value}"`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');
}

export const Default: StoryFn<typeof BmbToastComponent> = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-toast-wrapper ${attributes(args)}></storybook-toast-wrapper>
      <!-- Start copying from here -->
      <div class="actions">
      <button bmbButton appearance="primary" icon="home" size="small" position="left" [case]="false" (click)="onButtonClick()">Click Here</button>
      <bmb-toast ${attributes(args)}></bmb-toast></div>`,
  };
};
