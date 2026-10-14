import { StoryObj } from '@storybook/angular';
import { getViewportStoryParameters } from '@docs/components/viewport.decorator';
import { BmbCardComponent } from '../bmb-card.component';

export type CardTemplateStory = StoryObj<BmbCardComponent>;

// Keep the mobile viewport local to Generic Card previews, not the code panel.
export const getCardViewportStoryParameters = (
  isMobile: boolean,
  sourceCode: string,
) => {
  const story = getViewportStoryParameters(isMobile, sourceCode);
  if (!isMobile) return story;

  return {
    ...story,
    parameters: {
      ...story.parameters,
      layout: 'fullscreen',
      docs: {
        ...story.parameters.docs,
        previewWidth: '375px',
        story: { inline: false, height: '568px' },
      },
    },
  };
};

export const staticCardStory = (
  template: string,
  isMobile = false,
  styles?: string,
): CardTemplateStory => ({
  // Story styles are emulated-encapsulated, so selectors need :host ::ng-deep.
  // Styles only affect the preview; the code panel shows the Bamboo markup alone.
  render: () => ({ template, styles: styles ? [styles] : [] }),
  ...getCardViewportStoryParameters(isMobile, template),
});
