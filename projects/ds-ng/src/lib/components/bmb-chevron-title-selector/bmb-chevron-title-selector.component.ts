import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  EventEmitter,
  Output,
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
  @Input() title: string = '';
  @Input() leadingIcon: string = '';
  @Input() trailingIcon: string = '';

  @Output() onLeadingClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onTrailingClick: EventEmitter<void> = new EventEmitter<void>();

  handleLeadingClick() {
    this.onLeadingClick.emit();
  }

  handleTrailingClick() {
    this.onTrailingClick.emit();
  }
}
