import { Meta, StoryObj } from '@storybook/angular';
import { BmbAiChatEditorComponent } from './bmb-ai-chat-editor.component';

export default {
  title: 'Components/Inputs/AI Chat Editor',
  component: BmbAiChatEditorComponent,
  args: {
    initialValue: 'In Angular 21, give me a guide for using signals and RxJS.',
    testId: 'ai-chat-editor',
  },
} as Meta<typeof BmbAiChatEditorComponent>;

type Story = StoryObj<BmbAiChatEditorComponent>;

export const Default: Story = {};

export const Multiline: Story = {
  args: {
    initialValue: 'First line\nSecond line\nThird line',
  },
};
