import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbHeaderSectionComponent,
  IBmbHeaderAction,
} from '../../bmb-header-section/bmb-header-section.component';
import { IBmbDataTopBar } from '../../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../../types/colors';

@Component({
  selector: 'bmb-home-card-header',
  standalone: true,
  imports: [CommonModule, BmbHeaderSectionComponent],
  templateUrl: './bmb-home-card-header.component.html',
  styleUrl: './bmb-home-card-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  leftIcon = input<string>();
  icon = input<string>();
  bgIconAppearance = input<IBmbColor>();
  isMobile = input<boolean>();

  onClose = output();
  onBack = output();

  isExpanded: boolean = false;

  getHeaderActions(): IBmbHeaderAction[] {
    return [
      {
        icon: this.getBehaviorIconName(),
        action: () => this.handleExpandChange(),
      },
    ];
  }

  getLeftIcon(): string {
    if (this.isExpanded && !!this.leftIcon()) return this.leftIcon()!;
    return '';
  }

  getIconName(): string {
    if (!!this.icon() && !this.isMobile()) return this.icon()!;
    return '';
  }

  getBehaviorIconName(): string {
    if (this.isMobile()) return 'close';
    if (this.isExpanded) return 'close_fullscreen';

    return 'fit_screen';
  }

  isHeader(): boolean {
    return this.getBehaviorIconName() !== 'close';
  }

  handleExpandChange(): void {
    if (this.isMobile()) {
      this.onClose.emit();
      return;
    }

    this.isExpanded = !this.isExpanded;
  }

  handleBack(): void {
    this.onBack.emit();
  }
}
