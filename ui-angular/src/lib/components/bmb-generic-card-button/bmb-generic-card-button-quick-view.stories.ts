import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbGenericCardButtonComponent } from './bmb-generic-card-button.component';
import {
  storyFragmentImports,
  stack,
  grid,
  gridItem,
  iconMedia,
  buildingImage,
  menuAction,
  rightAlign,
  headerRow,
  titleWithAuthor,
  body,
  secondaryCaption,
  badges,
  footerLinkUnderlined,
  cardWrap,
  technicalReferences,
} from './bmb-generic-card-button-story-fragments';

const meta: Meta<BmbGenericCardButtonComponent> = {
  title: 'Templates/Generic card button/Quick view',
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

const quickViewBody =
  'Resumen de texto en diferentes idiomas con las consideraciones especificadas para más contenido el cual puede ir hasta 3 líneas de texto largo.';

const threeBadges = badges([
  { text: 'Info', appearance: 'info' },
  { text: 'Success', appearance: 'success' },
  { text: 'Normal', appearance: 'normal' },
]);

const bleedImage = (src: string) =>
  `<bmb-image src="${src}" alt="Edificio de Rectoría del Tecnológico de Monterrey" borderRadius="none" objectFit="cover" style="height: calc(100% + 32px); margin: -16px 0 -16px -16px; display: block" />`;

const horizontal = (media: string) =>
  grid(
    [
      gridItem(media, 1, 1, 1, 5),
      gridItem(rightAlign(menuAction), 2, 1),
      gridItem(titleWithAuthor(), 2, 2),
      gridItem(body(quickViewBody), 2, 3),
      gridItem(secondaryCaption('Contenido complementario'), 2, 4),
      gridItem(headerRow(threeBadges, footerLinkUnderlined), 2, 5),
    ].join('\n'),
    2,
    5,
  );

export const Image: Story = {
  render: () => ({
    template: cardWrap(788, 300, horizontal(bleedImage(buildingImage))),
    props,
  }),
};

export const Icon: Story = {
  render: () => ({
    template: cardWrap(788, 300, horizontal(iconMedia())),
    props,
  }),
};

export const QuickViewVertical: Story = {
  render: () => ({
    template: cardWrap(
      368,
      400,
      stack([
        iconMedia(),
        titleWithAuthor(
          'Texto principal largo (máximo 2 líneas de texto)',
          '6',
          '700',
          'Contenido complementario',
        ),
        body(quickViewBody),
        secondaryCaption('Contenido complementario'),
        badges([
          { text: 'Info', appearance: 'info' },
          { text: 'Success', appearance: 'success' },
        ]),
      ]),
    ),
    props,
  }),
};

export const QuickViewIcon: Story = {
  render: () => ({
    template: cardWrap(
      328,
      420,
      stack([
        headerRow(iconMedia(), menuAction),
        titleWithAuthor(
          'Resumen de Texto',
          '6',
          '700',
          'Contenido complementario',
        ),
        body(
          'Resumen de texto en diferentes idiomas con las consideraciones especificadas para más contenido el cual puede hasta 5 líneas largo lorem ipsum lorem ipsum.',
        ),
        secondaryCaption('Contenido complementario'),
        headerRow(
          badges([
            { text: 'Info', appearance: 'info' },
            { text: 'Success', appearance: 'success' },
          ]),
          footerLinkUnderlined,
        ),
      ]),
    ),
    props,
  }),
};
