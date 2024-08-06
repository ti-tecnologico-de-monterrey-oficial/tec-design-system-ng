import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-home-card-header',
  standalone: true,
  imports: [BmbIconComponent, CommonModule],
  templateUrl: './bmb-home-card-header.component.html',
  styleUrl: './bmb-home-card-header.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() icon?: string;
  @Input() isMobile?: boolean = false;
  @Input() isExpanded: boolean = false;

  @Output() onExpandChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBack: EventEmitter<void> = new EventEmitter<void>();

  getIconName(): string {
    if (this.isMobile) return 'close';
    if (this.isExpanded) return 'close_fullscreen';

    return 'fit_screen';
  }

  handleExpandChange(): void {
    if (this.isMobile) this.onClose.emit();
    else this.onExpandChange.emit(!this.isExpanded);
  }

  handleBack(): void {
    this.onBack.emit();
  }
}
