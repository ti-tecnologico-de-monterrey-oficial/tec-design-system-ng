import { Component, inject, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbChatAttachmentsService } from './chat-attachments.service';
import { BmbChatBarComponent } from '../../components/bmb-chat-bar/bmb-chat-bar.component';
import { BmbAiChatBubbleComponent } from '../../components/bmb-ai-chat-bubble/bmb-ai-chat-bubble.component';
import type { BmbUploadFileMessage } from '../../components/bmb-ai-chat-bubble/types';

@Component({
  imports: [BmbChatBarComponent, BmbAiChatBubbleComponent],
  providers: [BmbChatAttachmentsService],
  template: `
    <bmb-ai-chat-bubble
      [message]="message"
      (retryUploadRequested)="retryCount = retryCount + 1"
    />
    @if (showBar()) {
      <bmb-chat-bar [(files)]="files" />
    }
  `,
})
class ConversationComponent {
  readonly attachments = inject(BmbChatAttachmentsService);
  readonly files = signal<File[]>([]);
  readonly showBar = signal(true);
  retryCount = 0;
  message: BmbUploadFileMessage = {
    id: 'request',
    type: 'upload-file',
    isUser: false,
    timestamp: new Date(),
    content: { fileName: 'document', acceptedFormats: ['.pdf'] },
  };
}

describe('Chat attachment coordination without a chat card', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationComponent],
    }).compileComponents();
  });

  it('should share a scoped service, preserve two-way files, and isolate another conversation', () => {
    const first = TestBed.createComponent(ConversationComponent);
    const second = TestBed.createComponent(ConversationComponent);
    first.detectChanges();
    second.detectChanges();
    const bubble = first.debugElement.query(
      By.directive(BmbAiChatBubbleComponent),
    );
    const bar = first.debugElement.query(By.directive(BmbChatBarComponent));
    expect(bubble.injector.get(BmbChatAttachmentsService)).toBe(
      first.componentInstance.attachments,
    );
    expect(bar.injector.get(BmbChatAttachmentsService)).toBe(
      first.componentInstance.attachments,
    );
    const file = new File(['document'], 'document.pdf', { lastModified: 1 });
    const input = first.nativeElement.querySelector(
      'bmb-upload-file-message input',
    );
    Object.defineProperty(input, 'files', { value: [file] });
    input.dispatchEvent(new Event('change'));
    first.detectChanges();
    expect(first.componentInstance.files()).toEqual([file]);
    expect(second.componentInstance.files()).toEqual([]);

    const chat = bar.componentInstance as BmbChatBarComponent;
    const send = jest.fn();
    chat.onSendFiles.subscribe(send);
    chat.handleSend();
    first.detectChanges();
    expect(send).toHaveBeenCalledWith([file]);
    expect(first.componentInstance.files()).toEqual([]);
    expect(
      first.componentInstance.attachments.result('request'),
    ).toBeUndefined();
    first.destroy();
    second.destroy();
  });

  it('should reject duplicate and oversized selections in the chat bar and preserve valid files', () => {
    const fixture = TestBed.createComponent(ConversationComponent);
    fixture.detectChanges();
    const bar = fixture.debugElement.query(By.directive(BmbChatBarComponent))
      .componentInstance as BmbChatBarComponent;
    const file = new File(['document'], 'document.pdf', { lastModified: 1 });
    fixture.componentInstance.files.set([file]);
    fixture.detectChanges();
    const large = new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.pdf');
    const input = fixture.nativeElement.querySelector('bmb-chat-bar input');
    Object.defineProperty(input, 'files', { value: [file, large] });
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.files()).toEqual([file]);
    expect(
      fixture.nativeElement.querySelector('bmb-chat-bar [role="alert"]'),
    ).toBeTruthy();
    bar.handleAttachmentChanges([]);
    fixture.detectChanges();
    expect(fixture.componentInstance.files()).toEqual([]);
    fixture.destroy();
  });

  it('should route interruption and retry without reopening the picker, then show upload success', () => {
    const fixture = TestBed.createComponent(ConversationComponent);
    fixture.detectChanges();
    fixture.componentInstance.attachments.reportUploadResult('request', {
      code: 'interrupted',
    });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(
        '.bmb_upload-file-message-alert-warning',
      ),
    ).toBeTruthy();
    fixture.nativeElement
      .querySelector('.bmb_upload-file-message-retry')
      .click();
    expect(fixture.componentInstance.retryCount).toBe(1);
    fixture.componentInstance.attachments.reportUploadResult('request');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(
        'bmb-upload-file-message [role="alert"]',
      ),
    ).toBeNull();
    expect(
      fixture.nativeElement.querySelector(
        'bmb-upload-file-message [role="status"]',
      ),
    ).toBeTruthy();
    fixture.destroy();
  });

  it('should unregister a destroyed chat bar and reconnect when a new one is created', () => {
    const fixture = TestBed.createComponent(ConversationComponent);
    fixture.detectChanges();
    fixture.componentInstance.showBar.set(false);
    fixture.detectChanges();
    const file = new File(['document'], 'document.pdf');
    expect(
      fixture.componentInstance.attachments.select([file], {}, 'pending')
        .errors,
    ).toEqual([]);
    fixture.componentInstance.showBar.set(true);
    fixture.detectChanges();
    expect(fixture.componentInstance.files()).toEqual([file]);
    fixture.destroy();
  });
});
