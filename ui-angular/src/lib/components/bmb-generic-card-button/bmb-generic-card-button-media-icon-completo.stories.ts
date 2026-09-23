import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbGenericCardButtonComponent } from './bmb-generic-card-button.component';
import {
  storyFragmentImports,
  stack,
  iconMedia,
  imageMedia,
  menuAction,
  actionsCluster,
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
  title: 'Templates/Generic card button/Media and icon complete',
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
  'Resumen de texto en diferentes idiomas con las consideraciones especificadas para más contenido el cual puede ir hasta 5 líneas de texto largo.';

const footerRow = () =>
  headerRow(
    badges([
      { text: 'Info', appearance: 'info' },
      { text: 'Success', appearance: 'success' },
    ]),
    footerLinkUnderlined,
  );

export const MediaComplete: Story = {
  render: () => ({
    template: cardWrap(
      328,
      510,
      stack([
        imageMedia(),
        rightAlign(menuAction),
        titleWithAuthor(
          'Texto principal largo (máximo 2 líneas o 3 sin contenido complementario)',
          '5',
          '700',
        ),
        body(bodyText),
        secondaryCaption('Contenido complementario'),
        footerRow(),
      ]),
    ),
    props,
  }),
};

export const MediaCompleteSelected: Story = {
  render: () => ({
    template: cardWrap(
      328,
      530,
      stack([
        imageMedia(),
        actionsCluster({ selection: true, selected: true }),
        titleWithAuthor(
          'Texto principal largo (máximo 2 líneas o 3 sin contenido complementario)',
          '5',
          '700',
        ),
        body(bodyText),
        secondaryCaption('Contenido complementario'),
        footerRow(),
      ]),
      { selected: true },
    ),
    props,
  }),
};

export const IconComplete: Story = {
  render: () => ({
    template: cardWrap(
      328,
      340,
      stack([
        headerRow(iconMedia(), menuAction),
        titleWithAuthor(
          'Texto principal largo (máximo 3 líneas de texto con contenido inferior complementario)',
          '5',
          '700',
          'Contenido complementario',
        ),
        body(bodyText),
        secondaryCaption('Contenido complementario'),
        footerRow(),
      ]),
    ),
    props,
  }),
};

export const IconCompleteSelected: Story = {
  render: () => ({
    template: cardWrap(
      328,
      360,
      stack([
        actionsCluster({ selection: true, selected: true }),
        iconMedia(),
        titleWithAuthor(
          'Texto principal largo (máximo 3 líneas de texto con contenido inferior complementario)',
          '5',
          '700',
          'Contenido complementario',
        ),
        body(bodyText),
        secondaryCaption('Contenido complementario'),
        footerRow(),
      ]),
      { selected: true },
    ),
    props,
  }),
};
