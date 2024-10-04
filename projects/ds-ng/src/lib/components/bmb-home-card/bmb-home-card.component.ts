import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHomeCardHeaderComponent } from './bmb-home-card-header/bmb-home-card-header.component';
import { IBmbDataTopBar } from '../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../types/colors';
import { IBmbActionHeader } from '../bmb-header-section/bmb-header-section.component';
import { SizeNames } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-home-card',
  standalone: true,
  imports: [BmbHomeCardHeaderComponent, CommonModule],
  templateUrl: './bmb-home-card.component.html',
  styleUrl: './bmb-home-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardComponent {
  title = input.required<string>();
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  leftIcon = input<string>();
  icon = input<string>();
  bgIconAppearance = input<IBmbColor>();
  actionHeaders = input<IBmbActionHeader[]>([]);
  isMobile = input<boolean>();
  contentPadding = input<SizeNames>('l');

  onClose = output();
  onBack = output();

  handleClose(): void {
    this.onClose.emit();
  }

  handleBack(): void {
    this.onBack.emit();
  }
}
