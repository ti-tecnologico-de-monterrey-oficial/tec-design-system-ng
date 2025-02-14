import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'bmb-list-items',
  standalone: true,
  imports: [],
  templateUrl: './bmb-list-items.component.html',
  styleUrl: './bmb-list-items.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbListItemsComponent {}
