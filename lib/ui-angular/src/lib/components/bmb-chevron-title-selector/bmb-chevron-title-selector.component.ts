import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  effect,
} from '@angular/core';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { TranslatePipe } from '../../pipes/translations';

@Component({
  selector: 'bmb-chevron-title-selector',
  standalone: true,
  imports: [
    BmbThreeColsComponent,
    BmbTitleContentComponent,
    BmbActionIconComponent,
    TranslatePipe,
  ],
  styleUrl: './bmb-chevron-title-selector.component.scss',
  templateUrl: './bmb-chevron-title-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbChevronTitleSelectorComponent {
  componentTitle = input<string>(); // once title is removed, this should be required
  subtitle = input<string>();
  isIconSubtitle = input<boolean>();
  iconSubtitle = input<string>('');
  leadingIcon = input<string>('');
  trailingIcon = input<string>('');
  isDisabledLeadingIcon = input<boolean>(false);
  isDisabledTrailingIcon = input<boolean>(false);
  alternativeTextLeadingIcon = input<string>('');
  alternativeTextTrailingIcon = input<string>('');

  onLeadingClick = output();
  onTrailingClick = output();

  title = input<string>(); // deprecated

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );

      if (!deprecatedTitle && !newTitle) {
        throw new Error(
          'The "componentTitle" input is required. Please provide a value for it.',
        );
      }
    });
  }

  handleLeadingClick(event: any): void {
    this.onLeadingClick.emit(event);
  }

  handleTrailingClick(event: any): void {
    this.onTrailingClick.emit(event);
  }
}
