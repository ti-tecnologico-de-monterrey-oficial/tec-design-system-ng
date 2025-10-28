import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';

@Component({
  selector: 'bmb-icon-item',
  standalone: true,
  imports: [
    BmbIconComponent,
    BmbDividerComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './bmb-icon-item.component.html',
  styleUrl: './bmb-icon-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIconItemComponent {
  icon = input<string>('');
  iconSize = input<number>(24);
  label = input.required<string>();
  value = input.required<string>();
  showDivider = input<boolean>(true);

  constructor(private sanitizer: DomSanitizer) {}

  get safeValue(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.value());
  }
}
