import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from '../../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { CommonModule } from '@angular/common';
import { IBmbTargetLink } from '../../../types';

@Component({
  selector: 'bmb-navigation-icon',
  standalone: true,
  imports: [
    CommonModule,
    BmbCheckExternalLinkButtonComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-navigation-icon.component.html',
  styleUrl: './bmb-navigation-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNavigationIconComponent {
  idElement = input<string>();
  icon = input.required<string>();
  iconSize = input<number | undefined>();
  iconActiveToggle = input<string | undefined>();
  isToggleActive = model<boolean | undefined>(false);
  dotNotification = input<number>();
  target = input<IBmbTargetLink>();
  link = input<string>();

  buttonClick = output<void>();

  getIcon(): string {
    if (this.isToggleActive() && !!this.iconActiveToggle())
      return this.iconActiveToggle()!;
    return this.icon();
  }

  handleClick() {
    if (!!this.iconActiveToggle()) {
      this.isToggleActive.update((value) => !value);
    }

    this.buttonClick.emit();
  }
}
