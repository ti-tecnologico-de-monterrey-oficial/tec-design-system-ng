import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHeaderMobileComponent } from '../bmb-header-mobile/bmb-header-mobile.component';
import { BmbBalanceOverviewComponent } from '../bmb-balance-overview/bmb-balance-overview.component';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';
import { BmbProgressBarComponent } from '../bmb-progress-bar/bmb-progress-bar.component';
import { DateTime } from 'luxon';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { MatDialog } from '@angular/material/dialog';
import { BmbModalComponent } from '../bmb-modal/bmb-modal.component';
import { ModalDataConfig } from '../bmb-modal/bmb-modal.interface';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { currencyFormat } from '../../utils/currencyFormat';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'bmb-account-statement',
  standalone: true,
  imports: [
    BmbHeaderMobileComponent,
    BmbBalanceOverviewComponent,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbProgressBarComponent,
    BmbDividerComponent,
    BmbButtonDirective,
    BmbModalComponent,
    BmbRadialComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './bmb-account-statement.component.html',
  styleUrl: './bmb-account-statement.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAccountStatementComponent implements AfterViewInit, OnInit {
  title = input<string>('Estado de cuenta');
  progressCircleTitle = input<string[]>(['Total a pagar', 'este mes']);
  labelPrimary = input<string>('Cuota Mensual');
  labelSecondary = input<string>('Pendiente');
  totalCount = input<number>(0);
  counter = input<number>(0);
  progressTitle = input<string>('Total pagado');
  formatDates = input<string>('yyyy-MM-dd');
  paymentDeadline = input<string>();
  cutOffDate = input<string>();
  paymentDeadlineLabel = input<string>('Fecha límite de pago:');
  cutOffDateLabel = input<string>('Fecha de corte:');
  payButtonLabel = input<string>('Pagar');
  backButtonLabel = input<string>('Regresar');
  modalTitle = input<string>('');
  modalSubtitle = input<string>('');
  modalRestLabel = input<string>('Pagar restante');
  modalOtherAmountLabel = input<string>('Otra cantidad');
  modalPrimaryButtonLabel = input<string>('Pagar');
  errorMessage = input<string>(
    'Error, Este campo es requerido y debe ser una cantidad entre 1 y ',
  );

  closeEvent = output<void>();
  backEvent = output<void>();
  payEvent = output<number>();

  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate?: TemplateRef<any>;

  newModal: TemplateRef<any> | null = null;
  customAmount: number = 0;
  isEnableCustomAmount: boolean = false;
  maxAmount: number = 0;

  amountForm: FormGroup = new FormGroup({
    amount: new FormControl<number>(0, [Validators.required]),
  });
  showErrors: { [key: string]: boolean } = {};

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.maxAmount = this.totalCount() - this.counter();
  }

  ngAfterViewInit(): void {
    if (this.modalTemplate) {
      this.newModal = this.modalTemplate;
    }
  }

  handleClose() {
    this.closeEvent.emit();
  }

  handleBack() {
    this.backEvent.emit();
  }

  handlePay() {
    const data: ModalDataConfig = {
      title: this.modalTitle(),
      subtitle: this.modalSubtitle(),
      content: this.newModal,
      size: 'large',
      hidePrimaryButton: true,
    };

    this.matDialog.open(BmbModalComponent, { data });
  }

  getFormattedDate(date?: string): string {
    if (!date) return '';
    const formatDate = DateTime.fromFormat(date, this.formatDates());
    return formatDate.toLocaleString({
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  getFormattedAmount(amount: number): string {
    return currencyFormat(amount);
  }

  handleActiveCustomAmount(event: any) {
    this.isEnableCustomAmount = event.value === 'modalOtherAmountInput';
  }

  onSubmit() {
    if (!this.isEnableCustomAmount) {
      this.payEvent.emit(this.totalCount() - this.counter());
    } else if (this.amountForm.valid) {
      const amount = Number(this.amountForm.controls['amount'].value);
      if (amount > 0 && amount <= this.maxAmount) {
        this.payEvent.emit(amount);
      } else {
        this.showErrors['amount'] = true;
      }
    } else {
      this.showErrors['amount'] = true;
    }
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
    return (100 * this.counter()) / this.totalCount();
  }
}
