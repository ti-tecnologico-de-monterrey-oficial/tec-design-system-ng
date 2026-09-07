import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbAIChatCardComponent,
  BmbAiChatBubbleComponent,
  BmbChatBarComponent,
  type BmbChatActionEvent,
  type BmbChatMessage,
  type IBmbActionHeader,
  type IBmbChatOptionEvent,
  type IBotType,
  type IChatBarActions,
  type IBmbAIChatCardMode,
} from 'ui-angular';

@Component({
  selector: 'app-ai-chat-card-page',
  standalone: true,
  imports: [
    BmbAIChatCardComponent,
    BmbAiChatBubbleComponent,
    BmbChatBarComponent,
  ],
  templateUrl: './ai-chat-card-page.html',
  styleUrl: './ai-chat-card-page.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatCardPage {
  readonly modes: { value: IBmbAIChatCardMode; label: string }[] = [
    { value: 'chat', label: 'Chat' },
    { value: 'compact', label: 'Compact' },
    { value: 'expanded', label: 'Expanded' },
    { value: 'invisible', label: 'Invisible' },
  ];

  readonly mode = signal<IBmbAIChatCardMode>('expanded');
  readonly currentBot = signal<IBotType>({
    name: 'TecBot',
    label: 'Tecbot Standard',
    icon: 'bot_tecStandar',
  });

  readonly botList: IBotType[] = [
    { name: 'TecBot', label: 'Tecbot Standard', icon: 'bot_tecStandar' },
    { name: 'ChatGPT', label: 'ChatGPT', icon: 'bot_chatGPT' },
    { name: 'TecGPT', label: 'TecGPT', icon: 'bot_tecGPT' },
    { name: 'Comment', label: 'Comment', icon: 'comment' },
    { name: 'New', label: 'New', icon: 'new' },
    { name: 'BotSchool', label: 'Tecbot school', icon: 'bot_tecSchool' },
    { name: 'BotTech', label: 'Tecbot tech', icon: 'bot_tecTech' },
    { name: 'BotSport', label: 'Tecbot sport', icon: 'bot_tecSport' },
    { name: 'BotPhone', label: 'Tecbot phone', icon: 'bot_tecPhone' },
    { name: 'BotMedic', label: 'Tecbot health', icon: 'bot_health' },
    { name: 'BotScience', label: 'Tecbot science', icon: 'bot_tecScience' },
    { name: 'Empty', label: 'Empty', icon: 'empty' },
    { name: 'Anthropic', label: 'Anthropic', icon: 'anthropic' },
    { name: 'Meta', label: 'Meta', icon: 'meta' },
    { name: 'Xai', label: 'Xai', icon: 'xai' },
    { name: 'Google', label: 'Google', icon: 'google' },
  ];

  readonly headerActions: IBmbActionHeader[] = [
    {
      icon: 'chat_add_on',
      tooltipText: 'New chat',
      action: () => {
        console.info('New chat');
      },
    },
  ];

  readonly actionsList: IChatBarActions[] = [
    {
      name: 'Adjuntar archivo',
      label: 'Adjuntar archivo',
      icon: 'attach_file',
      action: () => {
        console.log('Adjuntar archivo');
      },
    },
  ];

  readonly messages: BmbChatMessage[] = [
    {
      id: '1',
      type: 'text',
      timestamp: new Date('2026-08-25T22:47:25.997Z'),
      isUser: true,
      userProfile: 'https://picsum.photos/id/64/200/300',
      content: { text: 'I need help with Angular signals.' },
    },
    {
      id: '2',
      type: 'options',
      timestamp: new Date('2026-08-25T01:28:13.313Z'),
      isUser: false,
      content: {
        text: 'Choose one option:',
        options: [
          { id: '1', label: 'Option for conversational text-based prompts 1' },
          { id: '2', label: 'Option for conversational text-based prompts 2' },
          { id: '3', label: 'Option for conversational text-based prompts 3' },
        ],
      },
    },
    {
      id: '3',
      type: 'text',
      timestamp: new Date('2026-08-25T22:47:25.997Z'),
      isUser: true,
      userProfile: 'https://picsum.photos/id/64/200/300',
      content: { text: 'I need help with Angular signals.' },
    },
    {
      id: '4',
      type: 'options',
      timestamp: new Date('2026-08-25T01:28:13.313Z'),
      isUser: false,
      content: {
        text: 'Choose one option:',
        options: [
          { id: '1', label: 'Option for conversational text-based prompts 1' },
          { id: '2', label: 'Option for conversational text-based prompts 2' },
          { id: '3', label: 'Option for conversational text-based prompts 3' },
        ],
      },
    },
    {
      id: '5',
      type: 'text',
      timestamp: new Date('2026-08-25T22:47:25.997Z'),
      isUser: true,
      userProfile: 'https://picsum.photos/id/64/200/300',
      content: { text: 'I need help with Angular signals.' },
    },
    {
      id: '6',
      type: 'options',
      timestamp: new Date('2026-08-25T01:28:13.313Z'),
      isUser: false,
      content: {
        text: 'Choose one option:',
        options: [
          { id: '1', label: 'Option for conversational text-based prompts 1' },
          { id: '2', label: 'Option for conversational text-based prompts 2' },
          { id: '3', label: 'Option for conversational text-based prompts 3' },
        ],
      },
    },
  ];

  selectMode(event: Event): void {
    this.mode.set(
      (event.target as HTMLSelectElement).value as IBmbAIChatCardMode,
    );
  }

  chatCard(): void {
    this.mode.set('chat');
  }

  getAction(event: BmbChatActionEvent): void {
    console.log('Action event received:', event);
  }

  getOptionClicked(event: IBmbChatOptionEvent): void {
    console.log('Option clicked event received:', event);
  }
}
