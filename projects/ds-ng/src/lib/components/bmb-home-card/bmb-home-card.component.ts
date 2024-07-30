import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHomeCardHeaderComponent } from './bmb-home-card-header/bmb-home-card-header.component';

@Component({
  selector: 'bmb-home-card',
  standalone: true,
  imports: [BmbHomeCardHeaderComponent],
  templateUrl: './bmb-home-card.component.html',
  styleUrl: './bmb-home-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() icon?: string;
  @Input() isMobile?: boolean = false;

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBack: EventEmitter<void> = new EventEmitter<void>();

  isExpanded: boolean = false;

  handleExpandChange(expanded: boolean): void {
    this.isExpanded = expanded;
  }

  handleClose(): void {
    this.onClose.emit();
  }

  handleBack(): void {
    this.onBack.emit();
  }
}
