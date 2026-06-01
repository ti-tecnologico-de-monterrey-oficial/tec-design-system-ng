import { ModalDataConfig } from './bmb-modal.interface';
import { Component, input } from '@angular/core';
import {
  Meta,
  StoryFn,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular';
import { BmbModalComponent } from './bmb-modal.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { MatDialog } from '@angular/material/dialog';
import {
  DESIGN_SYSTEM_TITLE,
  getBasicExampleBlock,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbModalParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

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
  title = input<string>();
  subtitle = input<string>();
  content = input<string>();
  size = input<'small' | 'medium' | 'large'>();
  type = input<'alert' | 'action' | 'informative'>();
  alertStyle = input<'error' | 'event' | 'neutral' | 'warning' | 'success'>();

  primaryBtnLabel = input<string>();
  secondaryBtnLabel = input<string>();

  hidePrimaryButton = input<boolean>();
  hideSecondaryButton = input<boolean>();
  extendButtons = input<boolean>();

  primaryAction = input<() => void>();
  secondaryAction = input<() => void>();
  closeAction = input<() => void>();

  constructor(private matDialog: MatDialog) {}

  openModalComponent() {
    const updatedData: ModalDataConfig = {
      title: this.title(),
      subtitle: this.subtitle(),
      content: this.content(),
      size: this.size() ?? 'large',
      type: this.type() ?? 'action',
      alertStyle: this.alertStyle() || 'error',
      primaryBtnLabel: this.primaryBtnLabel() ?? 'OK',
      secondaryBtnLabel: this.secondaryBtnLabel() ?? 'Cancel',
      hidePrimaryButton: this.hidePrimaryButton(),
      hideSecondaryButton: this.hideSecondaryButton(),
      scrollable: false,
      extendButtons: this.extendButtons(),
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
  title: 'Components/Containers/Modal (LTS)',
  tags: ['!autodocs'],
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
      controls: {
        exclude: [
          'closeModal',
          'getButtonClass',
          'getContent',
          'getData',
          'getDescriptionClasses',
          'getImage',
          'getModalClasses',
          'getPrimaryBtnLabel',
          'getSecondaryBtnLabel',
          'getSubtitle',
          'getTitle',
          'isModalTemplate',
          'isSingleButton',
          'ngOnInit',
          'showFooter',
          'showPrimaryButton',
          'showSecondaryButton',
          'svgUrl',
          'modalTemplate',
          'dialogRef',
          'modalData',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `***Modal*** is a pop-up window that helps display additional information or perform actions without changing the main page. ${DESIGN_SYSTEM_TITLE} ***Modal*** supports various configurations such as alert styles, custom content (string or template),
 and primary/secondary actions.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/modal/descripcion-general-sLOq8HIt',
    isSubStory: true,
  },
)}
${getSpecialSpecifications(
  `
### 🟣 -Modal Usage with String Content
>
The simplest way to use the \`BmbModalComponent\` is by providing a plain text as content:
>
\`\`\`typescript
constructor(private matDialog: MatDialog) {}
>
dataModal: ModalDataConfig = {
  title: 'My Modal',
  content: 'This is plain text content.',
  primaryBtnLabel: 'Ok',
  secondaryBtnLabel: 'Cancel',
  hidePrimaryButton: false,
  hideSecondaryButton: true
}
>
openModal() {
  this.matDialog.open(BmbModalComponent, { data: this.dataModal });
}
\`\`\`
\`\`\`html
  <!-- Inside your component -->
  <button bmbButton (click)="openModal()">Open Modal</button>
\`\`\`
>
---
>
### 🟢 -Modal Usage with TemplateRef Content (Recommended for complex content)
>
If you need to render custom components, inputs, or forms inside the modal, you can pass a \`TemplateRef\` instead of a plain string.
>
This behavior is automatically detected internally using the \`isModalTemplate()\` method.
>
---
>
### -Example Template:
\`\`\`typescript
@ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
>
constructor(private matDialog: MatDialog) {}
>
openModalTemplate() {
  const data: ModalDataConfig = {
    title: "Modal's Title",
    size: 'small',
    primaryBtnLabel: "Action",
    secondaryBtnLabel: "Cancel",
    content: this.modalTemplate,
    scrollable: true,
  };
>
  this.matDialog.open(BmbModalComponent, { data });
}
\`\`\`
>
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
>
<button (click)="openModalTemplate()">Open Modal</button>
\`\`\`
>
###-${RELEVANT_TITLE.note}
>
Make sure you are using:
>
\`\`\`typescript
constructor(private matDialog: MatDialog) {}
\`\`\`
`,
  { isSubStory: true },
)}
${getBasicExampleBlock(
  'BmbModalComponent',
  `import { TemplateRef } from '@angular/core';
  `,
  ` @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

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
  }`,
  true,
  '',
  'MatDialog',
  '@angular/material/dialog',
)}
        `,
      },
    },
  },
  argTypes: {
    title: DBmbModalParamDesc.title,
    subtitle: {
      control: {
        type: 'text',
      },
      description:
        'Specifies the subtitle text display. This message should be concise and direct.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    content: {
      control: {
        type: 'text',
      },
      description:
        'Specifies the body text display. This attribute can receive a Template Reference instead of the string.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      description: 'Specifies the size of the modal.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['alert', 'informative', 'action'],
      description: 'Specifies the type of the modal.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    alertStyle: {
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
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    primaryBtnLabel: DBmbModalParamDesc.primaryBtnLabel,
    secondaryBtnLabel: DBmbModalParamDesc.secondaryBtnLabel,
    primaryAction: getOnClickParam(
      getOnEvent('primary action', 'secondaryAction', 'void'),
    ),
    secondaryAction: getOnClickParam(
      getOnEvent('secondary action', 'secondaryAction', 'void'),
    ),
    closeAction: getOnClickParam(
      getOnEvent('secondary action', 'secondaryAction', 'void'),
      `.<br/><br/>${RELEVANT_TITLE.warning}This event will not prevent the modal from closing`,
    ),
    hidePrimaryButton: {
      control: { type: 'boolean' },
      description: 'If true, hides the primary button.',
      table: { category: 'Properties' },
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
    },
    hideSecondaryButton: {
      control: { type: 'boolean' },
      description: 'If true, hides the secondary button.',
      table: { category: 'Properties' },
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
    },
    extendButtons: {
      control: { type: 'boolean' },
      description: 'If true, extends the buttons to the 50% of the modal.',
      table: { category: 'Properties' },
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
    },
  },
  args: {},
} as Meta<typeof BmbModalComponent>;

export const Default: StoryFn<typeof BmbModalComponent> = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-modal-wrapper ${argsToTemplate(args)}></storybook-modal-wrapper>
    `,
  };
};
