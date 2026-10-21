import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BmbDropdownComponent,
  BmbInputComponent,
  BmbTranslationsService,
  type BmbChatMessageType,
} from 'ui-angular';
import { AiChatBubblePage } from './ai-chat-bubble-page';

describe('AiChatBubblePage', () => {
  let fixture: ComponentFixture<AiChatBubblePage>;
  let page: AiChatBubblePage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiChatBubblePage],
      providers: [
        {
          provide: BmbTranslationsService,
          useValue: {
            getTranslationVersion: () => 0,
            getCurrentLanguage: () => 'es',
            translate: (key: string) => key,
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AiChatBubblePage);
    page = fixture.componentInstance;
    page.showActions.set(false);
    fixture.detectChanges();
  });

  it('should select message types from the BmbDropdown event', () => {
    const dropdown = fixture.debugElement.query(
      By.directive(BmbDropdownComponent),
    );
    dropdown.componentInstance.onValueChange.emit('upload-file');
    fixture.detectChanges();
    expect(page.selectedMessageType()).toBe('upload-file');
    expect(
      fixture.nativeElement.querySelector('bmb-upload-file-message'),
    ).toBeTruthy();
    expect(fixture.nativeElement.querySelector('bmb-tabs')).toBeNull();
  });

  it.each<BmbChatMessageType>([
    'text',
    'image',
    'mixed',
    'link',
    'options',
    'upload-file',
    'template',
  ])('should build and render a %s message', (type) => {
    page.selectMessageType(type);
    fixture.detectChanges();
    expect(page.message()?.type).toBe(type);
    expect(
      fixture.nativeElement.querySelector(
        `[data-automation-id="preview-${type}"]`,
      ),
    ).toBeTruthy();
  });

  it('should only show controls relevant to the selected type', () => {
    page.selectMessageType('image');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Texto alternativo');
    expect(fixture.nativeElement.textContent).not.toContain(
      'Nombre del archivo',
    );

    page.selectMessageType('upload-file');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Nombre del archivo');
    expect(fixture.nativeElement.textContent).not.toContain(
      'Texto alternativo',
    );
    expect(fixture.nativeElement.textContent).not.toContain('Mostrar editar');
  });

  it('should update accepted formats from the BmbInput event', () => {
    page.selectMessageType('upload-file');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.directive(BmbInputComponent));
    expect(input.componentInstance.label()).toBe('Formatos aceptados');
    const nativeInput = document.createElement('input');
    nativeInput.value = '.png,image/png';
    input.componentInstance.onChange.emit(nativeInput);
    fixture.detectChanges();
    expect(page.message()).toMatchObject({
      type: 'upload-file',
      content: { acceptedFormats: ['.png', 'image/png'] },
    });
    nativeInput.value = '';
    input.componentInstance.onChange.emit(nativeInput);
    fixture.detectChanges();
    expect(page.message()).toMatchObject({
      content: { acceptedFormats: [] },
    });
  });

  it('should preserve controls and update message content across selections', () => {
    page.text.set('Texto de prueba');
    page.selectMessageType('image');
    page.selectMessageType('text');
    expect(page.message()).toMatchObject({
      type: 'text',
      content: { text: 'Texto de prueba' },
    });
  });

  it('should toggle upload requirements and forward upload requests', () => {
    page.selectMessageType('upload-file');
    page.showRequirements.set(false);
    fixture.detectChanges();
    expect(page.message()).toMatchObject({
      type: 'upload-file',
      content: { fileName: page.fileName() },
    });
    expect(
      fixture.nativeElement.querySelector(
        '.bmb_upload-file-message-requirements',
      ),
    ).toBeNull();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      'bmb-upload-file-message button',
    );
    button.click();
    expect(page.conversationEvent()).toContain('uploadFileRequested');
    expect(page.conversationEvent()).toContain('preview-upload-file');
  });

  it('should generate options and link targets from their controls', () => {
    page.selectMessageType('options');
    page.optionLabels.set('Primera\n\nSegunda');
    expect(page.message()).toMatchObject({
      content: {
        options: [
          { id: 'option-0', label: 'Primera' },
          { id: 'option-1', label: 'Segunda' },
        ],
      },
    });
    page.selectMessageType('link');
    page.openInNewTab.set(false);
    expect(page.message()).toMatchObject({ content: { target: '_self' } });
  });

  it('should reject an unknown dropdown value', () => {
    expect(() => page.selectMessageType('invalid')).toThrow(
      'Unknown chat message type',
    );
    expect(page.selectedMessageType()).toBe('text');
  });
});
