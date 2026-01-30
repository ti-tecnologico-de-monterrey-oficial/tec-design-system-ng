import { Component, input } from '@angular/core';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';

@Component({
  selector: 'bmb-search-card-empty-state',
  standalone: true,
  imports: [BmbIconComponent, TranslatePipe, BmbVerticalLayoutDirective],
  templateUrl: './bmb-search-card-empty-state.component.html',
  styleUrl: './bmb-search-card-empty-state.component.scss',
})
export class BmbSearchCardEmptyStateComponent {
  inputHasValue = input<boolean>(false);
}
