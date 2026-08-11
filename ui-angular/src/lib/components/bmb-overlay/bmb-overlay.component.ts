import {
  ChangeDetectionStrategy,
  Component,
  output,
  input,
} from '@angular/core';
import { getUUID } from '@shared/logic/utils';

@Component({
  selector: 'bmb-overlay',
  standalone: true,
  templateUrl: './bmb-overlay.component.html',
  styleUrl: './bmb-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbOverlayComponent {
  active = input<boolean>(false);
  onClick = output<string>();
  uid = input<string>(getUUID());

  handleClick(): void {
    this.onClick.emit(this.uid());
  }
}
