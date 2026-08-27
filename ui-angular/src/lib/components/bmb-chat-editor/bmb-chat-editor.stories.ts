import { Meta, StoryObj } from '@storybook/angular';
import { BmbChatEditorComponent } from './bmb-chat-editor.component';

export default {
  title: 'Components/Inputs/Chat Editor',
  component: BmbChatEditorComponent,
  args: {
    initialValue: 'In Angular 21, give me a guide for using signals and RxJS.',
    testId: 'chat-editor',
  },
} as Meta<typeof BmbChatEditorComponent>;

type Story = StoryObj<BmbChatEditorComponent>;

export const Default: Story = {};

export const Multiline: Story = {
  args: {
    initialValue: 'First line\nSecond line\nThird line',
  },
};
