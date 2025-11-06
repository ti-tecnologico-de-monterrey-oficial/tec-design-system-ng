import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  OnInit,
  TemplateRef,
  effect,
  signal,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { buildErrorMessage, isImage } from '../../utils/utils';
import { StyleIconType } from './types';
import { BmbNotificationCounterComponent } from '../bmb-notification-counter/bmb-notification-counter.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BmbIconService } from '../../services/icon/icon.service';

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
  icon = input<string>('');
  materialIcon = input<boolean>(false); // Deprecated
  styleIcon = input<StyleIconType>('material-symbols-rounded'); // Deprecated
  isFill = input<boolean>(true);
  fontWeight = input<string>('400'); // Deprecated
  size = input<number | undefined>();
  alt = input<string>('');
  dotNotification = input<number>();
  isSVGTemplate = input<boolean>();

  @ContentChild('customIcon') customIcon!: TemplateRef<any>;

  styleIconGoogle = 'material-symbols-rounded';
  iconSvg = signal<SafeHtml | null>(null);

  constructor(
    private sanitizer: DomSanitizer,
    private iconService: BmbIconService
  ) {
    effect(() => {
      if (this.icon()) {
        const svgIcon = this.loadIcon(this.icon());
        svgIcon.then(icon => {
          if (icon !== null) {
            untracked(() => {
              this.iconSvg.set(icon as SafeHtml);
            });
          }
        });
      }
    });
  }

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

  async loadIcon(name: string): Promise<SafeHtml | null> {
    if (!name) {
      this.iconSvg.set(null);
      return null;
    }

    try {
      const svgContent = await this.iconService.loadIconSvg(name, this.isFill());

      if (!svgContent) {
        console.warn(`Icon "${name}" not found`);
        return null;
      }

      const processedSvg = svgContent
          .replace(/width="[^"]*"/, `width="${this.size() ? this.size() + 'px' : '1em'}"`)
          .replace(/height="[^"]*"/, `height="${this.size() ? this.size() + 'px' : '1em'}"`);

      return this.sanitizer.bypassSecurityTrustHtml(processedSvg);

    } catch (error) {
      console.error(`Error loading icon "${name}":`, error);
      return null;
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
