import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { BmbNavigationIconComponent } from '../bmb-navigation-bar/bmb-navigation-icon/bmb-navigation-icon.component';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';

@Component({
  selector: 'bmb-chevron-title-selector',
  standalone: true,
  imports: [
    BmbThreeColsComponent,
    BmbTitleContentComponent,
    BmbNavigationIconComponent,
  ],
  styleUrl: './bmb-chevron-title-selector.component.scss',
  templateUrl: './bmb-chevron-title-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbChevronTitleSelectorComponent {
  title = input.required<string>();
  subtitle = input<string>();
  isIconSubtitle = input<boolean>();
  iconSubtitle = input<string>('');
  leadingIcon = input<string>('');
  trailingIcon = input<string>('');

  onLeadingClick = output();
  onTrailingClick = output();

  handleLeadingClick(event: any): void {
    this.onLeadingClick.emit(event);
  }

  handleTrailingClick(event: any): void {
    this.onTrailingClick.emit(event);
  }
}
