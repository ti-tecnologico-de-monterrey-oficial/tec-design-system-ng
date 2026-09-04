import { Component, input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbGenericCardButtonComponent } from './bmb-generic-card-button.component';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from '../../directives/old/bmb-layout-grid/bmb-layout-grid.directive';
import { SizeNames } from '../../_shared/types';

const colors = [
  'var(--violet-tint)',
  'var(--indigo-tint)',
  'var(--emerald-tint)',
  'var(--licorice-tint)',
  'var(--dark-teal-tint)',
  'var(--peach-tint)',
  'var(--sepia-tint)',
  'var(--soft-red-tint)',
  'var(--wattle-tint)',
  'var(--ship-cove-tint)',
  'var(--plantation-tint)',
  'var(--rum-tint)',
  'var(--ripe-lemon-tint)',
  'var(--hibiscus-tint)',
];

@Component({
  standalone: true,
  selector: 'storybook-generic-card-button-playground',
  template: `
    <div [style.width.px]="width()" [style.height.px]="height()">
      <bmb-generic-card-button
        [disabled]="disabled()"
        [selected]="selected()"
        (cardClick)="log('card clicked')"
      >
        <div
          bmbLayoutGrid
          [columns]="columns()"
          [rows]="rows()"
          [columnSize]="columnSize()"
          [rowSize]="rowSize()"
          [colGapSize]="colGapSize()"
          [rowGapSize]="rowGapSize()"
          height="100%"
        >
          @for (cell of cells(); track cell.key) {
            <div
              bmbLayoutGridItem
              [colStart]="cell.col"
              [rowStart]="cell.row"
              class="playground-cell"
              [style.background-color]="'rgba(' + cell.color + ', .55)'"
              [style.border]="'1px solid rgba(' + cell.color + ', 1)'"
            >
              {{ cell.label }}
            </div>
          }
        </div>
      </bmb-generic-card-button>
    </div>
  `,
  imports: [
    CommonModule,
    BmbGenericCardButtonComponent,
    BmbLayoutGridDirective,
    BmbLayoutGridItemDirective,
  ],
  styles: `
    .playground-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      font-size: 12px;
      min-width: 0;
      overflow: hidden;
      padding: 4px;
      text-align: center;
      color: var(--general-contrasts-100);
    }
  `,
})
class StorybookGenericCardButtonPlayground {
  columns = input<number>(4);
  rows = input<number>(2);
  columnSize = input<string>('auto');
  rowSize = input<string>('auto');
  colGapSize = input<SizeNames>('m');
  rowGapSize = input<SizeNames>('m');
  disabled = input<boolean>(false);
  selected = input<boolean>(false);
  width = input<number>(328);
  height = input<number>(208);

  cells() {
    const result: {
      key: string;
      col: number;
      row: number;
      label: string;
      color: string;
    }[] = [];

    for (let r = 1; r <= this.rows(); r++) {
      for (let c = 1; c <= this.columns(); c++) {
        const index = (r - 1) * this.columns() + (c - 1);
        result.push({
          key: `${r}-${c}`,
          col: c,
          row: r,
          label: `${index + 1}`,
          color: colors[index % colors.length],
        });
      }
    }

    return result;
  }

  log(message: string): void {
    console.log(message);
  }
}

const meta: Meta<StorybookGenericCardButtonPlayground> = {
  title: 'Components/Containers/Generic card button/Playground',
  component: StorybookGenericCardButtonPlayground,
  decorators: [
    moduleMetadata({
      imports: [StorybookGenericCardButtonPlayground],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Drive the card's grid inputs live from the Controls panel — one placeholder cell is
generated per (row, column) so you can see the grid reflow as you change columns, rows,
column/row sizing, gaps, or the card's own width/height. This exercises the same
\`[bmbLayoutGrid]\`/\`[bmbLayoutGridItem]\` inputs a real consumer would use with their own
content (image, badge, icon, text link, etc.) — swap the generated placeholders for real
projected content when wiring this into an app.
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 8, step: 1 },
      description: 'Number of grid columns.',
    },
    rows: {
      control: { type: 'number', min: 1, max: 8, step: 1 },
      description: 'Number of grid rows.',
    },
    columnSize: {
      control: { type: 'text' },
      description:
        'Column track size, applied to every column (e.g. "auto", "1fr", "100px").',
    },
    rowSize: {
      control: { type: 'text' },
      description:
        'Row track size, applied to every row (e.g. "auto", "1fr", "60px").',
    },
    colGapSize: {
      control: { type: 'select' },
      options: ['none', 'xs', 's', 'm', 'l', 'xl'],
      description: 'Gap between columns.',
    },
    rowGapSize: {
      control: { type: 'select' },
      options: ['none', 'xs', 's', 'm', 'l', 'xl'],
      description: 'Gap between rows.',
    },
    disabled: { control: { type: 'boolean' } },
    selected: { control: { type: 'boolean' } },
    width: {
      control: { type: 'number', min: 200, step: 4 },
      description: "The card wrapper's width in px (no upper bound on the card itself).",
    },
    height: {
      control: { type: 'number', min: 152, step: 4 },
      description: "The card wrapper's height in px (no upper bound on the card itself).",
    },
  },
  args: {
    columns: 4,
    rows: 2,
    columnSize: 'auto',
    rowSize: 'auto',
    colGapSize: 'm',
    rowGapSize: 'm',
    disabled: false,
    selected: false,
    width: 328,
    height: 208,
  },
};
export default meta;

type Story = StoryObj<StorybookGenericCardButtonPlayground>;

export const Playground: Story = {};
