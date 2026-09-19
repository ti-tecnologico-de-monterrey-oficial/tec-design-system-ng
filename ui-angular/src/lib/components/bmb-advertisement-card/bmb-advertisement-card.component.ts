import { CommonModule } from '@angular/common';
import { handleImageNotFoundError } from '../../_shared/logic/utils';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { IBmbAdvertisementData } from '../../_shared/types/components/advertisement-card';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { BmbCarouselComponent } from '../bmb-carousel/bmb-carousel.component';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { TranslatePipe } from '../../pipes/translations';
import { BmbTranslationsService } from '../../services/translations/translations.service';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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
  private readonly translationsService = inject(BmbTranslationsService);

  data = model<IBmbAdvertisementData>();
  componentTitle = input<string>('');
  subtitle = input<string>('');

  title = input<string>(''); // deprecated

  imageNotFoundError = output<void>();

  expanded = false;
  selectedTabId = 0;
  tabsData = signal<IBmbTab[]>([]);

  constructor() {
    effect(() => {
      this.tabsData.set([
        { id: 1, title: this.translationsService.translate('advertisement_card.tabs.promotions'), isActive: true },
        { id: 2, title: this.translationsService.translate('advertisement_card.tabs.announcements') },
        { id: 3, title: this.translationsService.translate('advertisement_card.tabs.information') },
      ]);
    });
  }

  handleImageNotFoundError(imageName: string, event: Event): void {
    handleImageNotFoundError(imageName, event);
    this.imageNotFoundError.emit();
  }
}
