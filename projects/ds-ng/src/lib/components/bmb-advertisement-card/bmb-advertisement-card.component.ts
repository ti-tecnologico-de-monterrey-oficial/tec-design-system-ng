import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { IBmbAdvertisementData } from './types';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { BmbCarouselComponent } from '../bmb-carousel/bmb-carousel.component';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { TranslatePipe } from '../../pipes/translations';
import { handleImageNotFoundError } from '../../utils/utils';

@Component({
  selector: 'bmb-advertisement-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbHomeCardComponent,
    BmbCarouselComponent,
    BmbTabsComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-advertisement-card.component.html',
  styleUrl: './bmb-advertisement-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbAdvertisementCardComponent {
  data = model<IBmbAdvertisementData>();
  componentTitle = input<string>('');
  subtitle = input<string>('');

  title = input<string>(''); // deprecated

  imageNotFoundError = output<void>();

  expanded: boolean = false;
  selectedTabId: number = 0;
  tabsData: IBmbTab[] = [
    { id: 1, title: 'Promociones', isActive: true },
    { id: 2, title: 'Avisos' },
    { id: 3, title: 'Información' },
  ];

  handleImageNotFoundError(imageName: string, event: Event): void {
    handleImageNotFoundError(imageName, event);
    this.imageNotFoundError.emit();
  }
}
