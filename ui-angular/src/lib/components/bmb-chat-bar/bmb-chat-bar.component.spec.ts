import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbChatBarComponent } from './bmb-chat-bar.component';
import { By } from '@angular/platform-browser';
import { BmbFileAttachmentPicker } from '../bmb-file-attachment-picker/bmb-file-attachment-picker.component';

describe('BmbChatBarComponent', () => {
  let component: BmbChatBarComponent;
  let fixture: ComponentFixture<BmbChatBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbChatBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbChatBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send attached files through the existing output and clear them', () => {
    const attachment = fixture.debugElement.query(
      By.directive(BmbFileAttachmentPicker),
    ).componentInstance as BmbFileAttachmentPicker;
    const files = [
      new File(['document'], 'document.txt', { type: 'text/plain' }),
    ];
    const sendFiles = jest.fn();
    const sendMessage = jest.fn();
    component.onSendFiles.subscribe(sendFiles);
    component.onSendMessage.subscribe(sendMessage);

    attachment.files.set(files);
    component.control.setValue('Message');
    fixture.detectChanges();
    component.handleSend();
    fixture.detectChanges();

    expect(sendFiles).toHaveBeenCalledWith(files);
    expect(sendMessage).toHaveBeenCalledWith('Message');
    expect(attachment.files()).toEqual([]);
  });

  it('should keep the existing file input available to attachment actions', () => {
    expect(fixture.nativeElement.querySelector('#inputFile')?.type).toBe(
      'file',
    );
  });

  it('should handle dropped files anywhere in the chat content', () => {
    fixture.componentRef.setInput('allowAttachments', true);
    fixture.detectChanges();
    const file = new File(['document'], 'document.txt', { type: 'text/plain' });
    const event = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'dataTransfer', { value: { files: [file] } });

    fixture.nativeElement
      .querySelector('.bmb_chat-bar-main')
      .dispatchEvent(event);
    fixture.detectChanges();

    expect(component.files()).toEqual([file]);
    expect(event.defaultPrevented).toBe(true);
  });

  it('should use the attachment picker as the chat bar container', () => {
    const container = fixture.nativeElement.querySelector(
      '.bmb_chat-bar-container',
    );

    expect(container.tagName).toBe('BMB-FILE-ATTACHMENT-PICKER');
    expect(container.getAttribute('tabindex')).toBe('0');
  });

  it('should ignore dropped files and disable the input when attachments are not allowed', () => {
    const file = new File(['document'], 'document.txt', { type: 'text/plain' });
    const event = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'dataTransfer', { value: { files: [file] } });
    const container = fixture.nativeElement.querySelector(
      '.bmb_chat-bar-container',
    );

    container.dispatchEvent(new Event('dragover', { cancelable: true }));
    fixture.nativeElement
      .querySelector('.bmb_chat-bar-main')
      .dispatchEvent(event);
    fixture.detectChanges();

    expect(component.files()).toEqual([]);
    expect(event.defaultPrevented).toBe(false);
    expect(
      container.classList.contains('bmb_file-attachment-picker-dragging'),
    ).toBe(false);
    expect(fixture.nativeElement.querySelector('#inputFile').disabled).toBe(
      true,
    );
  });

  describe('allowAttachments', () => {
    const customAction = { name: 'Help', icon: 'help', action: jest.fn() };
    const menuActions = () =>
      (
        component as unknown as { menuActions: () => { icon: string }[] }
      ).menuActions();

    it('should not show the attach button by default', () => {
      expect(
        fixture.nativeElement.querySelector('.bmb_chat-bar-attach'),
      ).toBeNull();
    });

    it('should show an attach button that opens the file picker when there are no actions', () => {
      fixture.componentRef.setInput('allowAttachments', true);
      fixture.detectChanges();
      const click = jest.spyOn(
        fixture.nativeElement.querySelector('#inputFile'),
        'click',
      );

      fixture.nativeElement
        .querySelector('.bmb_chat-bar-attach button')
        .click();

      expect(
        fixture.nativeElement.querySelector('.bmb_chat-bar-add'),
      ).toBeNull();
      expect(click).toHaveBeenCalledTimes(1);
    });

    it('should add the attach option first in the actions menu when there are actions', () => {
      fixture.componentRef.setInput('allowAttachments', true);
      fixture.componentRef.setInput('actionsList', [customAction]);
      fixture.detectChanges();
      const click = jest.spyOn(
        fixture.nativeElement.querySelector('#inputFile'),
        'click',
      );

      expect(
        fixture.nativeElement.querySelector('.bmb_chat-bar-attach'),
      ).toBeNull();
      expect(
        fixture.nativeElement.querySelector('.bmb_chat-bar-add'),
      ).not.toBeNull();
      expect(menuActions().map(({ icon }) => icon)).toEqual([
        'upload_file',
        'help',
      ]);

      (menuActions()[0] as unknown as { action: () => void }).action();
      expect(click).toHaveBeenCalledTimes(1);
    });

    it('should keep the actions list unchanged when attachments are disabled', () => {
      fixture.componentRef.setInput('actionsList', [customAction]);
      fixture.detectChanges();

      expect(menuActions()).toEqual([customAction]);
    });
  });
});

