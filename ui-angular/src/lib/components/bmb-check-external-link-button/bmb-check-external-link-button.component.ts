import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  isButton,
  isButtonExternalLink,
} from '../../_shared/logic/components/check-external-link-button';
import type { IBmbTargetLink } from '../../_shared/types/utils';

@Component({
  selector: 'bmb-check-external-link-button',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './bmb-check-external-link-button.component.html',
  styleUrl: './bmb-check-external-link-button.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbCheckExternalLinkButtonComponent {
  idElement = input<string | undefined>('');
  link = input<string>('');
  target = input<IBmbTargetLink>('_blank');
  disabled = input<boolean>(false);
  buttonName = input<string>('button');

  buttonPress = output<MouseEvent>();
  buttonClick = output<MouseEvent>();
  buttonKeyPress = output<KeyboardEvent>();

  isExternalLink(link: string): boolean {
    return isButtonExternalLink(link);
  }

  isButton(isLink: boolean): boolean {
    return isButton(isLink);
  }

  handlePress(event: MouseEvent): void {
    event.stopPropagation();
    this.buttonPress.emit(event);
  }

  handleClick(event: MouseEvent): void {
    event.stopPropagation();
    this.buttonClick.emit(event);
  }

  handleKeyPress(event: KeyboardEvent): void {
    this.buttonKeyPress.emit(event);
  }
}
