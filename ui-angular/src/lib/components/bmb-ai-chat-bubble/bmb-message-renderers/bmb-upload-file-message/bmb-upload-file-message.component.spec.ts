import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbUploadFileMessageComponent } from './bmb-upload-file-message.component';
import type { BmbUploadFileMessage } from '../../types';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { BmbFileAttachmentPicker } from '../../../bmb-file-attachment-picker/bmb-file-attachment-picker.component';
import { BmbToastComponent } from '../../../bmb-toast/bmb-toast.component';

describe('BmbUploadFileMessageComponent', () => {
  let fixture: ComponentFixture<BmbUploadFileMessageComponent>;
  const message: BmbUploadFileMessage = {
    id: 'upload-1',
    type: 'upload-file',
    timestamp: new Date('2026-05-05T20:00:00'),
    isUser: false,
    content: {
      fileName: 'comprobante de servicio',
      acceptedFormats: ['.pdf', '.doc', '.xml'],
      maxFileSize: 10,
      additionalRequirements: ['El documento debe ser legible.'],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbUploadFileMessageComponent],
      providers: [
        {
          provide: BmbTranslationsService,
          useValue: {
            getTranslationVersion: () => 0,
            translate: (key: string) =>
              key === 'ai_chat_bubble.upload_file.button'
                ? 'Cargar archivo'
                : key,
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(BmbUploadFileMessageComponent);
    fixture.componentRef.setInput('message', message);
    fixture.detectChanges();
  });

  it('should render the file name, translated button and requirements', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain(message.content.fileName);
    expect(element.querySelector('button')?.textContent).toContain(
      'Cargar archivo',
    );
    expect(element.querySelector('button')?.type).toBe('button');
    expect(element.querySelectorAll('li')).toHaveLength(3);
    expect(element.textContent).toContain('.pdf, .doc, .xml');
    expect(element.textContent).toContain('10 MB');
    expect(element.textContent).toContain('El documento debe ser legible.');
  });

  it.each([0, 2.5, 10])(
    'should display a numeric size of %s MB',
    (maxFileSize) => {
      fixture.componentRef.setInput('message', {
        ...message,
        content: { fileName: 'documento', maxFileSize },
      } satisfies BmbUploadFileMessage);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain(`${maxFileSize} MB`);
      expect(fixture.nativeElement.querySelectorAll('li')).toHaveLength(1);
    },
  );

  it('should emit the message and native event when upload is requested', () => {
    const emit = jest.spyOn(
      fixture.componentInstance.uploadFileRequested,
      'emit',
    );
    const nativeEvent = new MouseEvent('click', { bubbles: true });
    fixture.debugElement
      .query(By.css('button'))
      .nativeElement.dispatchEvent(nativeEvent);
    expect(emit).toHaveBeenCalledWith({
      messageId: message.id,
      message,
      nativeEvent,
    });
  });

  it('should open the reusable picker with the requested file formats', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    const click = jest.spyOn(input, 'click').mockImplementation(() => {});

    fixture.nativeElement.querySelector('button').click();

    expect(click).toHaveBeenCalledTimes(1);
    expect(input.accept).toBe('.pdf,.doc,.xml');
  });

  it('should emit selected files and clear the local list after forwarding them', () => {
    const selected = jest.fn();
    fixture.componentInstance.filesSelected.subscribe(selected);
    const file = new File(['document'], 'document.pdf', {
      type: 'application/pdf',
    });
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    Object.defineProperty(input, 'files', { value: [file] });

    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const attachment = fixture.debugElement.query(
      By.directive(BmbFileAttachmentPicker),
    ).componentInstance as BmbFileAttachmentPicker;
    expect(selected).toHaveBeenCalledTimes(1);
    expect(selected).toHaveBeenCalledWith([file]);
    expect(attachment.files()).toEqual([]);
    expect(input.value).toBe('');
  });

  it('should forward dropped files through the same output', () => {
    const selected = jest.fn();
    fixture.componentInstance.filesSelected.subscribe(selected);
    const file = new File(['document'], 'document.pdf');
    const drop = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(drop, 'dataTransfer', { value: { files: [file] } });

    fixture.nativeElement.querySelector('button').dispatchEvent(drop);
    fixture.detectChanges();

    expect(selected).toHaveBeenCalledTimes(1);
    expect(selected).toHaveBeenCalledWith([file]);
  });

  it('should not emit files when the picker is cancelled', () => {
    const selected = jest.fn();
    fixture.componentInstance.filesSelected.subscribe(selected);

    fixture.nativeElement
      .querySelector('input')
      .dispatchEvent(new Event('change'));

    expect(selected).not.toHaveBeenCalled();
  });

  it('should show a format error and recovery instructions without emitting invalid files', () => {
    const selected = jest.fn();
    const results = jest.fn();
    fixture.componentInstance.filesSelected.subscribe(selected);
    fixture.componentInstance.attachmentResult.subscribe(results);
    const input = fixture.nativeElement.querySelector('input');
    Object.defineProperty(input, 'files', {
      value: [new File(['bad'], 'document.xps')],
    });
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(selected).not.toHaveBeenCalled();
    expect(results.mock.calls[0][0].errors[0].code).toBe('format');
    expect(
      fixture.nativeElement.querySelector('[role="alert"]').textContent,
    ).toContain('.xps');
    const toast = fixture.debugElement.query(By.directive(BmbToastComponent))
      .componentInstance as BmbToastComponent;
    expect(toast.appearance()).toBe('error');
    expect(toast.componentTitle()).toBe(
      'ai_chat_bubble.upload_file.error_title',
    );
    expect(toast.description()).toContain('.xps');
    expect(toast.isClosable()).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('.pdf, .doc, .xml');
    expect(fixture.nativeElement.textContent).toContain('10 MB');
    expect(
      fixture.nativeElement.querySelector('.bmb_toast-warning'),
    ).toBeNull();
  });

  it('should render interrupted upload as a warning and emit retry without reopening the picker', () => {
    fixture.componentRef.setInput('message', {
      ...message,
      content: { ...message.content, error: { code: 'interrupted' } },
    } satisfies BmbUploadFileMessage);
    fixture.detectChanges();
    const retry = jest.fn();
    fixture.componentInstance.retryUploadRequested.subscribe(retry);
    const click = jest.spyOn(
      fixture.nativeElement.querySelector('input'),
      'click',
    );
    const nativeEvent = new MouseEvent('click', { bubbles: true });
    fixture.nativeElement
      .querySelector('.bmb_upload-file-message-retry')
      .dispatchEvent(nativeEvent);

    expect(
      fixture.nativeElement.querySelector('.bmb_toast-warning'),
    ).toBeTruthy();
    expect(retry).toHaveBeenCalledWith({
      messageId: message.id,
      message: fixture.componentInstance.message(),
      nativeEvent,
    });
    const toast = fixture.debugElement.query(By.directive(BmbToastComponent))
      .componentInstance as BmbToastComponent;
    expect(toast.appearance()).toBe('warning');
    expect(toast.componentTitle()).toBe(
      'ai_chat_bubble.upload_file.interrupted_title',
    );
    expect(toast.description()).toBe(
      'ai_chat_bubble.upload_file.error_interrupted',
    );
    expect(toast.isClosable()).toBe(false);
    expect(click).not.toHaveBeenCalled();
  });

  it('should retain valid files in a mixed selection and report size and duplicate errors', () => {
    const selected = jest.fn();
    fixture.componentInstance.filesSelected.subscribe(selected);
    const valid = new File(['ok'], 'valid.pdf', { lastModified: 1 });
    const large = new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.pdf');
    const input = fixture.nativeElement.querySelector('input');
    Object.defineProperty(input, 'files', { value: [valid, valid, large] });
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(selected).toHaveBeenCalledWith([valid]);
    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert.textContent).toContain(
      'ai_chat_bubble.upload_file.error_duplicate',
    );
    expect(alert.textContent).toContain(
      'ai_chat_bubble.upload_file.error_size',
    );
  });

  it('should display the default size limit when none is provided', () => {
    fixture.componentRef.setInput('message', {
      ...message,
      content: {
        fileName: 'documento',
        acceptedFormats: [],
        additionalRequirements: [],
      },
    } satisfies BmbUploadFileMessage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('li')).toHaveLength(1);
    expect(fixture.nativeElement.textContent).toContain('2 MB');
  });

  it('should render custom instructions and labels as text, not HTML', () => {
    fixture.componentRef.setInput('message', {
      ...message,
      content: {
        fileName: 'documento',
        text: '<strong>Instrucciones personalizadas</strong>',
        buttonLabel: 'Seleccionar documento',
        cancelKeyword: 'Salir',
      },
    } satisfies BmbUploadFileMessage);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain(
      '<strong>Instrucciones personalizadas</strong>',
    );
    expect(element.querySelector('p')?.querySelector('strong')).toBeNull();
    expect(element.querySelector('button')?.textContent).toContain(
      'Seleccionar documento',
    );
    expect(element.textContent).toContain('Salir');
  });

  it('should keep the upload button enabled for repeated requests', () => {
    const emit = jest.spyOn(
      fixture.componentInstance.uploadFileRequested,
      'emit',
    );
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(false);
    button.click();
    button.click();
    expect(button.disabled).toBe(false);
    expect(emit).toHaveBeenCalledTimes(2);
  });

  it.each([
    '.pdf',
    '.DOCX',
    '.tar.gz',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/ld+json',
    'IMAGE/PNG',
    'image/*',
    'audio/*',
    'video/*',
  ])('should accept the valid format %s', (format) => {
    fixture.componentRef.setInput('message', {
      ...message,
      content: { ...message.content, acceptedFormats: [format] },
    } satisfies BmbUploadFileMessage);
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it.each([
    '',
    'pdf',
    '.',
    '.pdf ',
    '.pdf\n',
    ' application/pdf',
    '.pdf,.doc',
    'application',
    'application/',
    '/pdf',
    'unknown/pdf',
    'application/pdf/extra',
    'text/plain; charset=utf-8',
    '*/*',
    'application/*',
    'image/p*',
  ])(
    'should reject the invalid format %s when the message changes',
    (format) => {
      fixture.componentRef.setInput('message', {
        ...message,
        content: { ...message.content, acceptedFormats: ['.pdf', format] },
      } satisfies BmbUploadFileMessage);
      expect(() => fixture.detectChanges()).toThrow(
        'The "acceptedFormats" input is invalid.',
      );
    },
  );

  it('should validate accepted formats on initial rendering', () => {
    const initialFixture = TestBed.createComponent(
      BmbUploadFileMessageComponent,
    );
    initialFixture.componentRef.setInput('message', {
      ...message,
      content: { ...message.content, acceptedFormats: ['pdf'] },
    } satisfies BmbUploadFileMessage);
    expect(() => initialFixture.detectChanges()).toThrow(
      'Invalid values: ["pdf"]',
    );
  });
});
