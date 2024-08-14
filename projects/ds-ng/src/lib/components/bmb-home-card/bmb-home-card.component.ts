import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
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
  title = input.required<string>();
  subtitle = input<string>();
  icon = input<string>();
  isMobile = input<boolean>();

  onClose = output();
  onBack = output();

  handleClose(): void {
    this.onClose.emit();
  }

  handleBack(): void {
    this.onBack.emit();
  }
}
