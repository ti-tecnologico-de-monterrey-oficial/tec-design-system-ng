import { Component,Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
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
})
export class BmbUserSummaryComponent {
  @Input() isProfile: boolean = false;
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() image: string = '';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  handleClick(): void {
    this.onClick.emit();
  }
}
