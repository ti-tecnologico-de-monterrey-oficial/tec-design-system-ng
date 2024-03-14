import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbTitleSectionComponent } from '../bmb-title-section/bmb-title-section.component';
import { BmbHomeSectionComponent } from './bmb-home-section.component';

export default {
  title: 'Home Section',
  component: BmbHomeSectionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BmbIconComponent,
        BmbContainerComponent,
        BmbTitleSectionComponent,
      ],
    }),
  ],
  argTypes: {
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'The title of the home section.',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons.',
      table: {
        type: { summary: 'string' },
      },
    },
    link: {
      name: 'Link',
      control: {
        type: 'text',
      },
      description: 'The link for redirection to another page.',
      table: {
        type: { summary: 'string' },
      },
    },
    target: {
      name: 'Target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'The target attribute for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    title: 'Section name',
    icon: 'chevron_right',
    target: '_blank',
    link: 'https://www.youtube.com/',
  },
} as Meta<typeof BmbHomeSectionComponent>;

type Story = StoryObj<BmbHomeSectionComponent>;

export const Default: Story = {};
