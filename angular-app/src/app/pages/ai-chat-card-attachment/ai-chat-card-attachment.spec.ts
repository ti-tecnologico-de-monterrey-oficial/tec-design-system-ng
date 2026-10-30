import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BmbAIChatCardComponent,
  BmbAiChatBubbleComponent,
  BmbChatBarComponent,
  BmbChatAttachmentsService,
  IBMB_AI_CHAT_CARD_MODE,
} from 'ui-angular';
import { AIChatCardAttachment } from './ai-chat-card-attachment';

describe('AIChatCardAttachment', () => {
  let fixture: ComponentFixture<AIChatCardAttachment>;
  let component: AIChatCardAttachment;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AIChatCardAttachment],
    }).compileComponents();

    fixture = TestBed.createComponent(AIChatCardAttachment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('AIChatCardAttachment rendered conversation', () => {
    it('should apply edited limits to the bubble and chat bar without clearing pending files', () => {
      const file = new File(['existing'], 'existing.pdf');
      component.files.set([file]);
      component.configurationForm.setValue({
        acceptedFormats: '.txt, image/*',
        maxFileSize: 0.5,
      });
      fixture.nativeElement
        .querySelector('form')
        .dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true }),
        );
      fixture.detectChanges();

      expect(component.acceptedFormats()).toEqual(['.txt', 'image/*']);
      expect(component.maxFileSize()).toBe(0.5);
      const message = component.messages()[0];
      expect(
        message.type === 'upload-file' && message.content.maxFileSize,
      ).toBe(0.5);
      const bar = fixture.debugElement.query(By.directive(BmbChatBarComponent))
        .componentInstance as BmbChatBarComponent;
      expect(bar.acceptedExtensions()).toEqual(['.txt', 'image/*']);
      expect(bar.maxFileSize()).toBe(0.5);
      expect(component.files()).toEqual([file]);
      selectFiles([new File(['bad'], 'invalid.pdf')]);
      expect(component.attachmentResults()[0].errors[0].code).toBe('format');
    });

    it('should retain active limits and display invalid configuration errors', () => {
      component.configurationForm.setValue({
        acceptedFormats: 'pdf',
        maxFileSize: 2,
      });
      component.applyConfiguration();
      fixture.detectChanges();
      expect(component.maxFileSize()).toBe(2);
      expect(component.acceptedFormats()).toContain('.pdf');
      expect(
        fixture.nativeElement.querySelector('form + p + p[role="alert"]'),
      ).toBeTruthy();
      component.configurationForm.setValue({
        acceptedFormats: '.pdf',
        maxFileSize: -1,
      });
      component.applyConfiguration();
      expect(component.maxFileSize()).toBe(2);
      expect(component.configurationError()).toContain('non-negative');
    });

    it('should allow unrestricted formats and a zero size limit', () => {
      component.configurationForm.setValue({
        acceptedFormats: '',
        maxFileSize: 0,
      });
      component.applyConfiguration();
      fixture.detectChanges();
      expect(component.acceptedFormats()).toEqual([]);
      expect(component.maxFileSize()).toBe(0);
      selectFiles([new File(['x'], 'document.any')]);
      expect(component.attachmentResults()[0].errors[0].code).toBe('size');
    });

    function selectFiles(files: File[]): void {
      const input: HTMLInputElement = fixture.nativeElement.querySelector(
        'bmb-upload-file-message input',
      );
      Object.defineProperty(input, 'files', {
        value: files,
        configurable: true,
      });
      input.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }

    it('should show bubble attachments in the projected chat bar and page inspector', () => {
      const file = new File(['document'], 'evidence.pdf', {
        type: 'application/pdf',
        lastModified: 1,
      });
      selectFiles([file]);

      const card = fixture.debugElement.query(
        By.directive(BmbAIChatCardComponent),
      );
      const chatBar = fixture.debugElement.query(
        By.directive(BmbChatBarComponent),
      );
      expect(card).toBeTruthy();
      expect(chatBar.injector.get(BmbChatAttachmentsService)).toBe(
        component.attachments,
      );
      expect(component.files()).toEqual([file]);
      expect(
        fixture.nativeElement.querySelector('bmb-ai-chat-card bmb-chat-bar')
          .textContent,
      ).toContain('evidence.pdf');
      expect(
        fixture.nativeElement.querySelector('.attachment-page-inspector')
          .textContent,
      ).toContain('evidence.pdf');
      expect(component.attachmentResults()[0].status).toBe('selected');
    });

    it('should display format, duplicate and size errors while retaining valid attachments', () => {
      const valid = new File(['document'], 'evidence.pdf', { lastModified: 1 });
      selectFiles([
        valid,
        valid,
        new File(['bad'], 'invalid.xps'),
        new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.pdf'),
      ]);

      expect(component.files()).toEqual([valid]);
      expect(
        component.attachmentResults()[0].errors.map((error) => error.code),
      ).toEqual(['duplicate', 'format', 'size']);
      expect(
        fixture.nativeElement.querySelector(
          'bmb-upload-file-message [role="alert"]',
        ),
      ).toBeTruthy();
      const inspector = fixture.nativeElement.querySelector(
        '.attachment-page-inspector',
      ).textContent;
      expect(inspector).toContain('invalid.xps');
      expect(inspector).toContain('large.pdf');
    });

    it('should send attachments, retain them for retry and render simulated interruption and success', () => {
      const file = new File(['document'], 'evidence.pdf');
      selectFiles([file]);
      const chatBar = fixture.debugElement.query(
        By.directive(BmbChatBarComponent),
      ).componentInstance as BmbChatBarComponent;
      chatBar.handleSend();
      fixture.detectChanges();
      expect(component.lastSentFiles()).toEqual([file]);
      expect(component.files()).toEqual([]);
      expect(component.submissions()[0].files).toEqual([file]);

      component.simulateUpload(true);
      fixture.detectChanges();
      fixture.nativeElement
        .querySelector('.bmb_upload-file-message-retry')
        .click();
      expect(component.retryCount()).toBe(1);
      expect(component.lastSentFiles()).toEqual([file]);
      component.simulateUpload(false);
      fixture.detectChanges();
      expect(component.attachments.result('attachment-request')?.status).toBe(
        'uploaded',
      );
      expect(
        fixture.nativeElement.querySelector(
          'bmb-upload-file-message [role="alert"]',
        ),
      ).toBeNull();
    });

    it('should reset the shared draft, validation results and retry counter', () => {
      selectFiles([new File(['bad'], 'invalid.xps')]);
      component.simulateUpload(true);
      fixture.detectChanges();
      fixture.nativeElement
        .querySelector('.bmb_upload-file-message-retry')
        .click();

      component.reset();
      fixture.detectChanges();

      expect(component.files()).toEqual([]);
      expect(component.attachmentResults()).toEqual([]);
      expect(component.retryCount()).toBe(0);
      expect(
        component.attachments.result('attachment-request'),
      ).toBeUndefined();
      expect(
        fixture.nativeElement.querySelector(
          'bmb-upload-file-message [role="alert"]',
        ),
      ).toBeNull();
    });
  });

  it('should start expanded with a document request and no files', () => {
    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    expect(component.isExpanded()).toBe(true);
    expect(component.files()).toEqual([]);
    expect(component.messages()).toHaveLength(1);
    expect(component.messages()[0].type).toBe('upload-file');
  });

  it('should render each sent message in its own bubble', () => {
    component.handleSendMessage('First message');
    fixture.detectChanges();
    component.handleSendMessage('Second message');
    fixture.detectChanges();

    const bubbles = fixture.debugElement.queryAll(
      By.directive(BmbAiChatBubbleComponent),
    );
    expect(bubbles).toHaveLength(3);
    expect(
      bubbles.map(({ componentInstance }) => componentInstance.message().id),
    ).toEqual(['attachment-request', 'submission-1', 'submission-2']);
  });

  it('should record a snapshot of the pending files when a message is sent', () => {
    const file = new File(['document'], 'document.pdf', {
      type: 'application/pdf',
    });
    component.files.set([file]);

    component.handleSendMessage('  Supporting document  ');
    component.files.set([]);

    expect(component.submissions()).toEqual([
      { id: 1, text: 'Supporting document', files: [file] },
    ]);
    const lastMessage = component.messages()[1];
    expect(lastMessage.isUser).toBe(true);
    expect(lastMessage.content).toEqual({
      text: 'Supporting document\ndocument.pdf',
    });
  });

  it('should record submissions that contain only files', () => {
    const file = new File(['document'], 'document.txt');
    component.files.set([file]);

    component.handleSendMessage('');

    expect(component.submissions()).toEqual([
      { id: 1, text: '', files: [file] },
    ]);
  });

  it('should ignore submissions with no text or files', () => {
    component.handleSendMessage('   ');

    expect(component.submissions()).toEqual([]);
    expect(component.messages()).toHaveLength(1);
  });

  it('should retain the files emitted by onSendFiles independently of pending files', () => {
    const files = [new File(['document'], 'document.pdf')];

    component.handleSendFiles(files);
    files.length = 0;

    expect(component.lastSentFiles().map((file) => file.name)).toEqual([
      'document.pdf',
    ]);
  });

  it('should release the loading state after 2 milliseconds', () => {
    jest.useFakeTimers();
    try {
      component.handleSendMessage('Message');
      component.isLoading.set(true);

      jest.advanceTimersByTime(1);
      expect(component.isLoading()).toBe(true);

      jest.advanceTimersByTime(1);

      expect(component.isLoading()).toBe(false);
    } finally {
      jest.useRealTimers();
    }
  });

  it('should update the selected mode', () => {
    const select = document.createElement('select');
    const option = document.createElement('option');
    option.value = IBMB_AI_CHAT_CARD_MODE.INVISIBLE;
    select.appendChild(option);
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: select });

    component.selectMode(event);

    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.INVISIBLE);
  });

  it('should reset files, conversation, submission numbering, and mode', () => {
    const file = new File(['document'], 'document.pdf');
    component.files.set([file]);
    component.handleSendMessage('Message');
    component.handleSendFiles([file]);
    component.mode.set(IBMB_AI_CHAT_CARD_MODE.INVISIBLE);
    component.isExpanded.set(false);
    component.isLoading.set(true);

    component.reset();

    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    expect(component.isExpanded()).toBe(true);
    expect(component.isLoading()).toBe(false);
    expect(component.files()).toEqual([]);
    expect(component.lastSentFiles()).toEqual([]);
    expect(component.submissions()).toEqual([]);
    expect(component.messages()).toHaveLength(1);

    component.handleSendMessage('New message');
    expect(component.submissions()[0].id).toBe(1);
  });
});
