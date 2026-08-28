import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { getSVGName } from '../../_shared/logic/components/bot-icon';
import type { BmbBotIconName } from '../../_shared/types/components/bot-icon';

export type {
  BmbBotIconName,
  BmbBotIconPreset,
} from '../../_shared/types/components/bot-icon';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

@Component({
  selector: 'bmb-bot-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-bot-icon.component.html',
  styleUrl: './bmb-bot-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbBotIconComponent {
  iconName = input.required<BmbBotIconName>();

  get SVGName(): string {
    return getSVGName(this.iconName());
  }
}
