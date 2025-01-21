import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbHeaderSectionComponent } from '../../bmb-header-section/bmb-header-section.component';
import { IBmbDataTopBar } from '../../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../../types/colors';
import { IBmbActionHeader } from '../../../types';

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
  iconSize = input<number>();
  bgIconAppearance = input<IBmbColor>();
  actionHeaders = input<IBmbActionHeader[]>([]);
  isMobile = input<boolean>();

  onClose = output();
  onBack = output();

  isExpanded: boolean = false;
  actionHomeHeader: IBmbActionHeader = {
    icon: this.isMobile() ? 'close' : 'fit_screen',
    iconActiveToggle: this.isMobile() ? '' : 'close_fullscreen',
    isToggleActive: false,
    action: () => this.handleExpandChange(),
  };
  actionHeaderList: IBmbActionHeader[] = [];

  ngOnInit(): void {
    this.actionHeaderList = [...this.actionHeaders(), this.actionHomeHeader];
  }

  getLeftIcon(): string {
    if (this.isExpanded && !!this.leftIcon()) return this.leftIcon()!;
    return '';
  }

  getIconName(): string {
    if (!!this.icon() && !this.isMobile()) return this.icon()!;
    return '';
  }

  getDataLocalNav(): IBmbDataTopBar[] {
    if (this.isMobile()) return [];
    return this.dataLocalNav();
  }

  handleBack(): void {
    this.onBack.emit();
  }

  handleExpandChange(): void {
    if (this.isMobile()) {
      this.onClose.emit();
      return;
    }

    this.isExpanded = !this.isExpanded;
  }
}
