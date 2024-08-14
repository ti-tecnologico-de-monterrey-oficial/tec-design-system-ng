import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-home-card-header',
  standalone: true,
  imports: [BmbIconComponent, CommonModule],
  templateUrl: './bmb-home-card-header.component.html',
  styleUrl: './bmb-home-card-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
  icon = input<string>();
  isMobile = input<boolean>();

  onClose = output();
  onBack = output();

  isExpanded: boolean = false;

  getIconName(): string {
    return this.icon() || '';
  }

  getBehaviorIconName(): string {
    if (this.isMobile()) return 'close';
    if (this.isExpanded) return 'close_fullscreen';

    return 'fit_screen';
  }

  handleExpandChange(): void {
    if (this.isMobile()) this.onClose.emit();
    else this.isExpanded = !this.isExpanded;
  }

  handleBack(): void {
    this.onBack.emit();
  }
}
