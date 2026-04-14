import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  TemplateRef,
  effect,
  signal,
  untracked,
  ViewEncapsulation,
  contentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { buildErrorMessage, isImage } from '../../utils/utils';
import { BmbNotificationCounterComponent } from '../bmb-notification-counter/bmb-notification-counter.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BmbIconService } from '../../services/icon/icon.service';
import { sanitizeContent } from '../../utils/sanitizeContent';
import { HttpClient } from '@angular/common/http';

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
  isFill = input<boolean>(true);
  size = input<number | undefined>();
  alt = input<string>('');
  dotNotification = input<number>();
  isSVGTemplate = input<boolean>();

  styleIconGoogle = 'material-symbols-rounded';
  iconSvg = signal<SafeHtml | null>(null);
  customIcon = contentChild<TemplateRef<any>>('customIcon');

  constructor(
    private sanitizer: DomSanitizer,
    private iconService: BmbIconService,
    private http: HttpClient,
  ) {
    effect(() => {
      const iconName = this.icon();

      untracked(() => {
        // Reset cuando no hay icono
        if (!iconName) {
          this.iconSvg.set(null);
          this.svgHtml.set(undefined);
          return;
        }

        // Si es una ruta .svg, cargarla vía HTTP y usar svgHtml
        if (this.isSVGPath(iconName)) {
          this.loadSvg(iconName);
          this.iconSvg.set(null);
          return;
        }

        // Si es una imagen (png, jpg, etc.), no intentamos cargar desde el servicio de íconos
        if (this.isImage(iconName)) {
          this.iconSvg.set(null);
          this.svgHtml.set(undefined);
          return;
        }

        // Ícono de librería (no imagen ni ruta .svg)
        const svgIcon = this.loadIcon(iconName);
        svgIcon.then((icon) => {
          if (icon !== null) {
            untracked(() => {
              this.iconSvg.set(icon as SafeHtml);
            });
          }
        });
      });
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

    if (this.isImage(name)) return null;

    try {
      const svgContent = await this.iconService.loadIconSvg(
        name,
        this.isFill(),
      );

      if (!svgContent) {
        console.warn(`Icon "${name}" not found`);
        return null;
      }

      const processedSvg = svgContent
        .replace(
          /width="[^"]*"/,
          `width="${this.size() ? this.size() + 'px' : '1em'}"`,
        )
        .replace(
          /height="[^"]*"/,
          `height="${this.size() ? this.size() + 'px' : '1em'}"`,
        );
      return this.sanitizedHtml(processedSvg);
    } catch (error) {
      console.error(`Error loading icon "${name}":`, error);
      return null;
    }
  }

  sanitizedHtml(html: string) {
    const clean = sanitizeContent(html);
    return this.sanitizer.bypassSecurityTrustHtml(clean); // NOSONAR Content is sanitized with DOMPurify - safe to bypass Angular sanitization
  }

  svgHtml = signal<SafeHtml | undefined>(undefined);

  loadSvg(path: string) {
    this.http.get(path, { responseType: 'text' }).subscribe((raw) => {
      this.svgHtml.set(this.sanitizedHtml(raw));
    }, (error) => {
      console.error(`Error loading SVG from path "${path}":`, error);
      this.svgHtml.set(undefined);
    });
  }

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  getFontVariationSettings(): string {
    const fill = this.isFill() ? "'FILL' 1" : "'FILL' 0";
    const weight = 'wght 400';
    return `${fill}, ${weight}`;
  }

  getImageStyles() {
    return {
      width: !!this.size() ? `${this.size()}px` : '1em',
      height: !!this.size() ? `${this.size()}px` : '1em',
    };
  }

  isSVGPath(icon: string): boolean {
    return icon.trim().toLocaleLowerCase().endsWith('.svg');
  }

  get safeSVG(): SafeHtml | null {
    if (
      (!this.isSVGTemplate() && this.customIcon()) ||
      (this.isSVGTemplate() && this.customIcon() === undefined)
    ) {
      return null;
    }

    const clean = sanitizeContent(this.customIcon()?.toString() ?? '');

    return this.sanitizer.bypassSecurityTrustHtml(clean); // NOSONAR Content is sanitized with DOMPurify - safe to bypass Angular sanitization
  }
}
