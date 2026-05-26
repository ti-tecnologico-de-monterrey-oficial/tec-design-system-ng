import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { TranslatePipe } from '../../pipes/translations';

@Component({
  selector: 'bmb-inner-header',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbThreeColsComponent,
    BmbActionIconComponent,
    BmbTitleContentComponent,
    BmbInputComponent,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  styleUrl: './bmb-inner-header.component.scss',
  templateUrl: './bmb-inner-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInnerHeaderComponent {
  componentTitle = input<string>();
  placeholderSearch = input<string>('');
  trailingIconPrimary = input<string>('');
  trailingIconSecondary = input<string>('');
  disableTrailingIconPrimary = input<boolean>(false);
  disableTrailingIconSecondary = input<boolean>(false);
  alternativeTextTrailingIconPrimary = input<string>('');
  alternativeTextTrailingIconSecondary = input<string>('');
  showBack = input<boolean>(false);
  showClose = input<boolean>(false);
  showReturn = input<boolean>(false);
  showSearch = input<boolean>(false);

  title = input<string>(''); // deprecated

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }

  toggleSearch = signal<boolean>(false);

  searchForm: FormGroup = new FormGroup({
    search: new FormControl<string>(''),
  });

  // Event handlers
  onHandleTrailingPrimary = output<any>();
  onHandleTrailingSecondary = output<any>();
  onHandleBack = output<MouseEvent>();
  onHandleClose = output<MouseEvent>();
  searchData = output<string>();

  getLeftIcon(): string {
    if (!this.showClose() && this.showReturn()) return 'arrow_back';
    if (this.showClose() && !this.showReturn()) return 'close';

    return '';
  }

  handleBack(event: any): void {
    this.onHandleBack.emit(event);
  }

  handleClose(event: any): void {
    this.onHandleClose.emit(event);
  }

  handleSearch(): void {
    this.toggleSearch.set(!this.toggleSearch());
  }

  handleTrailingIconPrimary(event: any): void {
    this.onHandleTrailingPrimary.emit(event);
  }

  handleTrailingIconSecondary(event: any): void {
    this.onHandleTrailingSecondary.emit(event);
  }

  onSubmit() {
    const searchValue = this.searchForm.get('search')?.value || '';
    this.searchData.emit(searchValue);
  }

  getFormControl(search: string): FormControl {
    return this.searchForm.get(search) as FormControl;
  }
}
