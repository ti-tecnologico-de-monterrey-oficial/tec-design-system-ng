import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbDividerComponent } from '../components/bmb-divider/bmb-divider.component';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../components/bmb-card/bmb-card.component';
import {
  getFoundationDescriptions,
  getGeneralDescription,
  getHelpDescriptionForGeneratingVariables,
  getPageStructureForFoundationStories,
  getSandboxConsiderationsDocumentation,
  getSpecialSpecifications,
  getVariableAndClassesSizes,
  getVariableDetail,
  SANDBOX_TITLE,
  SPACING_DESCRIPTION,
} from '../utils/doc/utils';

@Component({
  standalone: true,
  selector: 'bmb-spacing-playground',
  imports: [
    CommonModule,
    BmbDividerComponent,
    BmbCardComponent,
    BmbCardContentComponent,
  ],
  template: `
    <h1>${SANDBOX_TITLE}</h1>
    <br />
    <div
      [ngStyle]="{
        padding: 'var(--bmb-padding-' + padding() + ')',
        margin: 'var(--bmb-margin-' + margin() + ')',
        gap: 'var(--bmb-gap-' + gap() + ')',
      }"
      style="border: var(--bmb-border-general_contrasts-50-1-solid); text-align: center; display: flex; flex-wrap: wrap;"
    >
      <bmb-card margin="none">
        <bmb-card-content padding="m">
          <button
            style="color: var(--general_contrasts-100);"
            (click)="handleClick('--bmb-padding-' + padding())"
          >
            CSS variable name: <strong>--bmb-padding-{{ padding() }}</strong>
          </button>
          <bmb-divider />
          <button
            style="color: var(--general_contrasts-100);"
            (click)="handleClick('bmb_padding-' + padding())"
          >
            Class name: <strong>bmb_padding-{{ padding() }}</strong>
          </button>
        </bmb-card-content>
      </bmb-card>

      <bmb-card margin="none">
        <bmb-card-content padding="m">
          <button
            style="color: var(--general_contrasts-100);"
            (click)="handleClick('--bmb-gap-' + gap())"
          >
            CSS variable name: <strong>--bmb-gap-{{ gap() }}</strong>
          </button>
          <bmb-divider />
          <button
            style="color: var(--general_contrasts-100);"
            (click)="handleClick('bmb_gap-' + gap())"
          >
            Class name: <strong>bmb_gap-{{ gap() }}</strong>
          </button>
        </bmb-card-content>
      </bmb-card>

      <bmb-card margin="none">
        <bmb-card-content padding="m">
          <button
            style="color: var(--general_contrasts-100);"
            (click)="handleClick('--bmb-margin-' + margin())"
          >
            CSS variable name: <strong>--bmb-margin-{{ margin() }}</strong>
          </button>
          <bmb-divider />
          <button
            style="color: var(--general_contrasts-100);"
            (click)="handleClick('bmb_margin-' + margin())"
          >
            Class name: <strong>bmb_margin-{{ margin() }}</strong>
          </button>
        </bmb-card-content>
      </bmb-card>
    </div>
  `,
})
class BmbSpacingPlaygroundComponent {
  padding = input<string>('');
  margin = input<string>('');
  gap = input<string>('');

  handleClick(text: string) {
    window.navigator.clipboard.writeText(text);
    window.alert('Color copied to clipboard: ' + text);
  }
}

const options = [
  'none',
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  'auto',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
];

export default {
  title: 'Foundations/Spacing',
  component: BmbSpacingPlaygroundComponent,
  parameters: {
    docs: {
      page: () => getPageStructureForFoundationStories(),
      description: {
        component: `
${getGeneralDescription(getFoundationDescriptions('spacing', SPACING_DESCRIPTION.concat('<br/><br/>')), 'https://bamboo.tec.mx/latest/foundations/spacing/descripcion-general-Mg3ksz2Z')}
${getSpecialSpecifications(
  getSandboxConsiderationsDocumentation(
    'spacing',
    '',
    `###Additional:
For padding, margin, and gap it is also possible to use the CSS *spacing* variables. ${getVariableDetail('spacing', '', 'padding, margin, and gap', '\`--bmb-spacing-{spacing}\`', '\`{spacing}\`', 'padding: var(--bmb-spacing-4); margin: var(--bmb-spacing-4); gap: var(--bmb-spacing-4);')}<br/>
    ${getVariableAndClassesSizes('spacing')}`,
    true,
    ['padding', 'margin', 'gap'],
    '',
    true,
    true,
  ),
)}`,
      },
    },
  },
  argTypes: {
    padding: {
      name: 'Padding',
      description: getHelpDescriptionForGeneratingVariables('padding', true),
      control: { type: 'select' },
      options: options,
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
        defaultValue: { summary: '1' },
      },
    },
    margin: {
      name: 'Margin',
      description: getHelpDescriptionForGeneratingVariables('margin', true),
      control: { type: 'select' },
      options: options,
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
        defaultValue: { summary: '1' },
      },
    },
    gap: {
      name: 'Gap',
      description: getHelpDescriptionForGeneratingVariables('gap', true),
      control: { type: 'select' },
      options: options,
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {
    padding: '1',
    margin: '1',
    gap: '1',
  },
} as Meta<typeof BmbSpacingPlaygroundComponent>;

type Story = StoryObj<typeof BmbSpacingPlaygroundComponent>;

export const Default = {};
