import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BmbOverlayComponent } from '../bmb-overlay/bmb-overlay.component';
import { IButtonAppearance } from '../../types';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { CommonModule } from '@angular/common';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { IBmbModalType, IBmbModalAlertStyle } from './bmb-modal.interface';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

export interface IBmbActionButton {
  buttonName: string;
  appearance?: IButtonAppearance;
  label: string;
  icon?: string;
}

@Component({
  selector: 'bmb-native-modal',
  template: ``,
  styleUrls: ['./bmb-native-modal.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bmb-native-modal.component.html',
  imports: [
    BmbOverlayComponent,
    BmbButtonDirective,
    CommonModule,
    BmbThreeColsComponent,
    BmbTitleContentComponent,
    BmbActionIconComponent,
  ],
})
export class BmbNativeModalComponent {
  title = input<string>('');
  subtitle = input<string>('');
  content = input<TemplateRef<any> | string>('');
  actions = input<IBmbActionButton[]>([]);
  type = input<IBmbModalType>();
  alertIcon = input<IBmbModalAlertStyle>();
  modalID = input.required<string>();

  actionsClicked = output<{ buttonName: string; event: MouseEvent }>();
  constructor() {}

  svgUrl: string = 'assets/svg/';

  isTemplateRef(): boolean {
    return (
      typeof this.content() !== 'string' &&
      this.content() instanceof TemplateRef
    );
  }

  getContent(): any {
    return this.content() instanceof TemplateRef ? this.content() : null;
  }

  handleButtonClick(buttonName: string, event: MouseEvent): void {
    this.actionsClicked.emit({ buttonName, event });
  }

  getIcon(): string {
    if (this.type() === 'alert') {
      if (this.alertIcon() === 'primary') {
        return `${this.svgUrl}info_fill_${this.alertIcon()}.svg`;
      }
      if (this.alertIcon() === 'neutral') return `${this.svgUrl}info_fill.svg`;
      if (
        this.alertIcon() === 'error' ||
        this.alertIcon() === 'event' ||
        this.alertIcon() === 'success' ||
        this.alertIcon() === 'warning'
      )
        return `${this.svgUrl}${this.alertIcon()}_fill.svg`;

      return `${this.svgUrl}info_fill.svg`;
    }

    return '';
  }

  handleCloseModal(event: MouseEvent): void {
    this.actionsClicked.emit({ buttonName: 'close', event });
  }
}
