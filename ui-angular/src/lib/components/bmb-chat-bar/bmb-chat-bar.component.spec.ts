import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbChatBarComponent } from './bmb-chat-bar.component';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import { BmbProjectionContentService } from '../../services/projection/projection.service';

describe('BmbChatBarComponent', () => {
  let component: BmbChatBarComponent;
  let fixture: ComponentFixture<BmbChatBarComponent>;
  const modal = {
    openModal: jest.fn(() => 'bot-selector'),
    closeModal: jest.fn(),
  };
  const projection = { openContent: jest.fn(), closeContent: jest.fn() };
  const originalWidth = window.innerWidth;
  const originalObjectURL = Object.getOwnPropertyDescriptor(
    URL,
    'createObjectURL',
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbChatBarComponent],
      providers: [
        { provide: BmbNativeModalService, useValue: modal },
        { provide: BmbProjectionContentService, useValue: projection },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbChatBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (originalObjectURL)
      Object.defineProperty(URL, 'createObjectURL', originalObjectURL);
    else Reflect.deleteProperty(URL, 'createObjectURL');
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: originalWidth,
    });
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends text and attachments, then resets the composer', () => {
    const message = jest.spyOn(component.onSendMessage, 'emit');
    const attachments = jest.spyOn(component.onSendFiles, 'emit');
    const file = new File(['report'], 'report.txt');
    component.control.setValue('Please review');
    component.files = [file];
    component.handleSend();
    expect(message).toHaveBeenCalledWith('Please review');
    expect(attachments).toHaveBeenCalledWith([file]);
    expect(component.files).toEqual([]);
    expect(component.control.value).toBeNull();
    expect(component.isLoading()).toBe(true);
    expect(component.textareaRef.nativeElement.style.height).toBe(
      'calc(1lh + 2rem)',
    );
  });

  it('sends Enter without shift, leaving Shift+Enter and other keys alone', () => {
    const attachments = jest.spyOn(component.onSendFiles, 'emit');
    const message = jest.spyOn(component.onSendMessage, 'emit');
    for (const event of [
      new KeyboardEvent('keydown', {
        key: 'Enter',
        shiftKey: true,
        cancelable: true,
      }),
      new KeyboardEvent('keydown', { key: 'a', cancelable: true }),
    ]) {
      component.handleKeyDown(event);
      expect(event.defaultPrevented).toBe(false);
    }
    component.control.setValue('Hello');
    const enter = new KeyboardEvent('keydown', {
      key: 'Enter',
      cancelable: true,
    });
    component.handleKeyDown(enter);
    expect(enter.defaultPrevented).toBe(true);
    expect(message).toHaveBeenCalledWith('Hello');
    expect(attachments).not.toHaveBeenCalled();
  });

  it('synchronizes loading and disabled states with the form control', () => {
    component.isLoading.set(true);
    fixture.detectChanges();
    expect(component.control.disabled).toBe(true);
    component.isLoading.set(false);
    component.disabledInput.set(true);
    fixture.detectChanges();
    expect(component.control.disabled).toBe(true);
    component.disabledInput.set(false);
    fixture.detectChanges();
    expect(component.control.enabled).toBe(true);
  });

  it('opens and dismisses the desktop bot selector', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1200,
    });
    component.handleDialog();
    expect(component.isDialogOpen()).toBe(true);
    component.handleDialog();
    expect(component.isDialogOpen()).toBe(false);
    component.handleDialog();
    component.handleClickOutside();
    expect(component.isDialogOpen()).toBe(false);
    const bot = component.botList()[0];
    component.handleChangeBot(bot);
    expect(component.currentBot()).toEqual(bot);
  });

  it('uses a modal for mobile bot selection and closes it after selection', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 600,
    });
    component.handleDialog();
    expect(modal.openModal).toHaveBeenCalledWith(
      expect.objectContaining({
        content: component.mobileBotSelectorTemplate,
        size: 'small',
      }),
    );
    expect(component.modalID()).toBe('bot-selector');
    const bot = component.botList()[0];
    component.handleMobileChangeBot(bot);
    expect(modal.closeModal).toHaveBeenCalledWith('bot-selector');
    expect(component.modalID()).toBeNull();
    expect(component.currentBot()).toEqual(bot);
  });

  it('does not open a selector when there are no bots', () => {
    fixture.componentRef.setInput('botList', []);
    component.handleDialog();
    expect(component.isDialogOpen()).toBe(false);
    expect(component.totalDots()).toBe(0);
    expect(modal.openModal).not.toHaveBeenCalled();
  });

  it('ignores bot selection while an asynchronous bot list is unavailable', () => {
    fixture.componentRef.setInput('botList', undefined);
    component.handleDialog();
    expect(component.isDialogOpen()).toBe(false);
    expect(modal.openModal).not.toHaveBeenCalled();
  });

  it('emits microphone and emoji actions and stops bot speech', () => {
    const record = jest.spyOn(component.onRecord, 'emit');
    const emoji = jest.spyOn(component.onEmoji, 'emit');
    component.handleMic();
    expect(component.showMicControls).toBe(true);
    expect(record).toHaveBeenLastCalledWith(true);
    component.handleStopMic();
    expect(component.showMicControls).toBe(false);
    expect(record).toHaveBeenLastCalledWith(false);
    component.handleRecord();
    expect(record).toHaveBeenLastCalledWith(true);
    component.handleEmoji();
    expect(emoji).toHaveBeenCalledWith(true);
    component.isBotSpeaking.set(true);
    component.handleDisableBotSpeaking();
    expect(component.isBotSpeaking()).toBe(false);
    component.handleDotPress(2);
    expect(component.activeDot).toBe(2);
  });

  it('projects the attachment menu relative to its trigger', () => {
    const trigger = document.createElement('button');
    component.handleAddDialog({ target: trigger } as unknown as MouseEvent);
    expect(projection.openContent).toHaveBeenCalledWith({
      content: component.chatBarTemplate,
      targetRef: trigger,
      fixSizeToRef: false,
    });
  });

  it('adds dropped images and documents with matching thumbnails', () => {
    const image = new File(['image'], 'photo.png', { type: 'image/png' });
    const document = new File(['text'], 'notes.txt', { type: 'text/plain' });
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      writable: true,
      value: jest.fn(() => 'blob:photo'),
    });
    const preventDefault = jest.fn();
    component.onDragOver({ preventDefault });
    expect(component.onDragFiles).toBe(true);
    component.onDragLeave({ preventDefault });
    expect(component.onDragFiles).toBe(false);
    component.onDrop({
      preventDefault,
      dataTransfer: { files: [image, document] },
    });
    expect(preventDefault).toHaveBeenCalledTimes(3);
    expect(component.files).toEqual([image, document]);
    expect(component.arrayThumbnail).toEqual(['blob:photo', '']);
    expect(component.onDragFiles).toBe(false);
    component.deleteFile(0);
    expect(component.files).toEqual([document]);
    expect(component.arrayThumbnail).toEqual(['']);
  });

  it('adds selected images and documents and closes the menu', () => {
    const image = new File(['image'], 'photo.png', { type: 'image/png' });
    const document = new File(['text'], 'notes.txt', { type: 'text/plain' });
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      writable: true,
      value: jest.fn(() => 'blob:selected'),
    });
    component.onFileSelect({ target: { files: [image, document] } });
    expect(component.files).toEqual([image, document]);
    expect(component.arrayThumbnail).toEqual(['blob:selected', '']);
    expect(projection.closeContent).toHaveBeenCalled();
  });

  it('resizes the textarea to fit its content', () => {
    Object.defineProperty(component.textareaRef.nativeElement, 'scrollHeight', {
      configurable: true,
      value: 120,
    });
    component.autoResize();
    expect(component.textareaRef.nativeElement.style.height).toBe('120px');
  });
});
