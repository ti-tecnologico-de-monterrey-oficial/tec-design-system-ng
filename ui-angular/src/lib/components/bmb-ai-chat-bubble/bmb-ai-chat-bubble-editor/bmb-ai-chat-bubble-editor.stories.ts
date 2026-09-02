import { Meta, StoryObj } from '@storybook/angular';
import { BmbAiChatBubbleEditorComponent } from './bmb-ai-chat-bubble-editor.component';

export default {
  title: 'Components/Containers/AI Chat Bubble/Editor',
  tags: ['!autodocs'],
  component: BmbAiChatBubbleEditorComponent,
  args: {
    initialValue: 'In Angular 21, give me a guide for using signals and RxJS.',
    testId: 'ai-chat-bubble-editor',
  },
} as Meta<typeof BmbAiChatBubbleEditorComponent>;

type Story = StoryObj<BmbAiChatBubbleEditorComponent>;

export const Default: Story = {};

export const Multiline: Story = {
  args: {
    initialValue: 'First line\nSecond line\nThird line',
  },
};
