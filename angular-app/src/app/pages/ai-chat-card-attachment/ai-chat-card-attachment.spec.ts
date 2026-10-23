import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IBMB_AI_CHAT_CARD_MODE } from 'ui-angular';
import { AIChatCardAttachment } from './ai-chat-card-attachment';

describe('AIChatCardAttachment', () => {
  let fixture: ComponentFixture<AIChatCardAttachment>;
  let component: AIChatCardAttachment;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AIChatCardAttachment],
    })
      .overrideComponent(AIChatCardAttachment, {
        set: { imports: [], template: '' },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AIChatCardAttachment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start expanded with a document request and no files', () => {
    expect(component.mode()).toBe(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
    expect(component.isExpanded()).toBe(true);
    expect(component.files()).toEqual([]);
    expect(component.messages()).toHaveLength(1);
    expect(component.messages()[0].type).toBe('upload-file');
  });

  it('should record a snapshot of the pending files when a message is sent', () => {
    const file = new File(['document'], 'document.pdf', { type: 'application/pdf' });
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

    expect(component.submissions()).toEqual([{ id: 1, text: '', files: [file] }]);
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

    expect(component.lastSentFiles().map((file) => file.name)).toEqual(['document.pdf']);
  });

  it('should release the loading state after the send handler completes', async () => {
    component.handleSendMessage('Message');
    component.isLoading.set(true);

    await Promise.resolve();

    expect(component.isLoading()).toBe(false);
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
