import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-multi-dot-paginator-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-multi-dot-paginator-item.component.html',
  styleUrl: './bmb-multi-dot-paginator-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbMultiDotPaginatorItemComponent {
  @ViewChild('BmbMultiDotPaginatorItem', { static: true })
  multiDotPaginatorItem!: ElementRef;
}
