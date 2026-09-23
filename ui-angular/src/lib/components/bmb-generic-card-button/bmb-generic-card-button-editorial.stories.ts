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
  rightAlign,
  titleWithAuthor,
  body,
  secondaryCaption,
  badges,
  footerLink,
  footerLinkUnderlined,
  cardWrap,
  technicalReferences,
} from './bmb-generic-card-button-story-fragments';

const meta: Meta<BmbGenericCardButtonComponent> = {
  title: 'Templates/Generic card button/Editorial',
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

const bodyText =
  'Resumen de texto en diferentes idiomas con las consideraciones especificadas para más...';

export const Editorial: Story = {
  render: () => ({
    template: cardWrap(
      328,
      248,
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

export const EditorialWithTextLink: Story = {
  render: () => ({
    template: cardWrap(
      328,
      270,
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

export const EditorialWithActions: Story = {
  render: () => ({
    template: cardWrap(
      328,
      270,
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

export const EditorialComplete: Story = {
  render: () => ({
    template: cardWrap(
      328,
      300,
      stack([
        headerRow(
          `<div style="display: flex; align-items: center; gap: 8px">${iconMedia()}${badges([{ text: 'Info', appearance: 'info' }])}</div>`,
          menuAction,
        ),
        titleWithAuthor(
          'Texto principal largo (máximo 2 líneas o 3 sin contenido complementario)',
          '5',
          '700',
          'Contenido complementario',
        ),
        body(bodyText),
        secondaryCaption('Contenido complementario'),
        footerLinkUnderlined,
      ]),
    ),
    props,
  }),
};

export const EditorialCompleteWithoutMedia: Story = {
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
          '5',
          '700',
          'Contenido complementario',
        ),
        body(bodyText),
        secondaryCaption('Contenido complementario'),
        footerLinkUnderlined,
      ]),
    ),
    props,
  }),
};

export const ResponsiveVerticalCompleteMedia: Story = {
  render: () => ({
    template: cardWrap(
      368,
      480,
      stack([
        imageMedia(),
        rightAlign(menuAction),
        titleWithAuthor('Resumen de Texto', '6', '700'),
        body(
          'Resumen de texto en diferentes idiomas con las consideraciones especificadas de hasta 4 líneas de texto.',
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

export const ResponsiveVerticalCompleteIcon: Story = {
  render: () => ({
    template: cardWrap(
      328,
      380,
      stack([
        headerRow(iconMedia(), menuAction),
        titleWithAuthor('Resumen de Texto', '6', '700'),
        body(
          'Resumen de texto en diferentes idiomas con las consideraciones especificadas de hasta 4 líneas de texto',
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
