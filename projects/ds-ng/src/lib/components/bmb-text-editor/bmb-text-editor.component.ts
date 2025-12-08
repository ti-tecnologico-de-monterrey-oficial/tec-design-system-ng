import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  OnInit,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import {
  BmbTextEditorPromptComponent,
  IBmbTextEditorPromptType,
} from './bmb-text-editor-prompt/bmb-text-editor-prompt.component';

@Component({
  selector: 'bmb-text-editor',
  standalone: true,
  imports: [BmbButtonDirective, BmbIconComponent],
  templateUrl: './bmb-text-editor.component.html',
  styleUrl: './bmb-text-editor.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTextEditorComponent implements AfterViewInit, OnInit {
  control = input<FormControl>(new FormControl(''));

  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;

  sanitizedContent = signal<SafeHtml>('');
  currentAlignment: string = 'left';
  showTableDialog: boolean = false;
  tableRows: number = 2;
  tableColumns: number = 2;
  userSelection: Range | null = null;

  detectAlignment() {
    const selection = globalThis.getSelection();
    if (selection && selection.rangeCount > 0) {
      const element = selection.getRangeAt(0)
        .commonAncestorContainer as HTMLElement;
      const parentElement = element.parentElement;

      if (parentElement) {
        const textAlign = parentElement.style.textAlign || 'left';
        this.currentAlignment = textAlign;
      }
    }
  }

  applyAlignment(alignment: string) {
    this.execCommand('styleWithCSS', 'true');
    this.execCommand(
      'justify' + alignment.charAt(0).toUpperCase() + alignment.slice(1),
    );
  }

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly projectionContent: BmbProjectionContentService,
  ) {}

  ngOnInit() {
    // NOSONAR: Initial content sanitization
    this.sanitizedContent.set(
      this.sanitizer.bypassSecurityTrustHtml(this.control().value || ''),
    );

    this.control().valueChanges?.subscribe((value) => {
      if (value === null) {
        // NOSONAR: Clear content sanitization
        this.sanitizedContent.set(this.sanitizer.bypassSecurityTrustHtml(''));
      }
    });
  }

  ngAfterViewInit() {
    this.editor.nativeElement.focus();
  }

  handleChange(event: Event, type: string) {
    const target = event.target as HTMLSelectElement;
    if (target?.value) {
      this.execCommand(type, target.value);
    }
  }

  execCommand(command: string, value: string | null = null) {
    if (this.userSelection) {
      const selection = globalThis.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(this.userSelection);
      }
    }

    document.execCommand(command, false, value || undefined);
    this.updateContent();

    this.userSelection = null;
  }

  openPrompt(type: IBmbTextEditorPromptType, event: MouseEvent) {
    this.userSelection = globalThis.getSelection()?.getRangeAt(0) || null;
    const buttonNode = event.currentTarget as HTMLElement;
    this.projectionContent.openContent({
      content: BmbTextEditorPromptComponent,
      inputContext: { type },
      outputContext: {
        formValues: (values: Record<string, unknown>) =>
          this.handleClosePrompt({ ...values, type }),
        cancelForm: () => this.projectionContent.closeContent(),
      },
      targetRef: buttonNode,
    });
  }

  handleClosePrompt(values: Record<string, unknown>) {
    if (values['type'] === 'link' && values['prompt_url']) {
      this.insertLink(values);
    } else if (values['type'] === 'image' && values['prompt_url']) {
      this.insertImage(values);
    }
    this.projectionContent.closeContent();
  }

  insertLink(values: Record<string, unknown>) {
    const selection = globalThis.getSelection();

    if (!selection || selection.rangeCount === 0 || !values['prompt_url']) {
      return;
    }

    this.execCommand('createLink', values['prompt_url'] as string);
    const range = selection.getRangeAt(0);
    const parentNode = range.commonAncestorContainer.parentNode;
    if (parentNode && parentNode instanceof HTMLAnchorElement) {
      parentNode.target = (values['target'] as string) || '_self';

      if (values['rel']) {
        parentNode.rel = 'noopener noreferrer';
      }
    }
  }

  insertImage(values: Record<string, unknown>) {
    const selection = globalThis.getSelection();

    if (!selection || selection.rangeCount === 0 || !values['prompt_url']) {
      return;
    }

    this.execCommand('insertImage', values['prompt_url'] as string);
  }

  updateContent() {
    this.control().setValue(this.editor.nativeElement.innerHTML);
  }

  clearFormatting() {
    this.execCommand('removeFormat');
    this.execCommand('unlink');
  }

  getCurrentState() {
    return this.control().value;
  }

  isValidImageUrl(url: string): boolean {
    try {
      new URL(url); // Intenta crear un objeto URL
      return true;
    } catch (error) {
      return false;
    }
  }

  // Método para abrir el diálogo de la tabla
  openTableDialog() {
    this.showTableDialog = true;
  }

  // Método para cerrar el diálogo de la tabla
  closeTableDialog() {
    this.showTableDialog = false;
  }

  // Método para insertar la tabla
  insertTable() {
    const rows = this.tableRows;
    const columns = this.tableColumns;

    if (rows > 0 && columns > 0) {
      const tableHtml = this.generateTableHtml(rows, columns);
      this.insertHtml(tableHtml);
      this.closeTableDialog();
    }
  }

  // Método para generar el HTML de la tabla
  generateTableHtml(rows: number, columns: number): string {
    let tableHtml = '<table style="border-collapse: collapse; width: 100%;">';
    for (let i = 0; i < rows; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < columns; j++) {
        tableHtml += `<td style="border: 1px solid #000; padding: 8px;">&nbsp;</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    return tableHtml;
  }

  // Método para insertar HTML en el editor
  insertHtml(html: string) {
    const selection = globalThis.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const div = document.createElement('div');
      div.innerHTML = html;
      range.insertNode(div);
      this.updateContent();
    }
  }
}
