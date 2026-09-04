import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbTranslationsService } from '../../../services/translations/translations.service';

@Component({
  selector: 'bmb-ai-chat-bubble-editor',
  standalone: true,
  imports: [BmbButtonDirective],
  templateUrl: './bmb-ai-chat-bubble-editor.component.html',
  styleUrl: './bmb-ai-chat-bubble-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAiChatBubbleEditorComponent implements AfterViewInit {
  readonly initialValue = input.required<string>();
  readonly testId = input('ai-chat-bubble-editor');

  readonly cancelEvent = output<void>();
  readonly saveEvent = output<string>();

  protected readonly draft = signal('');
  protected readonly canSave = computed(() => {
    const value = this.draft();
    return value.trim().length > 0 && value !== this.initialValue();
  });

  private readonly translationService = inject(BmbTranslationsService);

  protected readonly cancelLabel = this.translationService.translate(
    'chat_bubbles.cancel_edit',
  );
  protected readonly saveLabel = this.translationService.translate(
    'chat_bubbles.save_edit',
  );
  @ViewChild('textarea')
  private textarea?: ElementRef<HTMLTextAreaElement>;

  constructor() {
    effect(
      () => {
        this.draft.set(this.initialValue());
      },
      { allowSignalWrites: true },
    );
  }

  ngAfterViewInit(): void {
    this.textarea?.nativeElement.focus();
  }

  protected updateDraft(event: Event): void {
    this.draft.set((event.target as HTMLTextAreaElement).value);
  }

  protected handleCancel(): void {
    this.draft.set(this.initialValue());
    this.cancelEvent.emit();
  }

  protected handleSave(): void {
    if (!this.canSave()) return;
    this.saveEvent.emit(this.draft());
  }
}
