import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Props, Target } from './bmb-dot-paginator.interface';

@Component({
  selector: 'bmb-dot-paginator',
  templateUrl: './bmb-dot-paginator.component.html',
  styleUrls: ['../../../assets/styles/components/_dot-paginator.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDotPaginatorComponent {
  @Input() activeDotIndex?: number = 0;
  @Input() totalDots?: number = 0;
  @Input() targets: Target[] = [];
  @Output() onDotPress: EventEmitter<number> = new EventEmitter<number>();

  getDotsArray(): number[] {
    return new Array(this.totalDots || 0).fill(0).map((_, i) => i);
  }

  onDotClicked(index: number): void {
    this.activeDotIndex = index;
    this.onDotPress.emit(index);
  }
}
