import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { IBmbColor } from '../../types/colors';
import { IBmbDataTopBar } from '../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbActionHeader } from '../bmb-header-section/bmb-header-section.component';
import { BmbTimestreamComponent } from '../bmb-timestream/bmb-timestream.component';

@Component({
  selector: 'bmb-timestream-card',
  standalone: true,
  imports: [BmbHomeCardComponent, BmbTimestreamComponent],
  templateUrl: './bmb-timestream-card.component.html',
  styleUrl: './bmb-timestream-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamCardComponent {
  icon = input<string>('trending_up');
  bgIconAppearance = input<IBmbColor>('mitec-red');
  title = input.required<string>();
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);

  isMobile: boolean = false;
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'tune',
      isToggleActive: false,
      action: () => {
        console.log('header click');
      },
    },
    {
      icon: 'tune',
      isToggleActive: false,
      action: () => {
        console.log('header click');
      },
    },
  ];
}
