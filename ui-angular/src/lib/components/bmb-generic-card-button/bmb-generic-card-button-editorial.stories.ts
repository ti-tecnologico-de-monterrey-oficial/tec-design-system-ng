import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbGenericCardButtonComponent } from './bmb-generic-card-button.component';
import {
  storyFragmentImports,
  stack,
  iconMedia,
  imageMedia,
  menuAction,
  actionsCluster,
  headerRow,
  titleWithAuthor,
  body,
  mutedLabel,
  badges,
  footerLink,
  cardWrap,
} from './bmb-generic-card-button-story-fragments';

const meta: Meta<BmbGenericCardButtonComponent> = {
  title: 'Components/Containers/Generic card button/Editorial',
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

const bodyText =
  'Resumen de texto en diferentes idiomas con las consideraciones especificadas para más...';

export const Editorial: Story = {
  render: () => ({
    template: cardWrap(
      328,
      208,
      stack([
        headerRow(iconMedia(), menuAction),
        titleWithAuthor(),
        body(bodyText),
        badges([{ text: 'Info', appearance: 'info' }]),
      ]),
    ),
    props,
  }),
};

export const EditorialConTextLink: Story = {
  render: () => ({
    template: cardWrap(
      328,
      230,
      stack([
        headerRow(iconMedia(), menuAction),
        titleWithAuthor(),
        body(bodyText),
        headerRow(
          badges([{ text: 'Info', appearance: 'info' }]),
          footerLink,
        ),
      ]),
    ),
    props,
  }),
};

export const EditorialConActions: Story = {
  render: () => ({
    template: cardWrap(
      328,
      230,
      stack([
        headerRow(iconMedia(), actionsCluster({ selection: true })),
        titleWithAuthor(),
        body(bodyText),
        badges([{ text: 'Info', appearance: 'info' }]),
      ]),
    ),
    props,
  }),
};

export const EditorialCompleto: Story = {
  render: () => ({
    template: cardWrap(
      328,
      300,
      stack([
        headerRow(iconMedia(), menuAction),
        badges([{ text: 'Info', appearance: 'info' }]),
        titleWithAuthor(
          'Texto principal largo (máximo 2 líneas o 3 sin contenido complementario)',
          '8',
          '700',
        ),
        mutedLabel('Contenido complementario'),
        body(bodyText),
        footerLink,
      ]),
    ),
    props,
  }),
};

export const EditorialCompletoSinMedia: Story = {
  render: () => ({
    template: cardWrap(
      328,
      280,
      stack([
        headerRow(
          badges([{ text: 'Info', appearance: 'info' }]),
          menuAction,
        ),
        titleWithAuthor(
          'Texto principal largo (máximo 3 líneas con contenido inferior complementario)',
          '8',
          '700',
        ),
        mutedLabel('Contenido complementario'),
        body(bodyText),
        footerLink,
      ]),
    ),
    props,
  }),
};

export const ResponsiveVerticalCompletoMedia: Story = {
  render: () => ({
    template: cardWrap(
      328,
      340,
      stack([
        imageMedia(),
        headerRow(titleWithAuthor('Resumen de Texto', '6', '700'), menuAction),
        body(
          'Resumen de texto en diferentes idiomas con las consideraciones especificadas de hasta 4 líneas de texto.',
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

export const ResponsiveVerticalCompletoIcono: Story = {
  render: () => ({
    template: cardWrap(
      328,
      320,
      stack([
        headerRow(iconMedia(), menuAction),
        titleWithAuthor('Resumen de Texto', '6', '700'),
        body(
          'Resumen de texto en diferentes idiomas con las consideraciones especificadas de hasta 4 líneas de texto',
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
