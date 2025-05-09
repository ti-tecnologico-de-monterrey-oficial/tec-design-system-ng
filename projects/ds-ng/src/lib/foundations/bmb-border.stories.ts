import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

@Component({
  selector: "storybook-border-stories",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Border</h1>
    <p [ngStyle]="getStyles()">
      <button (click)="copyToClipboard()">{{ getVariableName() }}</button>
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
      padding: "1rem",
      'text-align': "center",
      'margin-top': "1rem",
    };
  }

  getVariableName() {
    return `--bmb-border-${this.color()}-${this.size()}-${this.type()}`;
  }

  copyToClipboard(item: any) {
    window.navigator.clipboard.writeText(`--bmb-border-${this.color()}-${this.size()}-${this.type()}`);
    window.alert('Color copied to clipboard: ' + `--bmb-border-${this.color()}-${this.size()}-${this.type()}`);
  }

}

export default {
  title: "Foundations/Borders",
  component: StorybookBorderStoriesComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: "This is a collection of border styles that can be used in the application.",
      },
    },
  },
  argTypes: {
    color: {
      name: "Border Colors",
      description: "This is a collection of border colors that can be used in the application.",

      table: {
        type: { summary: "string" },
        category: "Properties",
        defaultValue: { summary: "inherit" },
      },
      control: {
        type: "select",
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
      name: "Border Sizes",
      description: "This is a collection of border sizes that can be used in the application.",

      table: {
        type: { summary: "string" },
        category: "Properties",
        defaultValue: { summary: "1" },
      },
      control: {
        type: "select",
      },
      options: [
        '1',
        '2',
      ],
    },
    type: {
      name: "Border Types",
      description: "This is a collection of border types that can be used in the application.",

      table: {
        type: { summary: "string" },
        category: "Properties",
        defaultValue: { summary: "solid" },
      },
      control: {
        type: "select",
      },
      options: [
        'solid',
        'dashed',
        'dotted',
      ],
    },
  },
  args: {
    color: "inherit",
    size: "1",
    type: "solid",
  }
} as Meta<typeof StorybookBorderStoriesComponent>;

type Story = StoryObj<typeof StorybookBorderStoriesComponent>;

export const Default: Story = {};
