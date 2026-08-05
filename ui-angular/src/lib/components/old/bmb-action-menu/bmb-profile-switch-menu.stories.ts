import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbActionMenuComponent } from './bmb-action-menu.component';
import {
  attributes,
  getActionMenuAlert,
  getBasicExampleBlock,
  getElementUsesDesc,
  getGeneralDescription,
  getSpecialSpecifications,
  getTechnicalOneReference,
} from '../../utils/doc/utils';
import { DBmbActionMenu } from '../../utils/doc/parameterDescriptions';
import { BmbInteractiveItemDefaultComponent } from '../bmb-interactive-item/children';

export default {
  title: 'Components/Menus/Action menu/Profile switch menu',
  component: BmbActionMenuComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BmbInteractiveItemDefaultComponent],
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['genericMenuContent', 'menuContent'] },
      description: {
        component: `
${getGeneralDescription(
  `This element is an ***Action menu*** **variant** used to implement a group of actions in a context menu.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/action-menu/descripcion-general-gXdipbgD',
    isSubStory: true,
  },
)}
${getSpecialSpecifications(
  `
${getActionMenuAlert()}
<br/>
${getElementUsesDesc('interactive-item-default', false)}
${getTechnicalOneReference('Dev tools/Interactive item')}
  `,
  { showAdditionalBlockquote: true, isSubStory: true },
)}
${getBasicExampleBlock('BmbActionMenuComponent', '', '', true)}
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
          <bmb-interactive-item-default
          icon="mobile"
            itemTitle="Text"
            [isActive]="true"
        />
        </ng-template>
        <ng-template #actionMenuItem>
         <bmb-interactive-item-default
          icon="mobile"
            itemTitle="Text"
            [isActive]="false"
        />
        </ng-template>
        <ng-template #actionMenuItem>
           <bmb-interactive-item-default
          icon="mobile"
            itemTitle="Text"
            [isActive]="false"
        />
        </ng-template>
      </bmb-action-menu>
  `,
  }),
};
