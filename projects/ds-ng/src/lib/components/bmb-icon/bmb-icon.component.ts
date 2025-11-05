import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { buildErrorMessage, isImage } from '../../utils/utils';
import { StyleIconType } from './types';
import { BmbNotificationCounterComponent } from '../bmb-notification-counter/bmb-notification-counter.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'bmb-icon',
  standalone: true,
  imports: [CommonModule, BmbNotificationCounterComponent],
  templateUrl: './bmb-icon.component.html',
  styleUrl: './bmb-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIconComponent implements OnInit {
  icon = input<string>('face');
  materialIcon = input<boolean>(false);
  styleIcon = input<StyleIconType>('material-symbols-rounded');
  isFill = input<boolean>(true);
  fontWeight = input<string>('400');
  size = input<number | undefined>();
  alt = input<string>('');
  dotNotification = input<number>();
  isSVGTemplate = input<boolean>();

  @ContentChild('customIcon') customIcon!: TemplateRef<any>;

  styleIconGoogle = 'material-symbols-rounded';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    let inputs: string[] = [];
    if (this.isImage(this.icon()) && !this.alt()) inputs.push('alt');

    if (inputs.length) {
      throw new Error(
        `
        The ${buildErrorMessage(inputs)} required when the icon is an image.
        `,
      );
    }
  }

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  getFontVariationSettings(): string {
    const fill = this.isFill() ? "'FILL' 1" : "'FILL' 0";
    const weight = `'wght' ${this.fontWeight()}`;
    return `${fill}, ${weight}`;
  }

  getImageStyles() {
    return {
      width: !!this.size() ? `${this.size()}px` : '1em',
      height: !!this.size() ? `${this.size()}px` : '1em',
    };
  }

  get safeSVG(): SafeHtml | null {
    if (
      (!this.isSVGTemplate() && this.customIcon) ||
      (this.isSVGTemplate() && this.customIcon === undefined)
    ) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustHtml(this.customIcon.toString());
  }
}
