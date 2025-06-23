import { componentWrapperDecorator } from '@storybook/angular';

export const storiesLayoutVertical = componentWrapperDecorator(
  (story: string) => {
    return `
<section id="storybook-theme-selector" class="both">
  <div class="storybook-theme-selector-buttons">
    <button
      class="storybook-theme-toggle both"
      onclick="
        const target = event.target.closest('#storybook-theme-selector');
        target.classList.remove('light', 'dark');
        target.classList.add('both');
      ">
      🌓
    </button>
    <button
      class="storybook-theme-toggle dark"
      onclick="
        const target = event.target.closest('#storybook-theme-selector');
        target.classList.remove('light', 'both');
        target.classList.add('dark');">
      🌜
    </button>
    <button
      class="storybook-theme-toggle light"
      onclick="
        const target = event.target.closest('#storybook-theme-selector');
        target.classList.remove('dark', 'both');
        target.classList.add('light');">
      🌞
    </button>
  </div>
  <div class="storybook-light-theme">
    ${story}
  </div>
  <div class="storybook-dark-theme">
    ${story}
  </div>
</section>
<footer>© 2025 Bamboo Design System x Tec de Monterrey</footer>`;
  },
  ({ globals }) => {
    console.log('Custom Layout Decorator', globals); // log the globals to the console for debugging
    return { myTheme: globals['myvar'] };
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
        const target = event.target.closest('#storybook-theme-selector');
        target.classList.remove('light', 'dark');
        target.classList.add('both');
      ">
      🌓
    </button>
    <button
      class="storybook-theme-toggle dark"
      onclick="
        const target = event.target.closest('#storybook-theme-selector');
        target.classList.remove('light', 'both');
        target.classList.add('dark');">
      🌚
    </button>
    <button
      class="storybook-theme-toggle light"
      onclick="
        const target = event.target.closest('#storybook-theme-selector');
        target.classList.remove('dark', 'both');
        target.classList.add('light');">
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
  ({ globals }) => {
    console.log('Custom Layout Decorator', globals); // log the globals to the console for debugging

    return { myTheme: globals['myvar'] };
  },
);
