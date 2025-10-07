import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'bmb-identity-spectrum',
  standalone: true,
  imports: [],
  templateUrl: './bmb-identity-spectrum.component.html',
  styleUrl: './bmb-identity-spectrum.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIdentitySpectrumComponent {}
