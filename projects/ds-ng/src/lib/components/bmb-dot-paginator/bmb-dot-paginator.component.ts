import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Target } from './bmb-dot-paginator.interface';

@Component({
  selector: 'bmb-dot-paginator',
  standalone: true,
  styleUrl: './bmb-dot-paginator.component.scss',
  imports: [CommonModule],
  templateUrl: './bmb-dot-paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
