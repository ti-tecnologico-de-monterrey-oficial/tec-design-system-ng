import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IBmbTargetLink } from '../../types';
import {
  isButton,
  isButtonExternalLink,
} from '@ti-tecnologico-de-monterrey-oficial/core/logic/components/check-external-link-button';

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

  commonTemplate = contentChild<TemplateRef<any>>('commonTemplate');

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