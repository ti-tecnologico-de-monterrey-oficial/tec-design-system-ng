import type { Meta, StoryObj } from '@storybook/angular';
import { BmbSearchCardComponent } from './bmb-search-card.component';

export default {
  title: 'Components/Containers/Search card',
  component: BmbSearchCardComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'computedResults',
          'handleResultClick',
          'inputSearchControl',
          'selectedTabId',
          'tabsData',
        ],
      },
      description: {},
    },
  },
  argTypes: {
    componentTitle: {
      control: 'text',
      description:
        'Title of the search card. If not provided, a default translated title will be used.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
        category: 'Properties',
      },
    },
    results: {
      control: 'object',
      description: 'Array of search results to display in the card.',
      table: {
        type: { summary: 'IBmbSearchCardItemResult[]' },
        defaultValue: { summary: '[]' },
        category: 'Properties',
      },
    },
    inputPlaceholder: {
      control: 'text',
      description:
        'Placeholder text for the search input field. If not provided, a default translated placeholder will be used.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
        category: 'Properties',
      },
    },
    triggerSearch: {
      action: 'triggerSearch',
      description: 'Event emitted when the search input value changes.',
      table: {
        type: { summary: 'EventEmitter<string>' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Indicates whether the search card is in a loading state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Properties',
      },
    },
    title: {
      control: null,
      description:
        'Please use `componentTitle` instead of `title` to set the component title.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: '',
      },
    },
  },
  args: {
    componentTitle: '',
    inputPlaceholder: '',
    triggerSearch: (value: string) => {
      console.log('Search triggered with value:', value);
    },
    isLoading: false,
    results: [],
  },
} as Meta<typeof BmbSearchCardComponent>;

type Story = StoryObj<BmbSearchCardComponent>;

export const Default: Story = {};
