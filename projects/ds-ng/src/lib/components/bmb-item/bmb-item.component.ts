import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { IBmbTargetLink } from '../../types';
import { CommonModule } from '@angular/common';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { sanitizeContent } from '../../utils/sanitizeContent';
import { BmbVerticalLayoutDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';

@Component({
  selector: 'bmb-item',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbTextLinkComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  templateUrl: './bmb-item.component.html',
  styleUrl: './bmb-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbItemComponent {
  icon = input<string>('');
  iconSize = input<number>(20);
  label = input<string>('');
  value = input<string>('');
  valueLink = input<string>('');
  valueTarget = input<IBmbTargetLink>('_blank');
  supportText = input<string>('');
  isButton = input<boolean>(false);
  rightIcon = input<string>('');
  subLabel = input<string>('');

  action = output<MouseEvent>();

  constructor(private sanitizer: DomSanitizer) {}

  get safeValue(): SafeHtml {
    const clean = sanitizeContent(this.supportText());
    return this.sanitizer.bypassSecurityTrustHtml(clean);
  }

  handleClick(event: MouseEvent): void {
    this.action.emit(event);
  }
}
