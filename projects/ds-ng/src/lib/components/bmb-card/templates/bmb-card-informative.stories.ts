import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card.component';
import { moduleMetadata } from '@storybook/angular';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '../../../utils/doc/utils';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';

import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Informative',
  tags: ['!autodocs'],
  component: BmbCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BmbCardComponent,
        BmbCardContentComponent,
        BmbBoxIconComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbVerticalLayoutDirective,
        BmbVerticalLayoutItemDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: ['alternative', 'state', 'getStyles', 'getClasses'],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'card' })} to present whether type of content in an orderly manner with card features.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/components/generic-card/descripcion-general-ArPVPcRB',
  },
)}
${getSpecialSpecifications(getEmptyStateMessage(), { showAdditionalBlockquote: true, isSubStory: true })}
${getBasicExampleBlock(`
        BmbCardComponent,
        BmbCardContentComponent,
        BmbBoxIconComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbVerticalLayoutDirective,
        BmbVerticalLayoutItemDirective,
      `)}
        `,
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<BmbCardComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
<bmb-card>
  <bmb-card-content padding="m">
    <section
      bmbLayout
      margin="none"
      gapSize="3"
      alignItems="center"
      justify="center"
    >
      <bmb-box-icon
        [iconName]="'home'"
        [boxColor]="'black-primary'"
        bmbLayoutItem
        [isDynamicItem]="true"
      />
      <section bmbLayoutItem [isDynamicItem]="true" [colGrow]="1" [colLg]="12">
        <section bmbVerticalLayout gapSize="xs">
          <h4 class="font-regular-4" bmbVerticalLayoutItem>
            {{ 'Title' }}
          </h4>
          <p class="font-regular-1" bmbVerticalLayoutItem>
            {{ 'Complementary text...' }}
          </p>
        </section>
      </section>
    </section>
  </bmb-card-content>
</bmb-card>
    `,
  }),
};
