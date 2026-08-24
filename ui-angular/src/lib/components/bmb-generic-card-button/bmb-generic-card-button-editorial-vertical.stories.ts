import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbGenericCardButtonComponent } from './bmb-generic-card-button.component';
import {
  storyFragmentImports,
  stack,
  iconMedia,
  imageAvatar,
  actionsCluster,
  rightAlign,
  titleWithAuthor,
  body,
  headerRow,
  badges,
  footerLink,
  cardWrap,
} from './bmb-generic-card-button-story-fragments';

const meta: Meta<BmbGenericCardButtonComponent> = {
  title: 'Components/Containers/Generic card button/Editorial completo vertical',
  component: BmbGenericCardButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbGenericCardButtonComponent, ...storyFragmentImports],
    }),
  ],
};
export default meta;

type Story = StoryObj<BmbGenericCardButtonComponent>;

const props = { log: (message: string) => console.log(message) };

const longBody =
  'Resumen de texto de contenido en diferentes idiomas con las consideraciones especificadas de hasta 5 líneas de texto incluido.';

const build = (media: string, selection: boolean, selected: boolean) =>
  cardWrap(
    328,
    360,
    stack([
      rightAlign(actionsCluster({ selection, selected })),
      media,
      titleWithAuthor(),
      body(longBody),
      headerRow(
        badges([
          { text: 'Info', appearance: 'info' },
          { text: 'Success', appearance: 'success' },
        ]),
        footerLink,
      ),
    ]),
    { selected: selection && selected },
  );

export const EditorialCompletoConSeleccionVerticalIcon: Story = {
  render: () => ({
    template: build(iconMedia(), true, true),
    props,
  }),
};

export const EditorialCompletoVerticalIcon: Story = {
  render: () => ({
    template: build(iconMedia(), false, false),
    props,
  }),
};

export const EditorialCompletoConSeleccionVerticalImagen: Story = {
  render: () => ({
    template: build(imageAvatar(), true, true),
    props,
  }),
};

export const EditorialCompletoVerticalImagen: Story = {
  render: () => ({
    template: build(imageAvatar(), false, false),
    props,
  }),
};
