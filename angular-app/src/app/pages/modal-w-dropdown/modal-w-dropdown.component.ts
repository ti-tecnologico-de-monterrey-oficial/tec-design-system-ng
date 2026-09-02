import { Component, input } from '@angular/core';
import { BmbDropdownComponent } from 'ui-angular';

@Component({
  selector: 'app-modal-w-dropdown',
  standalone: true,
  imports: [BmbDropdownComponent],
  templateUrl: './modal-w-dropdown.component.html',
  styleUrl: './modal-w-dropdown.component.scss',
})
export class ModalWDropdownComponent {
  isFilterable = input.required<boolean>();
}
