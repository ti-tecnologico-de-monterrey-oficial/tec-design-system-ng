import { Meta, StoryObj } from '@storybook/angular';
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbDividerComponent } from '../components/bmb-divider/bmb-divider.component';
import {
  getFoundationDescriptions,
  getGeneralDescription,
  getHelpDescriptionForGeneratingVariables,
  getPageStructureForFoundationStories,
  getSandboxConsiderationsDocumentation,
  getSpecialSpecifications,
  getVariableAndClassesSizes,
  SANDBOX_TITLE,
} from '../utils/doc/utils';

@Component({
  standalone: true,
  selector: 'bmb-radius-playground',
  imports: [CommonModule, BmbDividerComponent],
  template: `
    <h1 style="width: 100%;">${SANDBOX_TITLE}</h1>
    <br />
    <div
      [ngStyle]="{ borderRadius: 'var(--bmb-radius-' + radius() + ')' }"
      style="border: var(--bmb-border-general_contrasts-50-1-solid); padding: 1rem; text-align: center;"
    >
      <button
        style="color: var(--general_contrasts-100);"
        (click)="handleClick('--bmb-radius-' + radius())"
      >
        CSS variable name: <strong>--bmb-radius-{{ radius() }}</strong>
      </button>
      <bmb-divider />
      <button
        style="color: var(--general_contrasts-100);"
        (click)="handleClick('bmb_radius-' + radius())"
      >
        Class name: <strong>bmb_radius-{{ radius() }}</strong>
      </button>
    </div>
  `,
})
class BmbRadiusPlaygroundComponent {
  radius = input<string>('');

  handleClick(text: string) {
    window.navigator.clipboard.writeText(text);
    window.alert('Color copied to clipboard: ' + text);
  }
}

export default {
  title: 'Foundations/Radius',
  component: BmbRadiusPlaygroundComponent,
  parameters: {
    docs: {
      page: () => getPageStructureForFoundationStories(),
      description: {
        component: `
${getGeneralDescription(
  getFoundationDescriptions(
    'radius',
    `
\`border-radius\` rounds the outer corners of an HTML element.
This property is a tool for creating visually appealing and modern user interfaces because it allows for rounded or circular shapes instead of rectangular corners.<br/><br/>`,
  ),
  'https://bamboo.tec.mx/latest/foundations/radius/descripcion-general-jC3HBIda',
)}
${getSpecialSpecifications(
  getSandboxConsiderationsDocumentation(
    'radius',
    '',
    getVariableAndClassesSizes('radius'),
    true,
    [{ element: 'radius', name: 'border-radius' }],
    'border: var(--bmb-border-general_contrasts-50-1-solid);',
    true,
    true,
  ),
)}`,
      },
    },
  },
  argTypes: {
    radius: {
      name: 'Radius',
      control: { type: 'select' },
      description: getHelpDescriptionForGeneratingVariables('radius', true),
      options: [
        'none',
        'xxs',
        'xs',
        's',
        'm',
        'l',
        'xl',
        'xxl',
        'auto',
        'full',
        '0',
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
        '12',
        '16',
      ],
      table: {
        category: SANDBOX_TITLE,
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
      },
    },
  },
  args: {
    radius: 'none',
  },
} as Meta<typeof BmbRadiusPlaygroundComponent>;

type Story = StoryObj<typeof BmbRadiusPlaygroundComponent>;

export const Default: Story = {};
