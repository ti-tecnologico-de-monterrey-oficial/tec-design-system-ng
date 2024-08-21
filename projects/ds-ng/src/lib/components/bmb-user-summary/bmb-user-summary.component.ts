import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';

@Component({
  selector: 'bmb-user-summary',
  standalone: true,
  imports: [CommonModule, BmbButtonDirective, BmbUserImageComponent],
  templateUrl: './bmb-user-summary.component.html',
  styleUrl: './bmb-user-summary.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserSummaryComponent {
  @Input() isProfile: boolean = false;
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() image: string = '';
  @Input() infoCareer: string = '';
  @Input() noBox: boolean = false;

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  handleClick(): void {
    this.onClick.emit();
  }
}
