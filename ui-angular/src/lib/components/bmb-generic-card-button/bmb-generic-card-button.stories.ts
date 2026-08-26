import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbGenericCardButtonComponent } from './bmb-generic-card-button.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { BmbBoxIconComponent } from '../old/bmb-box-icon/bmb-box-icon.component';
import { BmbButtonIconComponent } from '../old/bmb-button-icon/bmb-button-icon.component';
import { BmbImageComponent } from '../old/bmb-image/bmb-image.component';
import { BmbTextLinkComponent } from '../old/bmb-text-link/bmb-text-link.component';
import { BmbTitleComponent } from '../old/bmb-title/bmb-title.component';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from '../../directives/old/bmb-layout-grid/bmb-layout-grid.directive';

const meta: Meta<BmbGenericCardButtonComponent> = {
  title: 'Components/Containers/Generic card button',
  component: BmbGenericCardButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BmbGenericCardButtonComponent,
        BmbBadgeComponent,
        BmbBoxIconComponent,
        BmbButtonIconComponent,
        BmbImageComponent,
        BmbTextLinkComponent,
        BmbTitleComponent,
        BmbLayoutGridDirective,
        BmbLayoutGridItemDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
A card that owns sizing, click/keyboard behavior, and state/chrome styling (hover, active,
focus, disabled, selected) — layout is entirely up to the consumer. Project any content
wrapped in your own \`[bmbLayoutGrid]\` (\`columns\`/\`rows\`/etc.), and place each piece with
\`[bmbLayoutGridItem]\` (\`colStart\`, \`rowStart\`, \`numberOfColumns\`, \`numberOfRows\`).

The card also supports **custom responsiveness**: mark a whole alternate layout block with
\`bmbCardButtonMedium\` or \`bmbCardButtonLarge\` and the card switches to it once its own
rendered size crosses into that bucket (M ≥ 180px tall, L ≥ 502px wide — the midpoints between
the S/M/L reference sizes: 328x152, 328x208, 676x208). Declare nothing for a bucket and it just
falls back to your plain (undecorated) content — "declare nothing" means the same layout
everywhere.

Named, Figma-matched content examples live in the sibling story groups: Small, Editorial,
Editorial completo vertical, Media e Icon completo, and Quick View.
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<BmbGenericCardButtonComponent>;

const image =
  'https://conecta.tec.mx/sites/default/files/inline-images/tec-de-monterrey.webp';

const gridItem = (
  content: string,
  colStart: number,
  rowStart: number,
  numberOfColumns = 1,
  numberOfRows = 1,
) =>
  `<div bmbLayoutGridItem [colStart]="${colStart}" [rowStart]="${rowStart}" [numberOfColumns]="${numberOfColumns}" [numberOfRows]="${numberOfRows}">${content}</div>`;

const grid = (items: string, columns = 4, rows = 2) =>
  `<div bmbLayoutGrid [columns]="${columns}" [rows]="${rows}" height="100%">${items}</div>`;

const wrap = (
  width: number,
  height: number,
  content: string,
  opts: {
    selected?: boolean;
    disabled?: boolean;
    appearance?: 'default' | 'alternative';
  } = {},
): Story => ({
  render: () => ({
    template: `<div style="padding: 1.5rem"><div style="width: ${width}px; height: ${height}px">
      <bmb-generic-card-button
        ${opts.selected ? '[selected]="true" ' : ''}${opts.disabled ? '[disabled]="true" ' : ''}${opts.appearance ? `appearance="${opts.appearance}" ` : ''}
        (cardClick)="log('card clicked')"
      >
        ${content}
      </bmb-generic-card-button>
    </div></div>`,
    props: {
      log: (message: string) => console.log(message),
    },
  }),
});

const defaultItems = [
  gridItem(
    `<bmb-box-icon iconName="description" boxSize="small" boxShape="circle" boxColor="black-primary" />`,
    1,
    1,
  ),
  gridItem(
    `<bmb-title componentTitle="Resumen de Texto" titleSize="5" titleFontWeight="500" subtitle="Autor desconocido" subtitleSize="3" subtitleFontWeight="400" />`,
    2,
    1,
    2,
  ),
  gridItem(
    `<bmb-button-icon icon="more_vert" [showContainer]="false" alt="Más opciones" (click)="$event.stopPropagation()" />`,
    4,
    1,
  ),
  gridItem(
    `<p style="margin: 0">Resumen de texto en diferentes idiomas con las consideraciones especificadas.</p>`,
    1,
    2,
    3,
  ),
  gridItem(`<bmb-badge text="Info" appearance="info" />`, 4, 2),
].join('\n');
const defaultLayout = grid(defaultItems);

export const Resizable: Story = {
  render: () => ({
    template: `<div style="padding: 1.5rem"><div style="width: 328px; height: 208px; min-width: 328px; min-height: 152px; resize: both; overflow: hidden; border: 1px dashed var(--general-contrasts-container-outline)">
      <bmb-generic-card-button (cardClick)="log('card clicked')">
        ${defaultLayout}
      </bmb-generic-card-button>
    </div></div>`,
    props: {
      log: (message: string) => console.log(message),
    },
  }),
};

export const Disabled: Story = wrap(328, 208, defaultLayout, {
  disabled: true,
});

// appearance="alternative": #313649 at rest, #3F4965 on hover, #617196 selected.
export const AlternativeContainerColor: Story = wrap(328, 208, defaultLayout, {
  appearance: 'alternative',
});

export const AlternativeContainerColorSelected: Story = wrap(
  328,
  208,
  defaultLayout,
  { appearance: 'alternative', selected: true },
);

// Custom responsiveness: a different declared layout per bucket

const mediumOnlyItems = [
  gridItem(
    `<bmb-box-icon iconName="description" boxSize="small" boxShape="circle" boxColor="black-primary" />`,
    1,
    1,
  ),
  gridItem(
    `<bmb-title componentTitle="Resumen de Texto" titleSize="5" titleFontWeight="500" subtitle="Autor desconocido" subtitleSize="3" subtitleFontWeight="400" />`,
    2,
    1,
    2,
  ),
  gridItem(
    `<bmb-button-icon icon="more_vert" [showContainer]="false" alt="Más opciones" (click)="$event.stopPropagation()" />`,
    4,
    1,
  ),
  gridItem(
    `<p style="margin: 0">Resumen de texto en diferentes idiomas con las consideraciones especificadas.</p>`,
    1,
    2,
    3,
  ),
  gridItem(`<bmb-badge text="Info" appearance="info" />`, 4, 2),
].join('\n');

const largeOnlyItems = [
  gridItem(
    `<bmb-image src="${image}" alt="Edificio de Rectoría del Tecnológico de Monterrey" ratio="1 / 1" borderRadius="s" objectFit="cover" />`,
    1,
    1,
    1,
    3,
  ),
  gridItem(
    `<bmb-title componentTitle="Resumen de Texto" titleSize="6" titleFontWeight="700" subtitle="Autor desconocido" subtitleSize="3" subtitleFontWeight="400" />`,
    2,
    1,
    3,
  ),
  gridItem(
    `<p style="margin: 0">Resumen de texto en diferentes idiomas con las consideraciones especificadas para poder cumplir con varias líneas de texto incluido.</p>`,
    2,
    2,
    3,
  ),
  gridItem(
    `<div style="display: flex; align-items: center; gap: 8px"><bmb-badge text="Info" appearance="info" /><bmb-badge text="Success" appearance="success" /><bmb-text-link textLink="Ver más" link="#" target="_self" (click)="$event.stopPropagation()" /></div>`,
    2,
    3,
    3,
  ),
].join('\n');

export const ResponsiveByBucket: Story = {
  render: () => ({
    template: `<div style="padding: 1.5rem"><div style="width: 328px; height: 208px; min-width: 328px; min-height: 152px; resize: both; overflow: hidden; border: 1px dashed var(--general-contrasts-container-outline)">
      <bmb-generic-card-button (cardClick)="log('card clicked')">
        <!-- default: used for S, and as the fallback for any bucket without its own declared override -->
        ${grid(
          [
            gridItem(
              `<bmb-box-icon iconName="description" boxSize="small" boxShape="circle" boxColor="black-primary" />`,
              1,
              1,
            ),
            gridItem(
              `<bmb-button-icon icon="more_vert" [showContainer]="false" alt="Más opciones" (click)="$event.stopPropagation()" />`,
              4,
              1,
            ),
            gridItem(
              `<bmb-title componentTitle="Resumen de Texto" titleSize="5" titleFontWeight="500" />`,
              1,
              2,
              3,
            ),
            gridItem(`<bmb-badge text="Info" appearance="info" />`, 4, 2),
          ].join('\n'),
        )}

        <!-- declared override for the M bucket: a different 4x2 arrangement -->
        <div bmbCardButtonMedium style="width: 100%; height: 100%">
          ${grid(mediumOnlyItems)}
        </div>

        <!-- declared override for the L bucket: a different shape entirely, 4x3 with the image as a left column -->
        <div bmbCardButtonLarge style="width: 100%; height: 100%">
          ${grid(largeOnlyItems, 4, 3)}
        </div>
      </bmb-generic-card-button>
    </div></div>`,
    props: {
      log: (message: string) => console.log(message),
    },
  }),
};
