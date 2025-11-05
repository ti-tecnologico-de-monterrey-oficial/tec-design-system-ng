import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnInit,
  signal,
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
  icon = input<string>('face');
  materialIcon = input<boolean>(false); // Deprecated
  styleIcon = input<StyleIconType>('material-symbols-rounded'); // Deprecated
  isFill = input<boolean>(true);
  fontWeight = input<string>('400'); // Deprecated
  size = input<number | undefined>();
  alt = input<string>('');
  dotNotification = input<number>();

  styleIconGoogle = 'material-symbols-rounded';
  iconSvg = signal<SafeHtml | null>(null);

  constructor(
    private sanitizer: DomSanitizer,
    private iconService: BmbIconService
  ) {
    effect(() => {
      this.loadIcon(this.icon());
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

  async loadIcon(name: string): Promise<void> {
    if (!name) {
      this.iconSvg.set(null);
      return;
    }

    try {
      console.log('Loading icon:', name);

      const svgContent = await this.iconService.loadIconSvg(name, this.isFill());

      if (!svgContent) {
        console.warn(`Icon "${name}" not found`);
        this.iconSvg.set(null);
        return;
      }

      let processedSvg = svgContent;

      // Aplicar tamaño personalizado si se especifica
      processedSvg = svgContent
          .replace(/width="[^"]*"/, `width="${this.size() || 'inherit'}"`)
          .replace(/height="[^"]*"/, `height="${this.size() || 'inherit'}"`);

      this.iconSvg.set(this.sanitizer.bypassSecurityTrustHtml(processedSvg));
      console.log(`Icon "${name}" loaded successfully`);

    } catch (error) {
      console.error(`Error loading icon "${name}":`, error);
      this.iconSvg.set(null);
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
      width: !!this.size() ? `${this.size()}px` : 'inherit',
      height: !!this.size() ? `${this.size()}px` : 'inherit',
    };
  }
}
