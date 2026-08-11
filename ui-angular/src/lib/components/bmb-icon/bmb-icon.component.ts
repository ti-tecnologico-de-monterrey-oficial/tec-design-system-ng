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
  output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { buildErrorMessage } from '@shared/logic/utils';
import { BmbNotificationCounterComponent } from '../bmb-notification-counter/bmb-notification-counter.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BmbIconService } from '../../services/icon/icon.service';
import { sanitizeContent } from '../../_shared/logic/sanitizeContent';
import { BmbCustomIconsComponent } from '../bmb-custom-icons/bmb-custom-icons.component';
import type { BmbCustomIconListType } from '../../../../../shared/types/components/bmb-custom-icons';
import { BmbCustomIconList } from '../../../../../shared/types/components/bmb-custom-icons';
import { A11yModule } from '@angular/cdk/a11y';
import { getUUID } from '../../../../../shared/logic/utils';
import { BmbIconLogic } from '../../../../../shared/logic/components/icon';

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
  isFill = input<boolean>(true); //Deprecated
  size = input<number>();
  alt = input<string>('');
  dotNotification = input<number>();
  isSVGTemplate = input<boolean>();
  testId = input<string>(getUUID());

  imageNotFoundError = output<void>();

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

  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private iconService: BmbIconService = inject(BmbIconService);

  constructor() {
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
    const inputs: string[] = [];
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
      const svgContent = await this.iconService.loadIconSvg(name, true);

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
    return BmbIconLogic.isImage(icon);
  }

  getFontVariationSettings(): string {
    return BmbIconLogic.getFontVariationSettings();
  }

  getImageStyles() {
    return BmbIconLogic.getImageStyles(this.size());
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

  handleImageNotFoundError(iconName: string): void {
    console.error('Image not found error:', iconName);
    this.imageNotFoundError.emit();
  }
}
