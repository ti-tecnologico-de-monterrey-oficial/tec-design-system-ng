import { CommonModule } from '@angular/common';
import { Component, output, input } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { getUUID } from '../../utils/utils';

@Component({
  selector: 'bmb-overlay',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './bmb-overlay.component.html',
  styleUrl: './bmb-overlay.component.scss',
})
export class BmbOverlayComponent {
  active = input<boolean>(false);
  onClick = output<string>();
  uid = input<string>(getUUID());

  handleClick() {
    this.onClick.emit(this.uid());
  }
}
