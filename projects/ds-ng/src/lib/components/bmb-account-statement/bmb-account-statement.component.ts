import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHeaderMobileComponent } from '../bmb-header-mobile/bmb-header-mobile.component';
import { BmbBalanceOverviewComponent } from '../bmb-balance-overview/bmb-balance-overview.component';

@Component({
  selector: 'bmb-account-statement',
  standalone: true,
  imports: [BmbHeaderMobileComponent, BmbBalanceOverviewComponent],
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
  valuePrimary = input<number>(0);
  valueSecondary = input<number>(0);

  closeEvent = output<void>();

  handleClose() {
    this.closeEvent.emit();
  }
}
