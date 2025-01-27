import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbDropdownComponent } from '../bmb-dropdown/bmb-dropdown.component';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
} from '../../../public-api';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'bmb-text-editor',
  standalone: true,
  imports: [BmbDropdownComponent, BmbLayoutDirective, BmbLayoutItemDirective],
  templateUrl: './bmb-text-editor.component.html',
  styleUrl: './bmb-text-editor.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTextEditorComponent {
  // content = model<string>('');
  control = input<FormControl>(new FormControl(''));

  initialContent = '';
  htmlContent: SafeHtml;
  dropDownControl = new FormControl('normal');
  dropDownOptions = [
    { value: 'normal', name: 'Normal', icon: '' },
    { value: 'h1', name: 'Heading 1', icon: '' },
    { value: 'h2', name: 'Heading 2', icon: '' },
    { value: 'h3', name: 'Heading 3', icon: '' },
    { value: 'h4', name: 'Heading 4', icon: '' },
    { value: 'h5', name: 'Heading 5', icon: '' },
    { value: 'h6', name: 'Heading 6', icon: '' },
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(
      this.control().value,
    );
  }

  @ViewChild('editableDiv') editableDiv!: ElementRef;
  selectedText: string = '';

  // formControls = new FormDa

  updateContent(event: Event): void {
    const target = event.target as HTMLElement;
    this.control().setValue(target.innerHTML);
    // this.content.set(target.innerHTML);
  }

  getSelectedText(event: MouseEvent): void {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      this.selectedText = selectedText;
      console.log('Selected text:', selectedText);
    } else {
      this.selectedText = '';
      console.log('No text selected');
    }
  }

  wrapSelectedText(tag: string): void {
    const div = this.editableDiv.nativeElement;
    const html = div.innerHTML;
    const range = window.getSelection()?.getRangeAt(0);

    if (this.selectedText) {
      const wrappedText =
        '<' + tag + '>' + this.selectedText + '</' + tag + '>';
      const newHtml = html.replace(this.selectedText, wrappedText);

      div.innerHTML = newHtml;
      console.log('Wrapped text:', wrappedText);
    } else {
      const paragraph = range?.startContainer?.parentElement;
      if (paragraph && paragraph.tagName === 'DIV') {
        const paragraphText = paragraph.innerText;
        const wrappedText = '<' + tag + '>' + paragraphText + '</' + tag + '>';
        const newHtml = html.replace(paragraphText, wrappedText);

        div.innerHTML = newHtml;
        console.log('Wrapped text:', wrappedText);
      }
      console.log('No text selected to wrap');
    }
  }
}
