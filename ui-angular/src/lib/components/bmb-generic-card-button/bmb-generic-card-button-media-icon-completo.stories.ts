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
  mutedLabel,
  body,
  badges,
  footerLink,
  cardWrap,
} from './bmb-generic-card-button-story-fragments';

const meta: Meta<BmbGenericCardButtonComponent> = {
  title: 'Components/Containers/Generic card button/Media e Icon completo',
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
  'Resumen de texto en diferentes idiomas con las consideraciones especificadas para más contenido el cual puede ir hasta 5 líneas de texto largo.';

const footerRow = () =>
  headerRow(
    badges([
      { text: 'Info', appearance: 'info' },
      { text: 'Success', appearance: 'success' },
    ]),
    footerLink,
  );

export const MediaCompleto: Story = {
  render: () => ({
    template: cardWrap(
      328,
      420,
      stack([
        imageMedia(),
        headerRow(
          titleWithAuthor(
            'Texto principal largo (máximo 2 líneas o 3 sin contenido complementario)',
            '8',
            '700',
          ),
          menuAction,
        ),
        mutedLabel('Contenido complementario'),
        body(bodyText),
        footerRow(),
      ]),
    ),
    props,
  }),
};

export const MediaCompletoConSeleccion: Story = {
  render: () => ({
    template: cardWrap(
      328,
      440,
      stack([
        imageMedia(),
        rightAlign(actionsCluster({ selection: true, selected: true })),
        titleWithAuthor(
          'Texto principal largo (máximo 2 líneas o 3 sin contenido complementario)',
          '8',
          '700',
        ),
        mutedLabel('Contenido complementario'),
        body(bodyText),
        footerRow(),
      ]),
      { selected: true },
    ),
    props,
  }),
};

export const IconCompleto: Story = {
  render: () => ({
    template: cardWrap(
      328,
      340,
      stack([
        headerRow(iconMedia(), menuAction),
        titleWithAuthor(
          'Texto principal largo (máximo 3 líneas de texto con contenido inferior complementario)',
          '8',
          '700',
        ),
        mutedLabel('Contenido complementario'),
        body(bodyText),
        footerRow(),
      ]),
    ),
    props,
  }),
};

export const IconCompletoConSeleccion: Story = {
  render: () => ({
    template: cardWrap(
      328,
      360,
      stack([
        rightAlign(actionsCluster({ selection: true, selected: true })),
        iconMedia(),
        titleWithAuthor(
          'Texto principal largo (máximo 3 líneas de texto con contenido inferior complementario)',
          '8',
          '700',
        ),
        mutedLabel('Contenido complementario'),
        body(bodyText),
        footerRow(),
      ]),
      { selected: true },
    ),
    props,
  }),
};
