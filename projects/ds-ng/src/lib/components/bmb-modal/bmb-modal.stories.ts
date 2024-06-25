import { ModalDataConfig } from './bmb-modal.interface';
import { Component, Input } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbModalComponent } from './bmb-modal.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [BmbButtonDirective],
  selector: 'storybook-toast-wrapper',
  template: `
    <button
      bmbButton
      appearance="primary"
      icon="home"
      size="small"
      position="left"
      [case]="false"
      (click)="openModalComponent()"
    >
      Open Modal
    </button>
  `,
})
class StorybookToastWrapperComponent {
  @Input() title: string = 'Titulo Modal';
  @Input() subtitle: string = 'Subtitulo Opcional';
  @Input() content?: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
  @Input() size?: 'small' | 'meidum' | 'large';
  @Input() type?: 'alert' | 'action' | 'informative';
  @Input() alertStyle?: 'error' | 'event' | 'neutral' | 'warning' | 'success';
  @Input() primaryBtnLabel?: string = 'OK';
  @Input() secondaryBtnLabel?: string = 'Cancel';
  constructor(private matDialog: MatDialog) {}

  data: ModalDataConfig = {
    title: 'Modal Title',
    subtitle: 'Modal Subtitle',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    size: 'large',
    type: 'action',
    alertStyle: 'error',
    primaryBtnLabel: 'Ok',
    scrollable: false,
  };

  openModalComponent() {
    this.matDialog.open(BmbModalComponent, {
      data: this.data,
    });
  }
}

export default {
  title: 'Macro Componentes/Modal',
  component: BmbModalComponent,
  decorators: [
    moduleMetadata({
      imports: [
        StorybookToastWrapperComponent,
        BmbModalComponent,
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
import { MatDialog } from '@angular/material/dialog';
import { BmbModalComponent, ModalDataConfig } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class Component {
    constructor(private matDialog: MatDialog) {}

    data: ModalDataConfig = {
        title: 'Modal Title',
        subtitle: 'Modal Subtitle',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        size: 'large',
        type: 'alert',
        alertStyle: 'error',
        primaryBtnLabel: 'Ok',
      }

    openModalComponent() {
      this.matDialog.open(BmbModalComponent, { data: this.data });
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
        'Specifies the text display. This message should be concise and direct.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: {
        type: 'text',
      },
      description:
        'Specifies the subtitle text display. This message should be concise and direct.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    content: {
      name: 'Content',
      control: {
        type: 'text',
      },
      description:
        'Specifies the body text display. This attribute can receive a Template Reference instead of the string.',
      table: {
        category: 'Properties',
        type: { summary: ['string', 'Template Reference'] },
      },
    },
    size: {
      name: 'Size',
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      table: {
        category: 'Properties',
        defaultValue: { summary: 'small' },
        type: { summary: 'string' },
      },
      description:
        'Specifies the size of the modal. This string should be: small, medium or large.',
    },
    type: {
      name: 'Type',
      control: {
        type: 'select',
      },
      options: ['alert', 'informative', 'action'],
      table: {
        category: 'Properties',
        defaultValue: { summary: 'action' },
        type: { summary: 'string' },
      },
      description:
        'Specifies the type of the modal. This string should be: alert, informative or action.',
    },
    alertStyle: {
      name: 'Alert Style',
      control: {
        type: 'select',
      },
      options: [
        'normal',
        'primary',
        'success',
        'event',
        'warning',
        'error',
        'neutral',
      ],
      table: {
        category: 'Properties',
        defaultValue: { summary: 'primary' },
        type: { summary: 'string' },
      },
      description:
        'Specifies the size of the modal. This string should be: error, warning, event, neutral, success, primary',
    },
    primaryBtnLabel: {
      name: 'Primary Button Label',
      control: {
        type: 'string',
      },
      description: 'Specifies the text of the main button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    secondaryBtnLabel: {
      name: 'Secondary Button Label',
      control: {
        type: 'string',
      },
      description: 'Specifies the text of the secondary button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    title: 'Modal Title',
    subtitle: 'Modal Subtitle',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    size: 'small',
    type: 'action',
    alertStyle: 'error',
    primaryBtnLabel: 'Action',
    secondaryBtnLabel: 'Cancel',
  },
} as Meta<typeof BmbModalComponent>;

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

export const Default: StoryFn<typeof StorybookToastWrapperComponent> = (
  args,
) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-toast-wrapper ${attributes(args)}></storybook-toast-wrapper>
      <!-- Start copying from here -->
      <div class="actions">
      <button bmbButton appearance="primary" icon="home" size="small" position="left" [case]="false" (click)="onButtonClick()">Open Modal</button>
      `,
  };
};
