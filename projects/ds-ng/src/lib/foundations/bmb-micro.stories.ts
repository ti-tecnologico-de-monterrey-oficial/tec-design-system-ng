import { Meta, StoryFn } from '@storybook/angular';

export default {
  title: 'Foundations/Micro CSS',
  parameters: {
    docs: {
      description: {
        component: `
This is a CSS file that contains a set of micro CSS classes that can be used to style HTML elements.

These classes are designed to be used without Angular and Bamboo UI components.

# Content added

- CSS variables
- Fonts
- CSS variables colors
- CSS variables colors named
- Reset
- CSS variables spacing
- Column system

## Components added:

- \`bmb-tooltip\`
- \`bmb-buttons\`
- \`bmb-button-group\`
- \`bmb-accordion\`
- \`bmb-advertisement-card\`
- \`bmb-badge\`
- \`bmb-card\`
- \`bmb-checkbox\`
- \`bmb-chevron-title-selector\`
- \`bmb-divider\`
- \`bmb-icon\`
- \`bmb-iframe\`
- \`bmb-input\`
- \`bmb-toast\`

You can find this CSS file on the NPM package \`/@ti-tecnologico-de-monterrey-oficial/ds-ng/assets/styles/micro.min.css\`.

Alternatively, you can find it on the Bamboo UI repository on the path [Bamboo Github](https://github.com/ti-tecnologico-de-monterrey-oficial/tec-design-system-ng/tree/develop/projects/ds-ng/src/lib/fundations/micro.min.css).

`,
      },
    },
  },
} as Meta;

export const Default = {};
