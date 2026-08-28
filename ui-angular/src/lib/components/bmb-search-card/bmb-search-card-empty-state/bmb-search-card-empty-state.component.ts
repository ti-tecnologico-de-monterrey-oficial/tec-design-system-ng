import { Component, input, inject } from '@angular/core';
import { BmbTranslationsService } from '../../../services/translations/translations.service';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';

@Component({
  selector: 'bmb-search-card-empty-state',
  standalone: true,
  imports: [BmbIconComponent, BmbVerticalLayoutDirective],
  templateUrl: './bmb-search-card-empty-state.component.html',
  styleUrl: './bmb-search-card-empty-state.component.scss',
})
export class BmbSearchCardEmptyStateComponent {
  inputHasValue = input<boolean>(false);
  noResultsTitle = input<string>();
  placeholderTitle = input<string>();
  placeholderParagraph = input<string>();
  icon = input<string>('quiz');

  translationService = inject(BmbTranslationsService);

  getTitleText = () => {
    if (this.inputHasValue()) {
      return (
        this.noResultsTitle() ||
        this.translationService.translate(
          'search_card.empty_state.no_results_title',
        )
      );
    } else {
      return (
        this.placeholderTitle() ||
        this.translationService.translate(
          'search_card.empty_state.new_search_card_title',
        )
      );
    }
  };
}
