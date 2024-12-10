import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BmbFormService } from '../../directives/bmb-form-control/bmb-form-control.service';

@Component({
  selector: 'bmb-inner-header',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BmbIconComponent,
    BmbInputComponent,
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
  toggleSearch = model<boolean>(false);

  // Event handlers
  onHandleTrailingPrimary = output<any>();
  onHandleTrailingSecondary = output<any>();
  onHandleBack = output<any>();
  onHandleClose = output<any>();
  searchData = output<string>();

  constructor(private formService: BmbFormService) {}

  handleBack(event: any): void {
    this.onHandleBack.emit(event);
  }

  handleClose(event: any): void {
    this.onHandleClose.emit(event);
  }

  handleShowSearch(): void {
    this.toggleSearch.set(true);
  }

  handleCloseSearch(): void {
    this.toggleSearch.set(false);
    this.formService.getFormControlByName('search').setValue('');
  }

  handleTrailingIconPrimary(event: any): void {
    this.onHandleTrailingPrimary.emit(event);
  }

  handleTrailingIconSecondary(event: any): void {
    this.onHandleTrailingSecondary.emit(event);
  }

  onSubmit(event?: Event): void {
    this.searchData.emit(this.formService.getFormControlByName('search').value);
    event?.preventDefault();
  }
}
