import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { BmbNativeModalService } from '../../services/native-modal.service';
import {
  Component,
  computed,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import {
  IBmbActionButton,
  IBmbNativeModalSize,
  IBmbModalAlertStyle,
} from './bmb-modal.interface';
import {
  DBmbModalParamDesc,
  getAppearanceParam,
} from '../../utils/doc/parameterDescriptions';
import {
  DESIGN_SYSTEM_TITLE,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE_LEVEL
} from '../../utils/doc/utils';

@Component({
  selector: 'bmb-native-modal-story',
  standalone: true,
  imports: [BmbButtonDirective],
  template: `
    <p>
      Is the modal open
      <strong>{{ isTheModalOpen() ? 'Yes' : 'No' }}</strong>
    </p>
    <p>
      Modal ID: <strong>{{ myModalId() ? myModalId() : '-' }}</strong>
    </p>
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
class BmbNativeModalStory {
  title = input<string>('');
  subtitle = input<string>('');
  content = input<string | TemplateRef<any> | null>('');
  size = input<IBmbNativeModalSize>('medium');
  modalId = input<string | undefined>(undefined);
  iconStyle = input<IBmbModalAlertStyle>();
  actions = input<IBmbActionButton[]>([]);

  closeModalClicked = output();

  constructor(private nativeModalService: BmbNativeModalService) {}

  myModalId = signal<string | null>(null);
  userStatus = signal<string | null>(null);
  isTheModalOpen = computed(() => {
    if (!this.myModalId()) return false;

    return this.nativeModalService.checkIfModalExists(
      this.myModalId() as string,
    );
  });

  openModalComponent() {
    const id = this.nativeModalService.openModal({
      title: this.title(),
      subtitle: this.subtitle(),
      size: this.size(),
      content: this.content(),
      modalId: this.modalId(),
      iconStyle: this.iconStyle(),
      actions: this.actions(),
      closeModalClicked: (event: unknown) => {
        console.log(event);
        this.closeModalClicked.emit();
        this.myModalId.set(null);
      },
    });
    this.myModalId.set(id);
  }
}

export default {
  title: 'Components/Containers/Modal',
  tags: ['!autodocs'],
  component: BmbNativeModalStory,
  decorators: [
    applicationConfig({
      providers: [BmbNativeModalService],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `***Modal*** is a pop-up window that helps display additional information or perform actions without changing the main page. ${DESIGN_SYSTEM_TITLE} ***Modal*** supports various configurations such as alert styles, custom content (string or template),
 and primary/secondary actions.`,
  'https://bamboo.tec.mx/latest/componentes/modal/descripcion-general-sLOq8HIt',
)}
${getSpecialSpecifications(`
  >
### ${RELEVANT_TITLE_LEVEL[0]}
>
Make sure you are using:
>
\`\`\`typescript
constructor(private modalService: BmbNativeModalService) {}
\`\`\`
>
### 🟣 Modal Usage with String Content
>
The simplest way to use the \`BmbNativeModalComponent\` is by providing a plain text as content:
>
\`\`\`typescript
constructor(private modalService: BmbNativeModalService) {}
>
dataModal: IBmbNativeModal = {
  title: 'My Modal',
  content: 'This is plain text content.',
}
>
openModal() {
  this.modalService.openModal(dataModal);
}
\`\`\`
\`\`\`html
  <!-- Inside your component template -->
  <button bmbButton (click)="openModal()">Open Modal</button>
\`\`\`
>
---
>
### 🟢 Modal Usage with TemplateRef Content (Recommended for complex content)
>
If you need to render custom templates, inputs, or forms, you can pass a \`TemplateRef\` instead of a plain string.
>
This behavior is automatically detected internally using the \`isTemplateRef()\` method.
>
\`\`\`typescript
// Define your template in the component
@ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
>
// Add the modal service in the constructor
constructor(private modalService: BmbNativeModalService) {}
>
openModal() {
  const dataModal: IBmbNativeModal = {
    title: 'My Modal',
    content: this.modalTemplate,
  }
  this.modalService.openModal(dataModal);
}
\`\`\`
>
\`\`\`html
<!-- Inside your component template -->
<ng-template #modalTemplate>
  <div>
    <p>Filter Modal Example</p>
    <bmb-input [placeholder]="'Search'"></bmb-input>
    <bmb-switch [rightText]="'Enable Option'"></bmb-switch>
    <bmb-checkbox [label]="'Accept Terms'"></bmb-checkbox>
  </div>
</ng-template>
>
<button (click)="openModal()">Open Modal</button>
\`\`\`
>
### 🔵 Modal Usage with Component as content
>
If you need to render custom components, inputs, or forms inside the modal, you can pass a \`Component\` instead of a plain string.
>
This behavior is automatically detected internally using the \`isTemplateRef()\` method.
>
\`\`\`typescript
// Make sure to import your custom component
import { YourCustomComponent } from 'path-to-your-component';
>
// Add the modal service in the constructor
constructor(private modalService: BmbNativeModalService) {}
>
openContent() {
  const data: IBmbNativeModal = {
    title: 'My Modal',
    content: YourCustomComponent,
    inputContext: { yourProperty: 'yourValue' },
    outputContext: { yourEvent: (value: any) => console.log(value) },
  };
>
  this.modalService.openModal(dataModal);
}
\`\`\`
\`\`\`html
  <!-- Inside your component template -->
  <button bmbButton (click)="openModal()">Open Modal</button>
\`\`\`
>
### Detect the modal status
To detect if a modal is open or closed, you can use the \`checkIfModalExists\` method as follows:
>
\`\`\`typescript
myModalId = signal<string | null>(null);
>
openModalComponent() {
  const id = this.nativeModalService.openModal({
    title: this.title(),
    content: this.content(),
  });
>
  // Add the modal ID to the signal < myModalId >
  this.myModalId.set(id);
}
>
isTheModalOpen = computed(() => {
  if (!this.myModalId()) return false;
>
  return this.nativeModalService.checkIfModalExists(
    this.myModalId() as string,
  );
});
\`\`\`
>
>
### Close specific modal
To close a specific modal, you can use the \`closeModal\` method as follows:
>
\`\`\`typescript
myModalId = signal<string | null>(null);
>
openModalComponent() {
  const id = this.nativeModalService.openModal({
    title: this.title(),
    content: this.content(),
  });
>
  // Add the modal ID to the signal < myModalId >
  this.myModalId.set(id);
}
>
closeModal() {
  if (this.myModalId()) {
    this.nativeModalService.closeModal(this.myModalId() as string);
    this.myModalId.set(null);
  }
}
\`\`\`
>
### Close all modals
To close all open modals, you can use the \`closeAllModals\` method as follows:
>
\`\`\`typescript
closeAllModals() {
  this.nativeModalService.closeAllModals();
}
\`\`\`
>
### Detect click on the close icon
To detect the click on the close icon, you can use the following configuration:
>
\`\`\`typescript
openModalComponent() {
  const id = this.nativeModalService.openModal({
    title: this.title(),
    content: this.content(),
>
    // Once the user clicks the close icon, this method will be triggered
    closeModalClicked: this.handleCloseModal.bind(this)(event),
  });
>
  handleActionsCloseClick(params: unknown): void {
    console.log('Close button clicked', params);
  }
}
\`\`\`
>
### Actions
In order to add actions to the modal, you can use the following configuration:
>
\`\`\`typescript
openModalComponent() {
  const id = this.nativeModalService.openModal({
    title: this.title(),
    content: this.content(),
>
    // You can add custom actions to the modal
    actions: [
      {
        buttonName: 'reject',
        appearance: 'secondary-outlined',
        label: 'Reject',
        icon: 'close',
        action: () => this.handleReject.bind(this)(),
      },
      {
        buttonName: 'accept',
        appearance: 'primary',
        label: 'Accept',
        icon: 'check',
        action: () => this.handleAccept.bind(this)(),
      },
    ],
  });
>
  handleReject(): void {
    // Add your rejection logic here
  }
>
  handleAccept(): void {
    // Add your acceptance logic here
  }
}
\`\`\`
`)}
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
        'Sets the subtitle text display. This message should be concise and direct.',
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
        'Sets the body text display. This attribute can receive a Template Reference or a Component instead of the string.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string | TemplateRef | Component (Type<any>)' },
      },
    },
    size: getAppearanceParam(
      'modal size',
      ['x-small', 'small', 'medium', 'large', 'x-large'],
      'medium',
    ),
    modalId: {
      control: { type: 'text' },
      description: 'Sets the unique identifier for the modal instance.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    iconStyle: {
      control: { type: 'select' },
      options: ['warning', 'neutral', 'primary', 'event', 'success', 'error'],
      description: 'Sets the icon to show at the left of the modal title.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'IBmbModalAlertStyle' },
      },
    },
    actions: {
      description: 'Sets the actions to show at the bottom of the modal.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbActionButton[]' },
      },
    },
    closeModalClicked: {
      description: 'Triggered when the close modal button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'void' },
      },
    },
    disableBackdropClose: {
      control: { type: 'boolean' },
      description:
        'Disables the ability to close the modal by clicking outside or pressing the escape key.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    inputContext: {
      description:
        'Context object to pass data to the component used as content.',
      table: {
        category: 'Properties',
        type: { summary: '{ [key: string]: any }' },
        defaultValue: { summary: '{}' },
      },
    },
    outputContext: {
      description:
        'Context object to pass output events to the component used as content.',
      table: {
        category: 'Events',
        type: { summary: '{ [key: string]: (value: any) => void }' },
        defaultValue: { summary: '{}' },
      },
    },
    actionsClicked: {
      description:
        'Event emitted when any action button is clicked, providing the button name and the click event.',
      table: {
        category: 'Events',
        type: { summary: '{ buttonName: string; event: MouseEvent }' },
        defaultValue: { summary: '{}' },
      },
    },
  },
  args: {
    title: '',
    subtitle: '',
    content: '',
    size: 'medium',
    modalId: '',
    actions: [
      {
        buttonName: 'reject',
        appearance: 'secondary-outlined',
        label: 'Reject',
        icon: 'close',
        action: () => {
          console.log('Reject action clicked');
        },
      },
      {
        buttonName: 'accept',
        appearance: 'primary',
        label: 'Accept',
        icon: 'check',
        action: () => {
          console.log('Accept action clicked');
        },
      },
    ],
    closeModalClicked: () => {
      console.log('Close modal clicked');
    },
    actionsClicked: () => {
      console.log('Action button clicked');
    },
  },
} as Meta<BmbNativeModalStory>;

type Story = StoryObj<BmbNativeModalStory>;

export const Default: Story = {};
