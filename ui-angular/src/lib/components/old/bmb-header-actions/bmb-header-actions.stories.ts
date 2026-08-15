import { Meta, StoryObj } from '@storybook/angular';
import { BmbHeaderActionsComponent } from './bmb-header-actions.component';
import {
  DBmbGenericParamDesc,
  DBmbHomeCardHeaderParamDesc,
} from '@docs/utils/parameterDescriptions';

export default {
  title: 'Dev tools/Header actions',
  component: BmbHeaderActionsComponent,
  argTypes: {
    actionHeaders: DBmbGenericParamDesc.actionHeaders,
    isMobile: DBmbHomeCardHeaderParamDesc.isMobile,
    showRightButton: DBmbHomeCardHeaderParamDesc.showRightButton,
    isExpanded: DBmbHomeCardHeaderParamDesc.isExpanded,
  },
  args: {
    headerActions: [
      { icon: 'home', link: 'https://example.com' },
      { icon: 'zoom_in_map', iconActiveToggle: 'zoom_out_map' },
    ],
  },
} as Meta<typeof BmbHeaderActionsComponent>;

type Story = StoryObj<BmbHeaderActionsComponent>;

export const Default: Story = {};
