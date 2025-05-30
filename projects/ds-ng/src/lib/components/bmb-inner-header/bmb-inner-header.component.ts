import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';

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
  ],
  styleUrl: './bmb-inner-header.component.scss',
  templateUrl: './bmb-inner-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInnerHeaderComponent {
  title = input<string>('');
  placeholderSearch = input<string>('');
  subTitle = input<string>(''); //Deprecated
  trailingIconPrimary = input<string>('');
  trailingIconSecondary = input<string>('');
  showClose = input<boolean>(false);
  showReturn = input<boolean>(false);
  showSearch = input<boolean>(false);
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
