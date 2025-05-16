import { CommonModule } from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";
import { moduleMetadata, Meta, StoryObj } from "@storybook/angular";
import { BmbDividerComponent } from "../components/bmb-divider/bmb-divider.component";

@Component({
  selector: "storybook-shadows-stories",
  standalone: true,
  imports: [CommonModule, BmbDividerComponent],
  template: `
    <p [ngStyle]="getStyles()">
      <button (click)="copyToClipboard('var')">
        CSS variable name: <strong>--{{ shadowsName() }}</strong></button>
      <bmb-divider />
      <button (click)="copyToClipboard('class')">
        Class name: <strong>{{ shadowsName() }}</strong></button>
    </p>
  `,
})
class StorybookShadowsStoriesComponent {
  shadowsName = input<string>();

  getStyles() {
    return {
      boxShadow: `var(--${this.shadowsName()})`,
      padding: "1rem",
      "text-align": "center",
      "margin-top": "1rem",
    };
  }
  copyToClipboard(type: string) {
    const str = type === "class" ? `${this.shadowsName()}` : `--${this.shadowsName()}`;
    window.navigator.clipboard.writeText(str);
    window.alert(`Color copied to clipboard: ${str}`);
  }
}

export default {
  title: "Foundations/Shadows",
  component: StorybookShadowsStoriesComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbDividerComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
This is a collection of shadows styles that can be used in the application. The shadows are defined in the CSS variables and can be used in the application by using the class name or the CSS variable name.

**You should be careful when using shadows**, as they can affect Bamboo components. Some components may override this attribute, so check the component's documentation before applying the shadow class.
`,
      },
    },
  },
  argTypes: {
    shadowsName: {
      name: "Shadows Name",
      description: "This is a collection of shadows names that can be used in the application.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "bmb-box-shadow-1" },
        category: "Properties",
      },
      control: {
        type: "select",
      },
      options: [
        "bmb-box-shadow-1",
        "bmb-box-shadow-2",
        "bmb-box-shadow-3",
        "bmb-box-shadow-4",
        "bmb-box-shadow-5",
        "bmb-box-shadow-6",
      ],
    }
  },
  args: {
    shadowsName: "bmb-box-shadow-1" as string as unknown as InputSignal<string>,
  },
} as Meta<StorybookShadowsStoriesComponent>;

type Story = StoryObj<StorybookShadowsStoriesComponent>;

export const Default: Story = {};
