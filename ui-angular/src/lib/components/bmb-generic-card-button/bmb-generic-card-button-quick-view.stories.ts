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
  headerRow,
  titleWithAuthor,
  mutedLabel,
  body,
  badges,
  footerLink,
  cardWrap,
} from './bmb-generic-card-button-story-fragments';

const meta: Meta<BmbGenericCardButtonComponent> = {
  title: 'Components/Containers/Generic card button/Quick View',
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

const quickViewBody =
  'Resumen de texto en diferentes idiomas con las consideraciones especificadas para más contenido el cual puede ir hasta 3 líneas de texto largo.';

const threeBadges = badges([
  { text: 'Info', appearance: 'info' },
  { text: 'Success', appearance: 'success' },
  { text: 'Normal', appearance: 'normal' },
]);

// media (left, spans 3 rows) + title/body/badges (right, stacked)
const horizontal = (media: string) =>
  grid(
    [
      gridItem(media, 1, 1, 1, 3),
      gridItem(headerRow(titleWithAuthor(), menuAction), 2, 1),
      gridItem(body(quickViewBody), 2, 2),
      gridItem(headerRow(threeBadges, footerLink), 2, 3),
    ].join('\n'),
    2,
    3,
  );

export const Image: Story = {
  render: () => ({
    template: cardWrap(508, 180, horizontal(imageMedia())),
    props,
  }),
};

export const Icon: Story = {
  render: () => ({
    template: cardWrap(508, 180, horizontal(iconMedia())),
    props,
  }),
};

export const QuickViewVertical: Story = {
  render: () => ({
    template: cardWrap(
      328,
      300,
      stack([
        iconMedia(),
        titleWithAuthor(
          'Texto principal largo (máximo 2 líneas de texto)',
          '6',
          '700',
        ),
        mutedLabel('Contenido complementario'),
        body(quickViewBody),
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
      340,
      stack([
        headerRow(iconMedia(), menuAction),
        titleWithAuthor('Resumen de Texto', '6', '700'),
        body(
          'Resumen de texto en diferentes idiomas con las consideraciones especificadas para más contenido el cual puede hasta 5 líneas largo lorem ipsum lorem ipsum.',
        ),
        mutedLabel('Contenido complementario'),
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
