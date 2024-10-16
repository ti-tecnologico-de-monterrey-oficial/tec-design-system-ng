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
  selector: 'storybook-modal-wrapper',
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
class StorybookModalWrapperComponent {
  @Input() title: string = 'Titulo Modal';
  @Input() subtitle: string = 'Subtitulo Opcional';
  @Input() content?: string =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
  @Input() size?: 'small' | 'medium' | 'large';
  @Input() type?: 'alert' | 'action' | 'informative';
  @Input() alertStyle?: 'error' | 'event' | 'neutral' | 'warning' | 'success';
  @Input() primaryBtnLabel?: string = 'OK';
  @Input() secondaryBtnLabel?: string = 'Cancel';
  @Input() primaryAction?: () => void;
  @Input() secondaryAction?: () => void;

  constructor(private matDialog: MatDialog) {}

  openModalComponent() {
    const updatedData: ModalDataConfig = {
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      size: this.size || 'large',
      type: this.type || 'action',
      alertStyle: this.alertStyle || 'error',
      primaryBtnLabel: this.primaryBtnLabel || 'OK',
      secondaryBtnLabel: this.secondaryBtnLabel || 'Cancel',
      scrollable: false,
      primaryAction: this.primaryActionFunction.bind(this),
      secondaryAction: this.secondaryActionFunction.bind(this),
    };
    this.matDialog.open(BmbModalComponent, {
      data: updatedData,
    });
  }

  primaryActionFunction() {
    console.log('Primary action triggered');
    alert('Primary action executed!');
    this.matDialog.closeAll();
  }

  secondaryActionFunction() {
    console.log('Secondary action triggered');
    alert('Secondary action executed!');
    this.matDialog.closeAll();
  }
}

export default {
  title: 'Macro Componentes/Modal',
  component: BmbModalComponent,
  decorators: [
    moduleMetadata({
      imports: [
        StorybookModalWrapperComponent,
        BmbModalComponent,
        BmbIconComponent,
        BmbButtonDirective,
      ],
      providers: [MatDialog],
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
  templateUrl: '
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
  ',
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
        primaryAction: () => window.alert('Primary action triggered!'),
        secondaryAction: () => window.alert('Secondary action triggered!')
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
      },
    },
    size: {
      name: 'Size',
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      description: 'Specifies the size of the modal.',
      table: {
        category: 'Properties',
      },
    },
    type: {
      name: 'Type',
      control: {
        type: 'select',
      },
      options: ['alert', 'informative', 'action'],
      description: 'Specifies the type of the modal.',
      table: {
        category: 'Properties',
      },
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
      description: 'Specifies the style of the alert.',
      table: {
        category: 'Properties',
      },
    },
    primaryBtnLabel: {
      name: 'Primary Button Label',
      control: {
        type: 'text',
      },
      description: 'Specifies the text of the primary button.',
      table: {
        category: 'Properties',
      },
    },
    secondaryBtnLabel: {
      name: 'Secondary Button Label',
      control: {
        type: 'text',
      },
      description: 'Specifies the text of the secondary button.',
      table: {
        category: 'Properties',
      },
    },
    primaryAction: {
      name: 'Primary Action',
      control: {
        type: null,
      },
      description:
        'Specifies the action to execute when the primary button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    secondaryAction: {
      name: 'Secondary Action',
      control: {
        type: null,
      },
      description:
        'Specifies the action to execute when the secondary button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
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
    primaryAction: () => window.alert('Primary action triggered!'),
    secondaryAction: () => window.alert('Secondary action triggered!'),
  },
} as Meta<typeof BmbModalComponent>;

function attributes(object: { [key: string]: any }): string {
  return Object.entries(object)
    .map(([key, value]) => {
      return `${key}='${value}'`;
    })
    .join(' ');
}

export const Default: StoryFn<typeof StorybookModalWrapperComponent> = (
  args,
) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-modal-wrapper
        ${attributes(args)}
      >
      </storybook-modal-wrapper>
    `,
  };
};
