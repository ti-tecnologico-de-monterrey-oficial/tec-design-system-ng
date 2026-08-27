import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BmbChatEditorComponent } from './bmb-chat-editor.component';
import { BmbTranslationsService } from '../../services/translations/translations.service';

describe('BmbChatEditorComponent', () => {
  let fixture: ComponentFixture<BmbChatEditorComponent>;
  let component: BmbChatEditorComponent;
  let componentRef: ComponentRef<BmbChatEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbChatEditorComponent],
      providers: [
        {
          provide: BmbTranslationsService,
          useValue: { translate: (key: string) => key },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbChatEditorComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('initialValue', 'Original message');
    fixture.detectChanges();
  });

  it('should initialize the textarea with the original value', () => {
    const textarea = fixture.debugElement.query(By.css('textarea'))
      .nativeElement as HTMLTextAreaElement;

    expect(textarea.value).toBe('Original message');
  });

  it('should keep save disabled until the value changes', () => {
    const saveButton = fixture.debugElement.query(
      By.css('[data-testid="chat-editor-save"]'),
    ).nativeElement as HTMLButtonElement;

    expect(saveButton.disabled).toBe(true);
  });

  it('should preserve line breaks and emit the edited value', () => {
    jest.spyOn(component.saveEvent, 'emit');
    const textarea = fixture.debugElement.query(By.css('textarea'));
    textarea.nativeElement.value = 'First line\nSecond line';
    textarea.triggerEventHandler('input', {
      target: textarea.nativeElement,
    });
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('[data-testid="chat-editor-save"]'))
      .triggerEventHandler('click');

    expect(component.saveEvent.emit).toHaveBeenCalledWith(
      'First line\nSecond line',
    );
  });

  it('should not allow saving whitespace-only content', () => {
    const textarea = fixture.debugElement.query(By.css('textarea'));
    textarea.nativeElement.value = '   ';
    textarea.triggerEventHandler('input', {
      target: textarea.nativeElement,
    });
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(
      By.css('[data-testid="chat-editor-save"]'),
    ).nativeElement as HTMLButtonElement;
    expect(saveButton.disabled).toBe(true);
  });

  it('should restore the original value and emit cancel', () => {
    jest.spyOn(component.cancelEvent, 'emit');
    const textarea = fixture.debugElement.query(By.css('textarea'));
    textarea.nativeElement.value = 'Changed';
    textarea.triggerEventHandler('input', {
      target: textarea.nativeElement,
    });

    fixture.debugElement
      .query(By.css('[data-testid="chat-editor-cancel"]'))
      .triggerEventHandler('click');

    expect(component['draft']()).toBe('Original message');
    expect(component.cancelEvent.emit).toHaveBeenCalled();
  });
});
