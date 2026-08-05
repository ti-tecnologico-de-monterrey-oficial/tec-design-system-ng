import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHomeCardHeaderComponent } from './bmb-home-card-header/bmb-home-card-header.component';
import { IBmbDataTopBar } from '../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../types/colors';
import { IBmbActionHeader, SizeNames } from '../../types';
import { CommonModule } from '@angular/common';
import { IBotType } from '../bmb-chat-bar/types';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';

@Component({
  selector: 'bmb-home-card',
  standalone: true,
  imports: [CommonModule, BmbHomeCardHeaderComponent],
  templateUrl: './bmb-home-card.component.html',
  styleUrl: './bmb-home-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardComponent {
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  leftIcon = input<string>();
  icon = input<string>();
  iconSize = input<number>(24);
  bgIconAppearance = input<IBmbColor>();
  actionHeaders = input<IBmbActionHeader[]>([]);
  isMobile = input<boolean>();
  contentPadding = input<SizeNames>('l');
  showRightButton = input<boolean>(true);
  isExpanded = model<boolean>(false);
  currentBot = model<IBotType>();
  componentTitle = input<string>(); // once title is removed, this should be required

  title = input<string>(); // deprecated

  onClose = output();
  onBack = output();
  onExpandClick = output();

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );

      if (!deprecatedTitle && !newTitle) {
        throw new Error(
          'The "componentTitle" input is required. Please provide a value for it.',
        );
      }
    });
  }

  handleClose(): void {
    this.onClose.emit();
  }

  handleBack(): void {
    this.onBack.emit();
  }

  handleExpand(): void {
    this.onExpandClick.emit();
  }
}
