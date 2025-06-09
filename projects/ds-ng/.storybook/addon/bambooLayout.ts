import { makeDecorator } from "storybook/internal/preview-api";

export const withCustomLayout = makeDecorator({
  name: 'withCustomLayout',
  parameterName: 'customLayout',
  // skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    console.log('Custom Layout Decorator', parameters);    // log the parameters to the console for debugging

    // get a reference to the active story
    const story = getStory(context);    // modify the story's content as a string
    const decoratedStory = `<div class="storybook-dark-theme">${ story }</div><div class="storybook-light-theme">${ story }</div>`;    // return the modified story string
    return decoratedStory;
  },
});
