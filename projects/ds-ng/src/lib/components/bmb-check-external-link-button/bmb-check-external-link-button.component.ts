import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { isExternalLink } from '../../utils/utils';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IBmbTargetLink } from '../../types';

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

  buttonPress = output<void>();
  buttonClick = output<void>();

  @ContentChild('commonTemplate') commonTemplate!: TemplateRef<any>;

  isExternalLink(link: string): boolean {
    return (!!link && isExternalLink(link)) || false;
  }

  isButton(isLink: boolean): boolean {
    return !isLink;
  }

  handlePress(event: any): void {
    this.buttonPress.emit();
    event.stopPropagation();
  }

  handleClick(event: any): void {
    this.buttonClick.emit();
    event.stopPropagation();
  }
}
