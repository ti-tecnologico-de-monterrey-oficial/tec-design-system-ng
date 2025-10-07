import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';
import {
  getFoundationDescriptions,
  getGeneralDescription,
  getHelpDescriptionForGeneratingVariables,
  getPageStructureForFoundationStories,
  getSandboxConsiderationsDocumentation,
  getSpecialSpecifications,
  SANDBOX_TITLE,
} from '../utils/doc/utils';

@Component({
  selector: 'storybook-border-stories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>${SANDBOX_TITLE}</h1>
    <p [ngStyle]="getStyles()">
      <button
        style="color: var(--general_contrasts-100);"
        (click)="copyToClipboard()"
      >
        {{ getVariableName() }}
      </button>
    </p>
  `,
})
class StorybookBorderStoriesComponent {
  color = input<string>();
  size = input<string>();
  type = input<string>();

  getStyles() {
    return {
      border: `var(--bmb-border-${this.color()}-${this.size()}-${this.type()})`,
      padding: '1rem',
      'text-align': 'center',
      'margin-top': '1rem',
    };
  }

  getVariableName() {
    return `--bmb-border-${this.color()}-${this.size()}-${this.type()}`;
  }

  copyToClipboard(item: any) {
    window.navigator.clipboard.writeText(
      `--bmb-border-${this.color()}-${this.size()}-${this.type()}`,
    );
    window.alert(
      'Color copied to clipboard: ' +
        `--bmb-border-${this.color()}-${this.size()}-${this.type()}`,
    );
  }
}

export default {
  title: 'Foundations/Borders',
  component: StorybookBorderStoriesComponent,
  parameters: {
    docs: {
      page: () => getPageStructureForFoundationStories(),
      description: {
        component: `
${getGeneralDescription(
  getFoundationDescriptions(
    'border',
    '***Borders*** are lines that separate one area, surface or container from another.<br/><br/>',
  ),
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/foundations/borders/descripcion-general-U27GpidU',
  },
)}
${getSpecialSpecifications(getSandboxConsiderationsDocumentation('borders'))}
        `,
      },
    },
  },
  argTypes: {
    color: {
      name: 'Border colors',
      description: getHelpDescriptionForGeneratingVariables(
        'border colors',
        true,
      ),
      table: {
        type: { summary: 'string' },
        category: SANDBOX_TITLE,
        defaultValue: { summary: 'inherit' },
      },
      control: {
        type: 'select',
      },
      options: [
        'general_contrasts-150',
        'general_contrasts-100',
        'general_contrasts-75',
        'general_contrasts-50',
        'general_contrasts-25',
        'general_contrasts-20',
        'general_contrasts-15',
        'general_contrasts-5',
        'inherit',
      ],
    },
    size: {
      name: 'Border sizes',
      description: getHelpDescriptionForGeneratingVariables(
        'border sizes',
        true,
      ),
      table: {
        type: { summary: 'string' },
        category: SANDBOX_TITLE,
        defaultValue: { summary: '1' },
      },
      control: {
        type: 'select',
      },
      options: ['1', '2'],
    },
    type: {
      name: 'Border types',
      description: getHelpDescriptionForGeneratingVariables(
        'border types',
        true,
      ),
      table: {
        type: { summary: 'string' },
        category: SANDBOX_TITLE,
        defaultValue: { summary: 'solid' },
      },
      control: {
        type: 'select',
      },
      options: ['solid', 'dashed', 'dotted'],
    },
  },
  args: {
    color: 'inherit',
    size: '1',
    type: 'solid',
  },
} as Meta<typeof StorybookBorderStoriesComponent>;

type Story = StoryObj<typeof StorybookBorderStoriesComponent>;

export const Default: Story = {};
