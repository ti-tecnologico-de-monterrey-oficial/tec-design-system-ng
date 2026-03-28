import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbActionMenuComponent } from './bmb-action-menu.component';
import {
  attributes,
  getActionMenuAlert,
  getBasicExampleBlock,
  getElementUsesDesc,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  getTechnicalDocReferences,
} from '../../utils/doc/utils';
import { DBmbActionMenu } from '../../utils/doc/parameterDescriptions';
import { BmbItemDefaultComponent } from '../bmb-item/bmb-item-default/bmb-item-default.component';
import { BmbItemHyperlinkComponent } from '../bmb-item/bmb-item-hyperlink/bmb-item-hyperlink.component';
import { BmbItemActionsComponent } from '../bmb-item/bmb-item-actions/bmb-item-actions.component';
import { BmbItemInformativeTextComponent } from '../bmb-item/bmb-item-informative-text/bmb-item-informative-text.component';
import { BmbInteractiveItemDefaultComponent } from '../bmb-interactive-item/bmb-interactive-item-default/bmb-interactive-item-default.component';
import { BmbInteractiveItemChevronComponent } from '../bmb-interactive-item/bmb-interactive-item-chevron/bmb-interactive-item-chevron.component';

export default {
  title: 'Components/Menus/Action menu',
  component: BmbActionMenuComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbItemDefaultComponent,
        BmbItemHyperlinkComponent,
        BmbItemInformativeTextComponent,
        BmbItemActionsComponent,
        BmbInteractiveItemDefaultComponent,
        BmbInteractiveItemChevronComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['genericMenuContent', 'menuContent'] },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'action-menu' })} group and display action options in a context menu. It is triggered by a specific button or event.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/action-menu/descripcion-general-gXdipbgD',
  },
)}
${getSpecialSpecifications(
  `
${getActionMenuAlert()}
<br/>
${getElementUsesDesc('item-hyperlink` and `bmb-item-default')}
${getTechnicalDocReferences({
  references: [
    { title: 'Dev tools/Item' },
    { title: 'Dev tools/Interactive item' },
  ],
})}
  `,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock('BmbActionMenuComponent')}
        `,
      },
    },
  },
  argTypes: {
    ...DBmbActionMenu,
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

export const Default: Story = {
  render: (args: any) => ({
    template: `
      <bmb-action-menu ${attributes(args)}>
        <ng-template #actionMenuItem>
          <bmb-item-hyperlink
            label="Correo"
            value="tecservices@servicios.tec.mx"
            valueLink="mailto:tecservices@servicios.tec.mx"
            valueTarget="_self"
        />
        </ng-template>
        <ng-template #actionMenuItem>
          <bmb-item-hyperlink
            label="Teléfono"
            icon="mobile"
            value="52 81 8358 2000"
            valueLink="tel:52 81 8358 2000"
            valueTarget="_self"
          />
        </ng-template>
        <ng-template #actionMenuItem>
          <bmb-item-default
            label="Teléfono"
            icon="mobile"
            value="+52 81 1625 5123 (solo texto)"
          />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};
