import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  type TemplateRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BmbActionIconComponent,
  BmbAIChatCardComponent,
  BmbAiChatBubbleComponent,
  BmbButtonDirective,
  BmbChatBarComponent,
  BmbChatAttachmentsService,
  BmbDropdownComponent,
  BmbFormValidatorComponent,
  BmbInputComponent,
  BmbLayoutDirective,
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
  BmbLayoutItemDirective,
  IBMB_AI_CHAT_CARD_MODE,
  type BmbChatMessage,
  type BmbChatAttachmentResult,
  type BmbUploadFileRequestEvent,
  type IBmbAIChatCardMode,
  BmbDividerComponent,
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
    BmbButtonDirective,
    BmbChatBarComponent,
    BmbDropdownComponent,
    BmbFormValidatorComponent,
    BmbDividerComponent,
    BmbInputComponent,
    BmbLayoutDirective,
    BmbLayoutGridDirective,
    BmbLayoutGridItemDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './ai-chat-card-attachment.html',
  styleUrl: './ai-chat-card-attachment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BmbChatAttachmentsService],
})
export class AIChatCardAttachment {
  readonly attachments = inject(BmbChatAttachmentsService);
  readonly acceptedFormats = signal(['.pdf', '.txt', '.csv', 'image/*']);
  readonly maxFileSize = signal(2);
  readonly configurationError = signal('');
  readonly configurationForm = new FormGroup({
    acceptedFormats: new FormControl(this.acceptedFormats().join(', '), {
      nonNullable: true,
    }),
    maxFileSize: new FormControl(2, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });
  readonly attachmentResults = signal<BmbChatAttachmentResult[]>([]);
  readonly retryCount = signal(0);
  readonly modes = Object.values(IBMB_AI_CHAT_CARD_MODE);
  readonly mode = signal<IBmbAIChatCardMode>(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
  readonly isExpanded = signal(true);
  readonly isLoading = signal(false);
  readonly files = signal<File[]>([]);
  readonly lastSentFiles = signal<File[]>([]);
  readonly submissions = signal<AttachmentSubmission[]>([]);
  readonly messages = signal<BmbChatMessage<TemplateRef<unknown>>[]>(
    this.createMessages(),
  );

  private nextSubmissionId = 0;
  private loadingTimer?: ReturnType<typeof setTimeout>;

  getConfigurationControl(name: string): FormControl {
    return this.configurationForm.get(name) as FormControl;
  }

  applyConfiguration(): void {
    if (this.configurationForm.invalid) {
      this.configurationError.set(
        'Maximum size must be a non-negative number in MB.',
      );
      return;
    }
    const values = this.configurationForm.getRawValue();
    const acceptedFormats = values.acceptedFormats.trim()
      ? values.acceptedFormats.split(',').map((format) => format.trim())
      : [];
    try {
      this.attachments.validateRules({
        acceptedFormats,
        maxFileSize: values.maxFileSize,
      });
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      this.configurationError.set(error.message);
      return;
    }
    this.configurationError.set('');
    this.acceptedFormats.set(acceptedFormats);
    this.maxFileSize.set(values.maxFileSize);
    this.messages.update((messages) =>
      messages.map((message) =>
        message.type === 'upload-file'
          ? {
              ...message,
              content: {
                ...message.content,
                acceptedFormats,
                maxFileSize: values.maxFileSize,
              },
            }
          : message,
      ),
    );
  }

  selectMode(value: unknown): void {
    if (typeof value === 'string' && this.modes.includes(value)) {
      this.mode.set(value as IBmbAIChatCardMode);
    }
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

    clearTimeout(this.loadingTimer);
    this.loadingTimer = setTimeout(() => {
      this.isLoading.set(false);
      this.loadingTimer = undefined;
    }, 2);
  }

  handleSendFiles(files: File[]): void {
    this.lastSentFiles.set([...files]);
  }

  handleAttachmentResult(result: BmbChatAttachmentResult): void {
    this.attachmentResults.update((results) => [...results, result]);
  }

  simulateUpload(interrupted: boolean): void {
    this.attachments.reportUploadResult(
      'attachment-request',
      interrupted ? { code: 'interrupted' } : undefined,
    );
    const result = this.attachments.result('attachment-request');
    if (result) this.handleAttachmentResult(result);
  }

  handleRetryUpload(event: BmbUploadFileRequestEvent): void {
    if (event.messageId === 'attachment-request') {
      this.retryCount.update((count) => count + 1);
    }
  }

  reset(): void {
    clearTimeout(this.loadingTimer);
    this.loadingTimer = undefined;
    this.attachments.clear('attachment-request');
    this.attachmentResults.set([]);
    this.retryCount.set(0);
    this.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    this.isExpanded.set(true);
    this.isLoading.set(false);
    this.files.set([]);
    this.lastSentFiles.set([]);
    this.submissions.set([]);
    this.messages.set(this.createMessages());
    this.nextSubmissionId = 0;
  }

  private createMessages(): BmbChatMessage<TemplateRef<unknown>>[] {
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
          acceptedFormats: this.acceptedFormats(),
          maxFileSize: this.maxFileSize(),
        },
      },
    ];
  }
}
