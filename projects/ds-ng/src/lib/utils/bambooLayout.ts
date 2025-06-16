import { componentWrapperDecorator } from '@storybook/angular';

export const storiesLayoutVertical = componentWrapperDecorator(
  (story: string) => {
    return `
    <div class="storybook-light-theme">
      ${story}
    </div>
    <div class="storybook-dark-theme">
      ${story}
    </div>`;
  },
);

export const storiesLayoutHorizontal = componentWrapperDecorator(
  (story: string) => {
    return `
<div class="storybook-horizontal-theme">
  <div class="storybook-light-theme horizontal">
    ${story}
  </div>
  <div class="storybook-dark-theme horizontal">
    ${story}
  </div>
</div>`;
  },
);
