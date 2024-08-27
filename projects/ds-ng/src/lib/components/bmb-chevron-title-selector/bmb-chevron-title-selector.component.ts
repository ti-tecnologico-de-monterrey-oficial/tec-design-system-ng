import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-chevron-title-selector',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  styleUrl: './bmb-chevron-title-selector.component.scss',
  templateUrl: './bmb-chevron-title-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbChevronTitleSelectorComponent {
  title = input.required<string>();
  leadingIcon = input<string>();
  trailingIcon = input<string>();

  onLeadingClick = output();
  onTrailingClick = output();

  leftIcon = computed(() => this.leadingIcon() ?? 'chevron_left');
  rightIcon = computed(() => this.trailingIcon() ?? 'chevron_right');

  handleLeadingClick(event: any): void {
    this.onLeadingClick.emit(event);
  }

  handleTrailingClick(event: any): void {
    this.onTrailingClick.emit(event);
  }
}
