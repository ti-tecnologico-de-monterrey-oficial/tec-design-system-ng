import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bmb-inner-header',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
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
  subTitle = input<string>('');
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
  onHandleBack = output<any>();
  onHandleClose = output<any>();
  searchData = output<string>();

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
