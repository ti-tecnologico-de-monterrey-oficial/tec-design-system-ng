import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbChatBarComponent } from './bmb-chat-bar.component';
import { By } from '@angular/platform-browser';
import { BmbFileAttachmentPicker } from '../bmb-file-attachment/bmb-file-attachment.component';

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
    const attachment = fixture.debugElement.query(By.directive(BmbFileAttachmentPicker))
      .componentInstance as BmbFileAttachmentPicker;
    const files = [new File(['document'], 'document.txt', { type: 'text/plain' })];
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
    expect(fixture.nativeElement.querySelector('#inputFile')?.type).toBe('file');
  });

  it('should handle dropped files anywhere in the chat content', () => {
    const file = new File(['document'], 'document.txt', { type: 'text/plain' });
    const event = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'dataTransfer', { value: { files: [file] } });

    fixture.nativeElement.querySelector('.bmb_chat-bar-main').dispatchEvent(event);
    fixture.detectChanges();

    expect(component.files()).toEqual([file]);
    expect(event.defaultPrevented).toBe(true);
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
    const secondFile = new File(['second'], 'second.txt', { type: 'text/plain' });
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
    const secondFile = new File(['second'], 'second.txt', { type: 'text/plain' });
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
    expect(fixture.nativeElement.querySelector('input').hasAttribute('id')).toBe(false);
  });
});
