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

export const storiesLayoutHorizontalDark = componentWrapperDecorator(
  (story: string) => `
<section id="storybook-theme-selector" class="both">
  <div class="storybook-theme-selector-buttons">
    <button
      class="storybook-theme-toggle"
      onclick="
        document.querySelector('#storybook-theme-selector').classList.remove('light', 'dark');
        document.querySelector('#storybook-theme-selector').classList.add('both');">
      🌓
    </button>
    <button
      class="storybook-theme-toggle"
      onclick="
        document.querySelector('#storybook-theme-selector').classList.remove('light', 'both');
        document.querySelector('#storybook-theme-selector').classList.add('dark');">
      🌚
    </button>
    <button
      class="storybook-theme-toggle"
      onclick="
        document.querySelector('#storybook-theme-selector').classList.remove('dark', 'both');
        document.querySelector('#storybook-theme-selector').classList.add('light');">
      🌞
    </button>
  </div>
  <div class="storybook-horizontal-theme">
    <div class="storybook-light-theme horizontal">
      ${story}
    </div>
    <div class="storybook-dark-theme horizontal">
      ${story}
    </div>
  </div>
</section>`);
