import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbActionMenuComponent } from './bmb-action-menu.component';
import {
  attributes,
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getElementUsesDesc,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  getTechnicalOneReference,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';
import {
  DBmbHomeCardParamDesc,
  getDefaultValueControl,
} from '../../utils/doc/parameterDescriptions';
import * as item from '../bmb-item/bmb-item.stories';

export default {
  title: 'Components/Menus/Action menu',
  component: BmbActionMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbItemComponent],
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['genericMenuContent', 'menuContent'] },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'action-menu' })} o group and display action options in a context menu. It is triggered by a specific button or event.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/action-menu/descripcion-general-gXdipbgD',
  },
)}
${getSpecialSpecifications(
  `
${getAlertBlockquote(
  `
Please remember to always add the *#actionMenuItem* tag to the ***Action menu*** templates for proper functionality.
\`\`\`html
<ng-template #actionMenuItem>
  <!-- Content  -->
</ng-template>\`\`\``,
  {
    title: RELEVANT_TITLE.configuration,
    blockquoteType: BlockquoteType.important,
    isRelevantTitle: true,
  },
)}
<br/>
${getElementUsesDesc('item')}
${getTechnicalOneReference(item.default.title!)}
  `,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock('BmbActionMenuComponent')}
        `,
      },
    },
  },
  argTypes: {
    icon: DBmbHomeCardParamDesc.icon,
    iconSize: DBmbHomeCardParamDesc.iconSize,
    bgIconAppearance: DBmbHomeCardParamDesc.bgIconAppearance,
    componentTitle: DBmbHomeCardParamDesc.title,
    subtitle: DBmbHomeCardParamDesc.subtitle,
    showHeader: {
      control: { type: 'boolean' },
      description:
        'Sets a flag to indicate whether the card should show the header.<br/><br/>Shows the header when true. ',
      table: {
        category: 'Properties',
        type: { summary: 'boolean (optional)' },
        defaultValue: getDefaultValueControl(true),
      },
    },
    projectedContent: {
      control: false,
      description:
        'Allows projecting custom content into the action menu using ng-template.',
      table: {
        category: 'Properties',
        type: { summary: 'TemplateRef<any>[] (optional)' },
        defaultValue: false,
      },
    },
    title: {
      control: null,
      description:
        'Please use `componentTitle` instead of `title` to set the component title.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: '',
      },
    },
  },
  args: {
    icon: 'account_balance_wallet',
    bgIconAppearance: 'green-light',
    componentTitle: 'Title',
    subtitle: 'Subtitle',
    showHeader: true,
  },
} as Meta<typeof BmbActionMenuComponent>;

type Story = StoryObj<BmbActionMenuComponent>;

export const WithIcon: Story = {
  render: (args: any) => ({
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template #actionMenuItem>
          <bmb-item
            label="Correo"
            value="tecservices@servicios.tec.mx"
            valueLink="mailto:tecservices@servicios.tec.mx"
            valueTarget="_self"
        />
        </ng-template>
        <ng-template #actionMenuItem>
          <bmb-item
            label="Teléfono"
            icon="mobile"
            value="52 81 8358 2000"
            valueLink="tel:52 81 8358 2000"
            valueTarget="_self"
          />
        </ng-template>
        <ng-template #actionMenuItem>
          <bmb-item
            label="Teléfono"
            icon="mobile"
            value="+52 81 1625 5123 (solo texto)"
          />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};

export const WithoutIcon: Story = {
  render: (args: any) => ({
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template #actionMenuItem>
          <bmb-item
            label="Correo"
            value="tecservices@servicios.tec.mx"
            valueLink="mailto:tecservices@servicios.tec.mx"
            valueTarget="_self"
          />
        </ng-template>
        <ng-template #actionMenuItem>
          <bmb-item
            label="Teléfono"
            value="52 81 8358 2000"
            valueLink="tel:52 81 8358 2000"
            valueTarget="_self"
          />
        </ng-template>
        <ng-template #actionMenuItem>
          <bmb-item
            label="Teléfono"
            value="+52 81 1625 5123 (solo texto)"
          />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};

export const InformativeText: Story = {
  render: (args: any) => ({
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template #actionMenuItem>
          <bmb-item
            label="Informative text. Non actionable"
            icon="mail"
            supportText="Support text. <a href='https://www.google.com.mx' target='_blank'>Optional hyperlink text</a>"
          />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};

export const InformativeTextWithoutIcon: Story = {
  render: (args: any) => ({
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template #actionMenuItem>
          <bmb-item
            label="Informative text. Non actionable"
            supportText="Support text. <a href='https://www.google.com.mx' target='_blank'>Optional hyperlink text</a>"
          />
        </ng-template>
        <ng-template #actionMenuItem>
          <bmb-item
            label="Informative text. Non actionable"
            supportText="Here is some support text for your soul."
          />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};

export const Button: Story = {
  args: {
    showHeader: false,
  },
  render: (args: any) => ({
    props: {
      ...args,
      action: () => {
        console.info('In this method you can define the action to be executed');
      },
    },
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template #actionMenuItem>
          <bmb-item label="Correo" [isButton]="true" (action)="action($event)" />
        </ng-template>
        <ng-template #actionMenuItem>
          <bmb-item label="Phone" [isButton]="true" (action)="action($event)" />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};

export const ButtonWithIcon: Story = {
  args: {
    showHeader: false,
  },
  render: (args: any) => ({
    props: {
      ...args,
      action: () => {
        console.info('In this method you can define the action to be executed');
      },
    },
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template #actionMenuItem>
          <bmb-item icon="mail" label="Correo" [isButton]="true" (action)="action($event)" />
        </ng-template>
        <ng-template #actionMenuItem>
          <bmb-item icon="mobile" label="Phone" [isButton]="true" (action)="action($event)" />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};
