import { ModalDataConfig } from './bmb-modal.interface';
import { Component, Input } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbModalComponent } from './bmb-modal.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { MatDialog } from '@angular/material/dialog';
import { attributes } from '../../utils/utils';

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
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() content?: string;
  @Input() size?: 'small' | 'medium' | 'large';
  @Input() type?: 'alert' | 'action' | 'informative';
  @Input() alertStyle?: 'error' | 'event' | 'neutral' | 'warning' | 'success';
  @Input() primaryBtnLabel?: string;
  @Input() secondaryBtnLabel?: string;
  @Input() hidePrimaryButton?: boolean;
  @Input() hideSecondaryButton?: boolean;
  @Input() extendButtons?: boolean;
  @Input() primaryAction?: () => void;
  @Input() secondaryAction?: () => void;
  @Input() closeAction?: () => void;

  constructor(private matDialog: MatDialog) {}

  openModalComponent() {
    const updatedData: ModalDataConfig = {
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      size: this.size ?? 'large',
      type: this.type ?? 'action',
      alertStyle: this.alertStyle || 'error',
      primaryBtnLabel: this.primaryBtnLabel ?? 'OK',
      secondaryBtnLabel: this.secondaryBtnLabel ?? 'Cancel',
      hidePrimaryButton: this.hidePrimaryButton,
      hideSecondaryButton: this.hideSecondaryButton,
      scrollable: false,
      extendButtons: this.extendButtons,
      primaryAction: this.primaryActionFunction.bind(this),
      secondaryAction: this.secondaryActionFunction.bind(this),
      closeAction: this.closeActionFunction.bind(this),
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

  closeActionFunction() {
    console.log('Modal closed');
    alert('Secondary action executed!');
    this.matDialog.closeAll();
  }
}

export default {
  title: 'Components/Containers/Modal',
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
  ### 🟣 Modal Usage with String Content

  The simplest way to use the \`BmbModalComponent\` is by providing a plain text as content:

  \`\`\`typescript
  constructor(private matDialog: MatDialog) {}

  dataModal: ModalDataConfig = {
    title: 'My Modal',
    content: 'This is plain text content.',
    primaryBtnLabel: 'Ok',
    secondaryBtnLabel: 'Cancel',
    hidePrimaryButton: false,
    hideSecondaryButton: true
  }

  openModal() {
    this.matDialog.open(BmbModalComponent, { data: this.dataModal });
  }
  \`\`\`
  \`\`\`html
    <!-- Inside your component -->
    <button bmbButton (click)="openModal()">Open Modal</button>
  \`\`\`
  ---

  ### 🟢 Modal Usage with TemplateRef Content (Recommended for complex content)

  If you need to render custom components, inputs, or forms inside the modal, you can pass a \`TemplateRef\` instead of a plain string.

  This behavior is automatically detected internally using the \`isModalTemplate()\` method.

  ---

  #### Example Template:
  \`\`\`typescript
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(private matDialog: MatDialog) {}

  openModalTemplate() {
    const data: ModalDataConfig = {
      title: "Modal's Title",
      size: 'small',
      primaryBtnLabel: "Action",
      secondaryBtnLabel: "Cancel",
      content: this.modalTemplate,
      scrollable: true,
    };

    this.matDialog.open(BmbModalComponent, { data });
  }
  \`\`\`
  \`\`\`html
  <!-- Inside your component -->
  <ng-template #modalTemplate>
    <div>
      <p>Filter Modal Example</p>
      <bmb-input [placeholder]="'Search'"></bmb-input>
      <bmb-switch [rightText]="'Enable Option'"></bmb-switch>
      <bmb-checkbox [label]="'Accept Terms'"></bmb-checkbox>
    </div>
  </ng-template>

  <button (click)="openModalTemplate()">Open Modal</button>
  \`\`\`

  ---

  #### Example Component:

  \`\`\`typescript
  import { Component, ViewChild, TemplateRef } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { BmbModalComponent } from '@your-library/bmb-modal';
  import { BmbInputComponent } from '@your-library/bmb-input';
  import { BmbSwitchComponent } from '@your-library/bmb-switch';
  import { BmbCheckboxComponent } from '@your-library/bmb-checkbox';

  @Component({
    standalone: true,
    imports: [
      BmbInputComponent,
      BmbSwitchComponent,
      BmbCheckboxComponent,
      BmbModalComponent
    ]
  })
  export class ExampleComponent {
    @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

    constructor(private matDialog: MatDialog) {}

    openModal() {
      this.matDialog.open(BmbModalComponent, {
        data: {
          title: 'Filter Modal',
          content: this.modalTemplate,
          primaryBtnLabel: 'Apply',
          secondaryBtnLabel: 'Reset',
          hidePrimaryButton: false,
          hideSecondaryButton: false
        }
      });
    }
  }
  \`\`\`

  ---

  ### ⚠ Note:

  Make sure you are using:

  \`\`\`typescript
  constructor(private matDialog: MatDialog) {}
  \`\`\`

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
    closeAction: {
      name: 'Close Action',
      control: {
        type: null,
      },
      description:
        'Specifies the action to execute when the user click on the close button. **This function will not prevent the modal from closing**.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    hidePrimaryButton: {
      name: 'Hide Primary Button',
      control: { type: 'boolean' },
      description: 'If true, hides the primary button.',
      table: { category: 'Properties' },
    },
    hideSecondaryButton: {
      name: 'Hide Secondary Button',
      control: { type: 'boolean' },
      description: 'If true, hides the secondary button.',
      table: { category: 'Properties' },
    },
    extendButtons: {
      name: 'Extend Buttons',
      control: { type: 'boolean' },
      description: 'If true, extends the buttons to the 50% of the modal.',
      table: { category: 'Properties' },
    },
  },
  args: {},
} as Meta<typeof BmbModalComponent>;

export const Default: StoryFn<typeof BmbModalComponent> = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-modal-wrapper ${attributes(args)}></storybook-modal-wrapper>
    `,
  };
};
