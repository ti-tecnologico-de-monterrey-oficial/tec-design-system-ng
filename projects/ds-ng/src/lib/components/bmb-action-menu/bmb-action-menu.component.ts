import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbDataTopBar } from '../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../types/colors';
import { IBmbActionHeader, SizeNames } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-action-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-action-menu.component.html',
  styleUrl: './bmb-action-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbActionMenuComponent {
  title = input.required<string>();
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  leftIcon = input<string>();
  icon = input<string>();
  iconSize = input<number>(24);
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
