import {
  IBmbModalAction,
  IBmbModalAlertStyle,
  IBmbModalSize,
  ModalDataConfig,
} from './bmb-modal.interface';
import { Component, input, TemplateRef } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbPortalComponent } from '../bmb-portal/bmb-portal.component';
import { BmbModalService } from '../../services/modal.service';
import { take } from 'rxjs';

@Component({
  standalone: true,
  imports: [BmbButtonDirective, BmbPortalComponent],
  selector: 'storybook-modal-wrapper',
  template: `
    <div style="height: 500px">
      <button
        bmbButton
        appearance="primary"
        icon="home"
        (click)="openModalComponent()"
      >
        Add notification
      </button>
      <!-- The portal component should be added at the end of the app.component.html -->
      <bmb-portal />
    </div>
  `,
})
class StorybookModalWrapperComponent {
  title = input<string>('');
  subtitle = input<string>('');
  content = input<string | TemplateRef<any>>('');
  size = input<IBmbModalSize>('medium');
  type = input<IBmbModalAlertStyle>('info');
  actions = input<IBmbModalAction[]>([]);
  scrollable = input<boolean>(true);
  hideFooter = input<boolean>(false);
  disableCloseButtonFooter = input<boolean>(false);

  constructor(private modalService: BmbModalService) {}

  modalId: string | null = null;

  openModalComponent() {
    const updatedData: ModalDataConfig = {
      title: this.title(),
      subtitle: this.subtitle(),
      content: this.content(),
      size: this.size(),
      type: this.type(),
      actions: this.actions(),
      scrollable: this.scrollable(),
      hideFooter: this.hideFooter(),
      disableCloseButtonFooter: this.disableCloseButtonFooter(),
    };

    console.log('updatedData', updatedData);

    this.modalId = this.modalService.openModal(updatedData);
  }

  primaryActionFunction() {
    // console.log('Primary action triggered');
    // alert('Primary action executed!');
    // this.matDialog.closeAll();
  }

  secondaryActionFunction() {
    // console.log('Secondary action triggered');
    // alert('Secondary action executed!');
    // this.matDialog.closeAll();
  }
}

export default {
  title: 'Macro Componentes/Modal',
  component: BmbPortalComponent,
  decorators: [
    moduleMetadata({
      imports: [
        StorybookModalWrapperComponent,
        BmbPortalComponent,
        BmbButtonDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

##Configuration
Add the \`BmbModalService\` to your App providers:

\`\`\`providers: [
  provideRouter(routes),
  importProvidersFrom([BmbModalService, ...]),
],\`\`\`

##Show modals
Add the \`BmbPortalComponent\` at the bottom of your **app.component.html**

\`\`\`typescript
import { MatDialog } from '@angular/material/dialog';
import { BmbModalComponent, ModalDataConfig } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [],
  templateUrl: '
    <div style="height: 500px">
      <button
        bmbButton
        appearance="primary"
        icon="home"
        (click)="openModalComponent()"
      >
        Add notification
      </button>
      <!-- The portal component should be added at the end of the app.component.html -->
      <bmb-portal />
    </div>
  ',
  styleUrl: './component.scss',
})
export class Component {
    title = input<string>('');
    subtitle = input<string>('');
    content = input<string | TemplateRef<any>>('');
    size = input<IBmbModalSize>('medium');
    type = input<IBmbModalAlertStyle>('info');
    actions = input<IBmbModalAction[]>([]);
    scrollable = input<boolean>(false);
    hideFooter = input<boolean>(false);
    disableCloseButtonFooter = input<boolean>(false);

    constructor(private modalService: BmbModalService) {}

    modalId: string | null = null;

    openModalComponent() {
      const updatedData: ModalDataConfig = {
        title: this.title(),
        subtitle: this.subtitle(),
        content: this.content(),
        size: this.size(),
        type: this.type(),
        actions: this.actions(),
        scrollable: this.scrollable(),
        hideFooter: this.hideFooter(),
        disableCloseButtonFooter: this.disableCloseButtonFooter(),
      };

      this.modalId = this.modalService.openModal(updatedData);
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
        type: { summary: 'string | TemplateRef<any>' },
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
        type: { summary: 'IBmbModalSize' },
        defaultValue: { summary: 'medium' },
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
        type: { summary: 'IBmbModalAlertStyle' },
        defaultValue: { summary: 'info' },
      },
    },
    actions: {
      name: 'Actions',
      control: {
        type: 'object',
      },
      description:
        'Specifies the actions to be performed when a button is clicked.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbModalAction[]' },
        defaultValue: { summary: '[]' },
      },
    },
    scrollable: {
      name: 'Scrollable',
      control: {
        type: 'boolean',
      },
      description: 'Specifies whether the modal is scrollable.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hideFooter: {
      name: 'Hide Footer',
      control: {
        type: 'boolean',
      },
      description: 'Specifies whether the footer is hidden.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disableCloseButtonFooter: {
      name: 'Disable Close Button Footer',
      control: {
        type: 'boolean',
      },
      description:
        'Specifies whether the close button in the footer is disabled.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    title: 'Modal Title',
    subtitle: 'Modal Subtitle',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    size: 'small',
    type: 'action',
    scrollable: true,
    hideFooter: false,
    disableCloseButtonFooter: false,
    actions: [
      {
        label: 'Primary button',
        type: 'primary',
        action: () => {
          alert('Primary button clicked!');
        },
        icon: 'check',
      },
      {
        label: 'Secondary button',
        type: 'secondary-outlined',
        action: 'close',
      },
    ],
  },
} as Meta<typeof BmbPortalComponent>;

// function attributes(object: { [key: string]: any }): string {
//   return Object.entries(object)
//     .filter(([key]) => key !== 'text')
//     .map(([key, value]) => {
//       return `${key}="${value}"`;
//     })
//     .join(' ');
// }

export const Default: StoryFn<typeof BmbPortalComponent> = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-modal-wrapper
        [title]="title"
        [subtitle]="subtitle"
        [content]="content"
        [size]="size"
        [type]="type"
        [scrollable]="scrollable"
        [hideFooter]="hideFooter"
        [disableCloseButtonFooter]="disableCloseButtonFooter"
        [actions]="actions"
      ></storybook-modal-wrapper>
    `,
  };
};
