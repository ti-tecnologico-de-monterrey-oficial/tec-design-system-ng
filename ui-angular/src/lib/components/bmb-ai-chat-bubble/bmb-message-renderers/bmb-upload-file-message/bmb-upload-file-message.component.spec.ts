import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbUploadFileMessageComponent } from './bmb-upload-file-message.component';
import type { BmbUploadFileMessage } from '../../types';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';

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
      maxFileSize: '10 MB',
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

  it('should hide requirements when none are provided', () => {
    fixture.componentRef.setInput('message', {
      ...message,
      content: {
        fileName: 'documento',
        acceptedFormats: [],
        additionalRequirements: [],
      },
    } satisfies BmbUploadFileMessage);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ul')).toBeNull();
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
