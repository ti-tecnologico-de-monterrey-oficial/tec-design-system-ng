import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-text-editor',
  standalone: true,
  imports: [BmbButtonDirective, BmbIconComponent],
  templateUrl: './bmb-text-editor.component.html',
  styleUrl: './bmb-text-editor.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTextEditorComponent {
  control = input<FormControl>(new FormControl(''));

  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;

  htmlContent: string = '';
  sanitizedContent: SafeHtml = '';
  currentAlignment: string = 'left';

  detectAlignment() {
    const selection = window.getSelection();
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

  constructor(private sanitizer: DomSanitizer) {}

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
    document.execCommand(command, false, value || undefined);
    this.updateContent();
  }

  insertLink() {
    const url = prompt('Ingrese la URL:');
    if (url) {
      this.execCommand('createLink', url);
    }
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

  insertImage() {
    const url = prompt('Ingrese la URL de la imagen:');
    if (url) {
      if (this.isValidImageUrl(url)) {
        this.execCommand('insertImage', url);
      } else {
        alert('La URL de la imagen no es válida.');
      }
    }
  }

  isValidImageUrl(url: string): boolean {
    try {
      new URL(url); // Intenta crear un objeto URL
      return true;
    } catch (error) {
      return false;
    }
  }
}
