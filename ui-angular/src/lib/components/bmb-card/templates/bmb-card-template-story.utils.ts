import { StoryObj } from '@storybook/angular';
import { getViewportStoryParameters } from '@docs/components/viewport.decorator';
import { BmbCardComponent } from '../bmb-card.component';

export type CardTemplateStory = StoryObj<BmbCardComponent>;

export const staticCardStory = (
  template: string,
  isMobile = false,
): CardTemplateStory => ({
  render: () => ({ template }),
  ...getViewportStoryParameters(isMobile, template),
});
