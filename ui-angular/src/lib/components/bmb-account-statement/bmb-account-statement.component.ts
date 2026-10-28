import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbBalanceOverviewComponent } from '../bmb-balance-overview/bmb-balance-overview.component';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';
import { BmbProgressBarComponent } from '../bmb-progress-bar/bmb-progress-bar.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { currencyFormat } from '../../_shared/logic/currencyFormat';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbInnerHeaderComponent } from '../bmb-inner-header/bmb-inner-header.component';
import { BmbNativeModalService } from '../../services/old/modal/native-modal.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IBmbNativeModal as IBmbNativeModalGeneric } from '../../_shared/types';

type IBmbNativeModal = IBmbNativeModalGeneric<TemplateRef<any>>;
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translations';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import {
  getAccountStatementFormattedDate,
  getAccountStatementProgressPercent,
  isAccountStatementCustomAmountSelected,
  resolveAccountStatementPaymentAmount,
} from '../../_shared/logic/components/account-statement';

@Component({
  selector: 'bmb-account-statement',
  standalone: true,
  imports: [
    BmbBalanceOverviewComponent,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbProgressBarComponent,
    BmbDividerComponent,
    BmbButtonDirective,
    BmbRadialComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbInputComponent,
    ReactiveFormsModule,
    BmbInnerHeaderComponent,
    CommonModule,
    TranslatePipe,
  ],
  templateUrl: './bmb-account-statement.component.html',
  styleUrl: './bmb-account-statement.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAccountStatementComponent implements AfterViewInit, OnInit {
  progressCircleTitle = input<string | string[]>('');
  labelPrimary = input<string>();
  labelSecondary = input<string>();
  totalCount = input<number>(0);
  counter = input<number>(0);
  progressTitle = input<string>();
  formatDates = input<string>('yyyy-MM-dd');
  paymentDeadline = input<string>();
  cutOffDate = input<string>();
  paymentDeadlineLabel = input<string>();
  cutOffDateLabel = input<string>();
  payButtonLabel = input<string>();
  backButtonLabel = input<string>();
  modalTitle = input<string>();
  modalSubtitle = input<string>();
  modalRestLabel = input<string>();
  modalOtherAmountLabel = input<string>();
  modalPrimaryButtonLabel = input<string>();
  errorMessage = input<string>();
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  closeEvent = output<MouseEvent>();
  backEvent = output<MouseEvent>();
  payEvent = output<number>();

  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate?: TemplateRef<any>;

  newModal: TemplateRef<any> | null = null;
  customAmount = 0;
  isEnableCustomAmount = false;
  maxAmount = 0;
  modalID = signal<string | null>(null);

  amountForm: FormGroup = new FormGroup({
    amount: new FormControl<number>(0, [Validators.required]),
  });
  showErrors: { [key: string]: boolean } = {};

  modalService: BmbNativeModalService = inject(BmbNativeModalService);

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

  ngOnInit(): void {
    this.maxAmount = this.totalCount() - this.counter();
  }

  ngAfterViewInit(): void {
    if (this.modalTemplate) {
      this.newModal = this.modalTemplate;
    }
  }

  handleClose(event?: MouseEvent) {
    this.closeEvent.emit(event || new MouseEvent('click'));
  }

  handleBack(event?: MouseEvent) {
    this.backEvent.emit(event || new MouseEvent('click'));
  }

  handlePay() {
    const data: IBmbNativeModal = {
      title: this.modalTitle(),
      subtitle: this.modalSubtitle(),
      content: this.newModal,
      size: 'large',
    };

    this.modalID.set(this.modalService.openModal(data));
  }

  getFormattedDate(date?: string): string {
    return getAccountStatementFormattedDate(date, this.formatDates());
  }

  getFormattedAmount(amount: number): string {
    return currencyFormat(amount);
  }

  handleActiveCustomAmount(event: any) {
    this.isEnableCustomAmount = isAccountStatementCustomAmountSelected(
      event.value,
    );
  }

  handleSubmit() {
    const { amount, hasError } = resolveAccountStatementPaymentAmount(
      this.isEnableCustomAmount,
      this.amountForm.valid,
      Number(this.amountForm.controls['amount'].value),
      this.totalCount(),
      this.counter(),
      this.maxAmount,
    );
    if (hasError) {
      this.showErrors['amount'] = true;
      return;
    }
    this.payEvent.emit(amount as number);
    this.modalService.closeModal(this.modalID() as string);
    this.modalID.set(null);
  }

  getFormControl(name: string): FormControl {
    return this.amountForm.get(name) as FormControl;
  }

  updateErrorState() {
    Object.keys(this.amountForm.controls).forEach((field) => {
      const control = this.amountForm.get(field);
      if (control instanceof FormControl) {
        this.showErrors[field] =
          control.invalid && (control.touched || control.dirty);
      }
    });
  }

  getProgressPercent(): number {
    return getAccountStatementProgressPercent(
      this.counter(),
      this.totalCount(),
    );
  }

  customHandleClick() {
    const { amount, hasError } = resolveAccountStatementPaymentAmount(
      this.isEnableCustomAmount,
      this.amountForm.valid,
      Number(this.amountForm.controls['amount'].value),
      this.totalCount(),
      this.counter(),
      this.maxAmount,
    );
    if (hasError) {
      this.showErrors['amount'] = true;
      return;
    }
    this.payEvent.emit(amount as number);
  }
}
