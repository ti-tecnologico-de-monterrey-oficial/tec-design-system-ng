import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHeaderMobileComponent } from '../bmb-header-mobile/bmb-header-mobile.component';
import { BmbBalanceOverviewComponent } from '../bmb-balance-overview/bmb-balance-overview.component';
import { BmbCardComponent, BmbCardContentComponent } from '../bmb-card/bmb-card.component';
import { BmbProgressBarComponent } from '../bmb-progress-bar/bmb-progress-bar.component';
import { DateTime } from 'luxon';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbButtonDirective } from '../../directives/button.directive';

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
  ],
  templateUrl: './bmb-account-statement.component.html',
  styleUrl: './bmb-account-statement.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAccountStatementComponent {
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

  closeEvent = output<void>();
  backEvent = output<void>();


  handleClose() {
    this.closeEvent.emit();
  }

  handleBack() {
    this.backEvent.emit();
  }

  getFormatedDate(date?: string): string {
    if (!date) return '';
    const formatDate = DateTime.fromFormat(date, this.formatDates());
    return formatDate.toLocaleString({ day: '2-digit', month: 'short', year: 'numeric' });
  }
}
