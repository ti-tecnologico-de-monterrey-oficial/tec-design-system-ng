import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbActionIconComponent,
  BmbAIChatCardComponent,
  BmbAiChatBubbleComponent,
  BmbChatBarComponent,
  defaultActionList,
  IBMB_AI_CHAT_CARD_MODE,
  type BmbChatMessage,
  type IBmbAIChatCardMode,
} from 'ui-angular';

interface AttachmentSubmission {
  id: number;
  text: string;
  files: File[];
}

@Component({
  selector: 'app-ai-chat-card-attachment',
  standalone: true,
  imports: [
    BmbActionIconComponent,
    BmbAIChatCardComponent,
    BmbAiChatBubbleComponent,
    BmbChatBarComponent,
  ],
  templateUrl: './ai-chat-card-attachment.html',
  styleUrl: './ai-chat-card-attachment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AIChatCardAttachment {
  readonly modes = Object.values(IBMB_AI_CHAT_CARD_MODE);
  readonly mode = signal<IBmbAIChatCardMode>(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
  readonly isExpanded = signal(true);
  readonly isLoading = signal(false);
  readonly files = signal<File[]>([]);
  readonly lastSentFiles = signal<File[]>([]);
  readonly submissions = signal<AttachmentSubmission[]>([]);
  readonly messages = signal<BmbChatMessage[]>(this.createMessages());
  readonly actionsList = defaultActionList.map((action) => ({
    ...action,
    name: 'Attach files',
    label: 'Attach files',
  }));

  private nextSubmissionId = 0;

  selectMode(event: Event): void {
    this.mode.set((event.target as HTMLSelectElement).value as IBmbAIChatCardMode);
  }

  handleSendMessage(message: string): void {
    const text = message?.trim() ?? '';
    const files = [...this.files()];

    if (text || files.length) {
      const id = ++this.nextSubmissionId;
      this.submissions.update((submissions) => [
        ...submissions,
        { id, text, files },
      ]);
      this.messages.update((messages) => [
        ...messages,
        {
          id: `submission-${id}`,
          type: 'text',
          isUser: true,
          userProfile: '/img/01.jpeg',
          timestamp: new Date(),
          content: {
            text: [text, ...files.map((file) => file.name)]
              .filter(Boolean)
              .join('\n'),
          },
        },
      ]);
    }

    queueMicrotask(() => this.isLoading.set(false));
  }

  handleSendFiles(files: File[]): void {
    this.lastSentFiles.set([...files]);
  }

  reset(): void {
    this.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    this.isExpanded.set(true);
    this.isLoading.set(false);
    this.files.set([]);
    this.lastSentFiles.set([]);
    this.submissions.set([]);
    this.messages.set(this.createMessages());
    this.nextSubmissionId = 0;
  }

  private createMessages(): BmbChatMessage[] {
    return [
      {
        id: 'attachment-request',
        type: 'upload-file',
        isUser: false,
        timestamp: new Date(),
        content: {
          fileName: 'Supporting document',
          text: 'Please attach your supporting document.',
          buttonLabel: 'Select document',
          acceptedFormats: ['.pdf', '.txt', '.csv', 'image/*'],
        },
      },
    ];
  }
}
