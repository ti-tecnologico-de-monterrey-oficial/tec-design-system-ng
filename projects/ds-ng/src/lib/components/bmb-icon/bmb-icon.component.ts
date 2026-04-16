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
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { buildErrorMessage, isImage } from '../../utils/utils';
import { BmbNotificationCounterComponent } from '../bmb-notification-counter/bmb-notification-counter.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BmbIconService } from '../../services/icon/icon.service';
import { sanitizeContent } from '../../utils/sanitizeContent';
import {
  BmbCustomIconList,
  BmbCustomIconListType,
  BmbCustomIconsComponent,
} from './bmb-custom-icons/bmb-custom-icons.component';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'bmb-icon',
  standalone: true,
  imports: [
    CommonModule,
    BmbNotificationCounterComponent,
    BmbCustomIconsComponent,
    A11yModule,
  ],
  templateUrl: './bmb-icon.component.html',
  styleUrl: './bmb-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIconComponent implements OnInit {
  icon = input<string | BmbCustomIconListType>('');
  isFill = input<boolean>(true);
  size = input<number>();
  alt = input<string>('');
  dotNotification = input<number>();
  isSVGTemplate = input<boolean>();

  styleIconGoogle = 'material-symbols-rounded';
  iconSvg = signal<SafeHtml | null>(null);
  customIcon = contentChild<TemplateRef<any>>('customIcon');

  isCustomIcon = computed(() => {
    const iconValue = this.icon();
    return BmbCustomIconList.includes(iconValue as BmbCustomIconListType);
  });
  customIconName = computed<BmbCustomIconListType>(() => {
    const iconValue = this.icon();
    return this.isCustomIcon()
      ? (iconValue as BmbCustomIconListType)
      : 'bmb_android';
  });

  constructor(
    private sanitizer: DomSanitizer,
    private iconService: BmbIconService,
  ) {
    effect(() => {
      if (this.icon()) {
        const svgIcon = this.loadIcon(this.icon());
        svgIcon.then((icon) => {
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
