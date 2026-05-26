import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { isImage } from '../../utils/utils';

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
    if (isImage(this.iconName()))
      return this.iconName().substring(
        this.iconName().lastIndexOf('/') + 1,
        this.iconName().lastIndexOf('.'),
      );
    return this.iconName();
  }
}
