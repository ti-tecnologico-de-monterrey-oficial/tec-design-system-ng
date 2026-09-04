import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbGenericCardButtonComponent } from './bmb-generic-card-button.component';
import {
  storyFragmentImports,
  stack,
  grid,
  gridItem,
  iconMedia,
  imageMedia,
  menuAction,
  actionsCluster,
  selectionIcon,
  headerRow,
  titleWithAuthor,
  body,
  badges,
  footerLink,
  cardWrap,
} from './bmb-generic-card-button-story-fragments';

const meta: Meta<BmbGenericCardButtonComponent> = {
  title: 'Components/Containers/Generic card button/Small',
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

export const Compacto: Story = {
  render: () => ({
    template: cardWrap(
      328,
      180,
      stack([
        headerRow(iconMedia(), menuAction),
        titleWithAuthor(),
        badges([{ text: 'Info', appearance: 'info' }]),
      ]),
    ),
    props,
  }),
};

export const Acciones: Story = {
  render: () => ({
    template: cardWrap(
      328,
      200,
      stack([
        headerRow(iconMedia(), actionsCluster({ selection: true })),
        titleWithAuthor(),
        badges([{ text: 'Info', appearance: 'info' }]),
      ]),
    ),
    props,
  }),
};

export const ConTextLink: Story = {
  render: () => ({
    template: cardWrap(
      328,
      220,
      stack([
        headerRow(iconMedia(), actionsCluster({ selection: true })),
        titleWithAuthor(),
        headerRow(
          badges([{ text: 'Info', appearance: 'info' }]),
          footerLink,
        ),
      ]),
    ),
    props,
  }),
};

export const Seleccion: Story = {
  render: () => ({
    template: cardWrap(
      328,
      190,
      stack([
        headerRow(iconMedia(), selectionIcon(true)),
        titleWithAuthor(),
        badges([{ text: 'Info', appearance: 'info' }]),
      ]),
      { selected: true },
    ),
    props,
  }),
};

export const ResponsiveVerticalCompletoIcon: Story = {
  render: () => ({
    template: cardWrap(
      328,
      300,
      stack([
        headerRow(iconMedia(), menuAction),
        titleWithAuthor('Resumen de Texto', '6', '700'),
        body(
          'Resumen de texto en diferentes idiomas con las consideraciones especificadas para más...',
        ),
        headerRow(
          badges([
            { text: 'Info', appearance: 'info' },
            { text: 'Success', appearance: 'success' },
          ]),
          footerLink,
        ),
      ]),
    ),
    props,
  }),
};

export const ResponsiveVerticalCompletoImage: Story = {
  render: () => ({
    template: cardWrap(
      328,
      420,
      grid(
        [
          gridItem(imageMedia(), 1, 1),
          gridItem(
            headerRow(
              titleWithAuthor('Resumen de Texto', '6', '700'),
              menuAction,
            ),
            1,
            2,
          ),
          gridItem(
            body(
              'Resumen de texto en diferentes idiomas con las consideraciones especificadas para más...',
            ),
            1,
            3,
          ),
          gridItem(
            headerRow(
              badges([
                { text: 'Info', appearance: 'info' },
                { text: 'Success', appearance: 'success' },
              ]),
              footerLink,
            ),
            1,
            4,
          ),
        ].join('\n'),
        1,
        4,
      ),
    ),
    props,
  }),
};
