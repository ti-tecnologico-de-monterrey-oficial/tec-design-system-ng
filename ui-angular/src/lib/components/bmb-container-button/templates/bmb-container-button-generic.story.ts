// Kept as .story.ts to exclude this example from Storybook discovery.
// Restore .stories.ts and the MDX registration to show it again.
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';

const meta: Meta<BmbContainerButtonBaseComponent> = {
  title: 'Templates/Container Button/Custome example',
  component: BmbContainerButtonBaseComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BmbContainerButtonBaseComponent, BmbVerticalLayoutDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Compose a container button using bmbContainerMain and the optional bmbContainerLeft and bmbContainerRight template slots. Replace their content with Bamboo elements. The base button provides padding, border, background, and interaction states.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<BmbContainerButtonBaseComponent>;

const template = `<bmb-container-button-base>
  <ng-template #bmbContainerLeft>
    <span class="font-regular-3">Left content</span>
  </ng-template>
  <ng-template #bmbContainerMain>
    <div bmbVerticalLayout gapSize="s" alignItems="start">
      <span class="font-regular-5">Main content</span>
      <span class="font-regular-3">Complementary text</span>
    </div>
  </ng-template>
  <ng-template #bmbContainerRight>
    <span class="font-regular-3">Right content</span>
  </ng-template>
</bmb-container-button-base>`;

export const Default: Story = {
  render: () => ({ template }),
  parameters: { docs: { source: { code: template, language: 'html' } } },
};