describe('BmbFileAttachment', () => {
  let component: BmbFileAttachmentPicker;
  let fixture: ComponentFixture<BmbFileAttachmentPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbFileAttachmentPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbFileAttachmentPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should append selected files, notify consumers and reset the input', () => {
    const firstFile = new File(['first'], 'first.txt', { type: 'text/plain' });
    const secondFile = new File(['second'], 'second.txt', {
      type: 'text/plain',
    });
    const selected = jest.fn();
    component.filesSelected.subscribe(selected);
    component.files.set([firstFile]);
    const input = fixture.nativeElement.querySelector('input');
    Object.defineProperty(input, 'files', { value: [secondFile] });

    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.files()).toEqual([firstFile, secondFile]);
    expect(selected).toHaveBeenCalledWith([secondFile]);
    expect(input.value).toBe('');
    expect(fixture.nativeElement.textContent).toContain('second.txt');
  });

  it('should remove only the selected attachment', () => {
    const firstFile = new File(['first'], 'first.txt', { type: 'text/plain' });
    const secondFile = new File(['second'], 'second.txt', {
      type: 'text/plain',
    });
    component.files.set([firstFile, secondFile]);

    component.deleteFile(0);
    fixture.detectChanges();

    expect(component.files()).toEqual([secondFile]);
  });

  it('should open its own file picker', () => {
    fixture.componentRef.setInput('inputId', 'anotherFileInput');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('#anotherFileInput');
    const click = jest.spyOn(input, 'click');

    component.openFilePicker();

    expect(click).toHaveBeenCalledTimes(1);
  });

  it('should update drag state and reset it after dropping files', () => {
    const host = fixture.nativeElement;
    host.dispatchEvent(new Event('dragover', { cancelable: true }));
    expect(component.onDragFiles()).toBe(true);

    host.dispatchEvent(new Event('dragleave', { cancelable: true }));
    expect(component.onDragFiles()).toBe(false);

    host.dispatchEvent(new Event('dragover', { cancelable: true }));
    host.dispatchEvent(new Event('drop', { cancelable: true }));
    expect(component.onDragFiles()).toBe(false);
    expect(component.files()).toEqual([]);
  });

  it('should not assign a shared input id to standalone instances', () => {
    expect(
      fixture.nativeElement.querySelector('input').hasAttribute('id'),
    ).toBe(false);
  });

  it('should reflect files and drag state as host classes', () => {
    const host: HTMLElement = fixture.nativeElement;
    component.files.set([new File(['a'], 'a.txt', { type: 'text/plain' })]);
    host.dispatchEvent(new Event('dragover', { cancelable: true }));
    fixture.detectChanges();

    expect(
      host.classList.contains('bmb_file-attachment-picker-has-files'),
    ).toBe(true);
    expect(host.classList.contains('bmb_file-attachment-picker-dragging')).toBe(
      true,
    );
  });

  it('should ignore picker, selection and drag events when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    const input = host.querySelector('input') as HTMLInputElement;
    const click = jest.spyOn(input, 'click');
    const selected = jest.fn();
    component.filesSelected.subscribe(selected);
    Object.defineProperty(input, 'files', {
      value: [new File(['a'], 'a.txt', { type: 'text/plain' })],
    });

    component.openFilePicker();
    input.dispatchEvent(new Event('change'));
    const dragOver = new Event('dragover', { cancelable: true });
    host.dispatchEvent(dragOver);
    fixture.detectChanges();

    expect(click).not.toHaveBeenCalled();
    expect(selected).not.toHaveBeenCalled();
    expect(component.files()).toEqual([]);
    expect(component.onDragFiles()).toBe(false);
    expect(dragOver.defaultPrevented).toBe(false);
    expect(input.disabled).toBe(true);
    expect(host.classList.contains('bmb_file-attachment-picker-disabled')).toBe(
      true,
    );
  });
});
