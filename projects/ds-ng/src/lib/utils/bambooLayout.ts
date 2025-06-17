import { componentWrapperDecorator } from '@storybook/angular';

export const storiesLayoutVertical = componentWrapperDecorator(
  (story: string) => {
    return `
<section id="storybook-theme-selector" class="both">
  <div class="storybook-theme-selector-buttons">
    <button
      class="storybook-theme-toggle both"
      onclick="
        document.querySelector('#storybook-theme-selector').classList.remove('light', 'dark');
        document.querySelector('#storybook-theme-selector').classList.add('both');
        ">
      🌓
    </button>
    <button
      class="storybook-theme-toggle dark"
      onclick="
        document.querySelector('#storybook-theme-selector').classList.remove('light', 'both');
        document.querySelector('#storybook-theme-selector').classList.add('dark');">
      🌜
    </button>
    <button
      class="storybook-theme-toggle light"
      onclick="
        document.querySelector('#storybook-theme-selector').classList.remove('dark', 'both');
        document.querySelector('#storybook-theme-selector').classList.add('light');">
      🌞
    </button>
  </div>
  <div class="storybook-light-theme">
    ${story}
  </div>
  <div class="storybook-dark-theme">
    ${story}
  </div>
</section>`;
  },
);

export const storiesLayoutHorizontal = componentWrapperDecorator(
  (story: string) => {
    return `
<section id="storybook-theme-selector" class="both">
  <div class="storybook-theme-selector-buttons">
    <button
      class="storybook-theme-toggle both"
      onclick="
        document.querySelector('#storybook-theme-selector').classList.remove('light', 'dark');
        document.querySelector('#storybook-theme-selector').classList.add('both');
        ">
      🌓
    </button>
    <button
      class="storybook-theme-toggle dark"
      onclick="
        document.querySelector('#storybook-theme-selector').classList.remove('light', 'both');
        document.querySelector('#storybook-theme-selector').classList.add('dark');">
      🌚
    </button>
    <button
      class="storybook-theme-toggle light"
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
</section>`;
  },
);
