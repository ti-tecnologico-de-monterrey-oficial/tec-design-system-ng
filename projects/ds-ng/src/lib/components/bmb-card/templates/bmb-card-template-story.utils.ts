import { StoryObj } from '@storybook/angular';
import { BmbCardComponent } from '../bmb-card.component';

export type CardTemplateStory = StoryObj<BmbCardComponent>;

export const staticCardStory = (
  template: string,
  mobile = false,
): CardTemplateStory => ({
  render: () => ({ template }),
  parameters: {
    layout: 'padded',
    ...(mobile
      ? { viewport: { defaultViewport: 'mobile1' } }
      : {}),
    docs: { source: { code: template, language: 'html' } },
  },
});
