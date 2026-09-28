import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbGenericCardButtonComponent } from './bmb-generic-card-button.component';
import {
  storyFragmentImports,
  stack,
  iconMedia,
  imageAvatar,
  actionsCluster,
  titleWithAuthor,
  body,
  secondaryCaption,
  badges,
  footerLinkUnderlined,
  cardWrap,
  technicalReferences,
} from './bmb-generic-card-button-story-fragments';

const meta: Meta<BmbGenericCardButtonComponent> = {
  title: 'Templates/Generic card button/Editorial complete vertical',
  component: BmbGenericCardButtonComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BmbGenericCardButtonComponent, ...storyFragmentImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: technicalReferences,
      },
    },
  },
};
export default meta;

type Story = StoryObj<BmbGenericCardButtonComponent>;

const props = { log: (message: string) => console.log(message) };

const longBody =
  'Resumen de texto de contenido en diferentes idiomas con las consideraciones especificadas de hasta 5 líneas de texto incluido.';

const build = (media: string, selection: boolean, selected: boolean) =>
  cardWrap(
    328,
    440,
    stack(
      [
        actionsCluster({ selection, selected }),
        `<div style="display: flex; justify-content: center">${media}</div>`,
        `<div style="text-align: center; display: flex; flex-direction: column; align-items: center">${titleWithAuthor('Resumen de Texto', '5', '500', undefined, '3', '400', false)}</div>`,
        `<div style="text-align: center">${body(longBody)}${secondaryCaption('Contenido complementario')}</div>`,
        `<div style="display: flex; flex-direction: column; gap: 4px; align-items: center">${badges([
          { text: 'Info', appearance: 'info' },
          { text: 'Success', appearance: 'success' },
        ])}</div>`,
        `<div style="display: flex; justify-content: flex-end">${footerLinkUnderlined}</div>`,
      ],
      'xs',
    ),
    { selected: selection && selected },
  );

export const EditorialCompleteSelectedVerticalIcon: Story = {
  render: () => ({
    template: build(iconMedia(), true, true),
    props,
  }),
};

export const EditorialCompleteVerticalIcon: Story = {
  render: () => ({
    template: build(iconMedia(), false, false),
    props,
  }),
};

export const EditorialCompleteSelectedVerticalImage: Story = {
  render: () => ({
    template: build(imageAvatar(), true, true),
    props,
  }),
};

export const EditorialCompleteVerticalImage: Story = {
  render: () => ({
    template: build(imageAvatar(), false, false),
    props,
  }),
};
