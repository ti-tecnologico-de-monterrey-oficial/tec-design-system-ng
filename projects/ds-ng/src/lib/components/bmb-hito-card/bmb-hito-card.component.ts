import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { ITimelineEventType } from '../bmb-timestream/types';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

@Component({
  selector: 'bmb-hito-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbIconComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbBadgeComponent,
  ],
  templateUrl: './bmb-hito-card.component.html',
  styleUrl: './bmb-hito-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHitoCardComponent {
  icon = input<string>();
  title = input.required<string>();
  id = input.required<string | number>();
  short_description = input<string>('');
  type = input.required<ITimelineEventType>();
  sub_content = input<string>();
  enable_bullet = input<boolean>(false);

  handleClick = output<string | number>();

  getClassList(): string[] {
    const classList = ['bmb_hito-card'];
    if (this.enable_bullet()) classList.push('bmb_hito-card-bullet');

    return classList;
  }

  handleEventChange() {
    this.handleClick.emit(this.id());
  }

  formatBadgeText(legend: string): string {
    return legend.replace(/_/g, ' ');
  }

  appearanceBadge(): IBbmBgAppearance {
    console.log(this.type());

    switch (this.type()) {
      case 'active':
        return 'mitec_blue';
      case 'done':
        return 'success';
      case 'pending':
        return 'normal';
      case 'under_review':
        return 'warning';
      default:
        return 'mitec_blue';
    }
  }
}
