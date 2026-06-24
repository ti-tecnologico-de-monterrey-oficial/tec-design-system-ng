import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { getSVGName } from '@ti-tecnologico-de-monterrey-oficial/core/component/bot-icon';

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
  iconName = input.required<string>();

  get SVGName(): string {
    return getSVGName(this.iconName());
  }
}