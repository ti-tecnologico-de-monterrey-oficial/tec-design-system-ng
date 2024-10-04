import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'bmb-bmb-portal',
  standalone: true,
  imports: [],
  templateUrl: './bmb-portal.component.html',
  styleUrl: './bmb-portal.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbPortalComponent {}
