import {
  ChangeDetectionStrategy,
  Component,
  output,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { getUUID } from '../../_shared/logic/utils';

@Component({
  selector: 'bmb-overlay',
  standalone: true,
  templateUrl: './bmb-overlay.component.html',
  styleUrl: './bmb-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbOverlayComponent {
  active = input<boolean>(false);
  onClick = output<string>();
  uid = input<string>(getUUID());

  handleClick(): void {
    this.onClick.emit(this.uid());
  }
}
