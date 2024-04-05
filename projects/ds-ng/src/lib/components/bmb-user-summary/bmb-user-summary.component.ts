import { Component,Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from '../../directives/button.directive';

@Component({
  selector: 'bmb-user-summary',
  standalone: true,
  imports: [CommonModule, BmbButtonDirective],
  templateUrl: './bmb-user-summary.component.html',
  styleUrl: './bmb-user-summary.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BmbUserSummaryComponent {
  @Input() isProfile: boolean = false;
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() profilePic: string = '';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  handleClick(): void {
    this.onClick.emit();
  }
}
