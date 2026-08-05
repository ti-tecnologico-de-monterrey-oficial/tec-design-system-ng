import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  TemplateRef,
  OnInit,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../services/projection/projection.service';
import { BmbActionMenuComponent } from '../bmb-action-menu/bmb-action-menu.component';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';
import { IActions } from './types';
import { getInsertList, getSettingsList } from './list';
import { TranslatePipe } from '../../pipes/translations';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import {
  BmbTextEditorPromptComponent,
  IBmbTextEditorPromptType,
} from './bmb-text-editor-prompt/bmb-text-editor-prompt.component';
import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'bmb-text-editor',
  standalone: true,
  imports: [
    CommonModule,
    BmbActionIconComponent,
    BmbActionMenuComponent,
    BmbItemComponent,
    TranslatePipe,
    CdkTableModule,
  ],
  templateUrl: './bmb-text-editor.component.html',
  styleUrl: './bmb-text-editor.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTextEditorComponent implements AfterViewInit, OnInit {
  control = input<FormControl>(new FormControl(''));

  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;
  @ViewChild('moreTemplate') moreTemplate!: TemplateRef<unknown>;
  @ViewChild('insertTemplate') insertTemplate!: TemplateRef<unknown>;

  sanitizedContent = signal<SafeHtml>('');
  currentAlignment: string = 'left';
  showTableDialog: boolean = false;
  tableRows: number = 2;
  tableColumns: number = 2;
  settingsItems = input<IActions[]>(
    getSettingsList(this as any, this.translations),
  );

  insertItems = input<IActions[]>(
    getInsertList(this as any, this.translations),
  );

  constructor(
    private readonly contentProjected: BmbProjectionContentService,
    private readonly translations: BmbTranslationsService,
    private readonly sanitizer: DomSanitizer,
  ) {}
  userSelection: Range | null = null;
  selectedColor = signal<string>('');

  ngOnInit(): void {
    this.sanitizedContent.set(
      // NOSONAR: Initial content sanitization
      this.sanitizer.bypassSecurityTrustHtml(this.control().value || ''),
    );

    this.control().valueChanges?.subscribe((value) => {
      if (value === null) {
        // NOSONAR: Clear content sanitization
        this.sanitizedContent.set(this.sanitizer.bypassSecurityTrustHtml(''));
      }
    });
  }

  ngAfterViewInit(): void {
    this.editor.nativeElement.focus();
  }

  detectAlignment(): void {
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

  applyAlignment(alignment: string): void {
    this.execCommand('styleWithCSS', 'true');
    this.execCommand(
      'justify' + alignment.charAt(0).toUpperCase() + alignment.slice(1),
    );
  }

  handleChange(event: Event, type: string): void {
    const target = event.target as HTMLSelectElement;
    if (target?.value) {
      this.execCommand('unlink');
      this.execCommand(type, target.value);
    }
  }

  execCommand(command: string, value: string | null = null): void {
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

  addTextFormat(command: string): void {
    this.execCommand('unlink');
    this.execCommand(command);
  }

  openPrompt(type: IBmbTextEditorPromptType, event: MouseEvent | null): void {
    //Removes the possible format because it only allow Bamboo Text link styles
    if (type === 'link') this.execCommand('removeFormat');

    this.userSelection = globalThis.getSelection()?.getRangeAt(0) || null;

    //Does not open the modal if there is no selection for text link
    if (type === 'link') {
      const userSelection = this.userSelection as Range;
      if (
        userSelection !== null &&
        userSelection.startOffset === userSelection.endOffset
      ) {
        //For no selection
        return;
      }
    }

    const buttonNode = event?.currentTarget as HTMLElement;
    this.contentProjected.openContent({
      content: BmbTextEditorPromptComponent,
      inputContext: { type },
      outputContext: {
        formValues: (values: Record<string, unknown>) =>
          this.handleClosePrompt({ ...values, type }),
        cancelForm: () => this.contentProjected.closeContent(),
        selectedColor: (colorName: string) => {
          this.contentProjected.closeContent();
          this.selectedColor.set(colorName);
          this.handleClosePrompt({ colorName, type });
        },
      },
      targetRef: buttonNode ?? null,
    });
  }

  handleClosePrompt(values: Record<string, unknown>): void {
    if (values['type'] === 'link' && values['prompt_url']) {
      this.insertLink(values);
    } else if (values['type'] === 'image' && values['prompt_url']) {
      this.insertImage(values);
    } else if (values['type'] === 'color') {
      this.addColor(values['colorName'] as string);
    }
    this.contentProjected.closeContent();
  }

  insertLink(values: Record<string, unknown>): void {
    const selection = globalThis.getSelection();

    if (!selection || !values['prompt_url']) {
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

  insertImage(values: Record<string, unknown>): void {
    const selection = globalThis.getSelection();

    if (!selection || selection.rangeCount === 0 || !values['prompt_url']) {
      return;
    }

    this.execCommand('insertImage', values['prompt_url'] as string);
    const range = selection.getRangeAt(0);
    let imageNode: HTMLImageElement | null = null;
    range.commonAncestorContainer.childNodes.forEach((node) => {
      if (node instanceof HTMLImageElement) {
        imageNode = node as HTMLImageElement;
        if (values['prompt_img_width'] && values['unit_size']) {
          imageNode.style.width = `${values['prompt_img_width']}${values['unit_size']}`;
        }

        if (values['prompt_img_height'] && values['unit_size']) {
          imageNode.style.height = `${values['prompt_img_height']}${values['unit_size']}`;
        }

        if (values['prompt_alt']) {
          imageNode.alt = values['prompt_alt'] as string;
        }

        if (values['alignment_type']) {
          imageNode.style.objectFit = values['alignment_type'] as string;
        }
      }
    });
  }

  updateContent(): void {
    this.control().setValue(this.editor.nativeElement.innerHTML);
  }

  clearFormatting(): void {
    this.execCommand('removeFormat');
    this.execCommand('unlink');
  }

  getCurrentState(): void {
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
  openTableDialog(): void {
    this.showTableDialog = true;
  }

  // Método para cerrar el diálogo de la tabla
  closeTableDialog(): void {
    this.showTableDialog = false;
  }

  // Método para insertar la tabla
  insertTable(): void {
    const rows = this.tableRows;
    const columns = this.tableColumns;

    if (rows > 0 && columns > 0) {
      const tableHtml = this.generateTableHtml(rows, columns);
      this.insertHtml(tableHtml);
      this.closeTableDialog();
    }
  }

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
  insertHtml(html: string): void {
    const selection = globalThis.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const div = document.createElement('div');
      div.innerHTML = html;
      range.insertNode(div);
      this.updateContent();
    }
  }

  handleMoreDialog(event: MouseEvent | KeyboardEvent): void {
    if (!event.target) return;
    const data: IBmbProjectionContent = {
      content: this.moreTemplate,
      targetRef: event.target as HTMLElement,
    };

    this.contentProjected.openContent(data);
  }

  handleInsertDialog(event: MouseEvent | KeyboardEvent): void {
    if (!event.target) return;
    const data: IBmbProjectionContent = {
      content: this.insertTemplate,
      targetRef: event.target as HTMLElement,
    };

    this.contentProjected.openContent(data);
  }

  closeProjectedContent() {
    this.contentProjected.closeContent();
  }

  getContainerColor(name: string): string {
    return `border: 1px solid var(--${name});
          border-radius: var(--bmb-radius-xs);
          width: 1.5rem;
          height: 1.5rem;
          background: var(--${name});
          `;
  }

  addColor(name: string): void {
    const selection = globalThis.getSelection();

    if (!selection) {
      return;
    }

    const range = selection.getRangeAt(0);
    const parentNode = range.commonAncestorContainer.parentNode as HTMLElement;

    if (!parentNode) {
      return;
    }

    parentNode.style.setProperty('color', `var(--${name})`);
    this.updateContent();
  }
}
