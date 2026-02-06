import { Component } from '@angular/core';
import { BmbLayoutDirective, BmbLayoutItemDirective, BmbSoundsCardComponent } from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'app-sound-layout',
  standalone: true,
  imports: [BmbSoundsCardComponent, BmbLayoutDirective, BmbLayoutItemDirective],
  templateUrl: './sound-layout.component.html',
  styleUrl: './sound-layout.component.scss'
})
export class SoundLayoutComponent {

}
