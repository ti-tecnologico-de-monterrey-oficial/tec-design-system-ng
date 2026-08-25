import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbChatOption,
  BmbOptionsMessage,
  IBmbChatOptionEvent,
} from '../../types';
import { BmbItemInformativeTextComponent } from '../../../bmb-item/bmb-item-informative-text/bmb-item-informative-text.component';
import { BmbItemActionsComponent } from '../../../bmb-item/bmb-item-actions/bmb-item-actions.component';
import { BmbDividerComponent } from '../../../../bmb-divider/bmb-divider.component';
import { BmbVerticalLayoutDirective } from '../../../../../directives/old/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../../../directives/old/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';

@Component({
  selector: 'bmb-options-message',
  standalone: true,
  imports: [
    CommonModule,
    BmbItemInformativeTextComponent,
    BmbItemActionsComponent,
    BmbDividerComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  templateUrl: './bmb-options-message.component.html',
  styleUrl: './bmb-options-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsMessageComponent {
  /**
   * Options message contract.
   */
  readonly message = input.required<BmbOptionsMessage>();

  getOptionClicked = output<IBmbChatOptionEvent>();

  protected handleOptionClick(event: Event, option: BmbChatOption): void {
    this.getOptionClicked.emit({ event, option });
  }
}
