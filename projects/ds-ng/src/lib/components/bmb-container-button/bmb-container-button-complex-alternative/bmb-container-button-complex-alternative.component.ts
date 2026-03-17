import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbBookmarkComponent } from '../../bmb-bookmark/bmb-bookmark.component';
import {
  IBmbAlertColors,
  IBmbBaseColors,
  IBmbCreativeBaseColors,
  IBmbCreativeUseColors,
  IBmbmitecBaseColors,
  IBmbMitecInstitutionalColors,
  IBmbSemanticBaseColors,
  IBmbSemanticColors,
} from '../../../types';

@Component({
  selector: 'bmb-container-button-complex-alternative',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerButtonBaseComponent,
    BmbBoxIconComponent,
    BmbTitleComponent,
    BmbBookmarkComponent,
  ],
  templateUrl: './bmb-container-button-complex-alternative.component.html',
  styleUrl: './bmb-container-button-complex-alternative.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbContainerButtonComplexAlternativeComponent {
  componentTitle = input.required<string>();
  subtitle = input<string>('');
  leftIconName = input.required<string>();
  iconImageAlt = input<string>('');
  leftIconBoxColor = input<
    | IBmbBaseColors
    | IBmbmitecBaseColors
    | IBmbCreativeBaseColors
    | IBmbSemanticBaseColors
    | IBmbSemanticColors
    | IBmbMitecInstitutionalColors
    | IBmbCreativeUseColors
    | IBmbAlertColors
  >();
  isDisabled = input<boolean>(false);
  isError = input<boolean>(false);
  isBookmarkActive = model<boolean>(false);

  getClickButton = output<MouseEvent>();
  getClickBookmark = output<MouseEvent>();

  handleClick(event: any): void {
    this.getClickButton.emit(event);
  }

  handleClickBookmark(event: any): void {
    this.getClickBookmark.emit(event);
  }
}
