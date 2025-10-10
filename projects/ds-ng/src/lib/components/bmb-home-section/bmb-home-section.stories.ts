import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbHomeSectionComponent } from './bmb-home-section.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Containers/Home section',
  component: BmbHomeSectionComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent, BmbContainerComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'home-section' })} for easy grouping of header content.`, { generalDocLink: 'https://bamboo.tec.mx/latest/components/home-section/descripcion-general-m2zcAnWW' })}
${getBasicExampleBlock('BmbHomeSectionComponent')}
\`\`\`html
<bmb-home-section>
  <div>Content</div>
</bmb-home-section>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc('home section'),
    icon: DBmbIconParamDesc.icon,
    link: DBmbGenericParamDesc.link,
    target: DBmbGenericParamDesc.target,
  },
  args: {
    title: 'Section name',
    icon: 'chevron_right',
    target: '_blank',
    link: 'https://www.youtube.com/',
  },
} as Meta<typeof BmbHomeSectionComponent>;

type Story = StoryObj<BmbHomeSectionComponent>;

export const Default: Story = {};
