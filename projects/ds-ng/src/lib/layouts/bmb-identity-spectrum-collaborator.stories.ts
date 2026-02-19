import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import {
  getGeneralDescription,
  getPageStructureForTemplateStories,
} from '../utils/doc/utils';
import { Component } from '@angular/core';

@Component({
  selector: 'storybook-identity-spectrum-collaborator',
  standalone: true,
  imports: [],
  template: '<p>example</p>',
})
export class StorybookIdentitySpectrumCollaborator {}
export default {
  title: 'Organisms/Identity spectrum/Collaborator',
  component: StorybookIdentitySpectrumCollaborator,
  tags: ['!autodocs'],
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 80rem;">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `${getGeneralDescription(`***Example***`, {
          isSubStory: true,
        })}`,
      },
    },
  },
} as Meta<typeof StorybookIdentitySpectrumCollaborator>;

type Story = StoryObj<StorybookIdentitySpectrumCollaborator>;

export const Default: Story = {
  render: (args) => ({
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-identity-spectrum-collaborator />
    `,
  }),
};
