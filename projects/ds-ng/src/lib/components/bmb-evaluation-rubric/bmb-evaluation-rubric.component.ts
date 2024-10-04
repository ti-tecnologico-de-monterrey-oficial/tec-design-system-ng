import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbHeaderSectionComponent,
  IBmbActionHeader,
} from '../bmb-header-section/bmb-header-section.component';
import { BmbFocusElementComponent } from '../bmb-focus-element/bmb-focus-element.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';

export interface IBmbEvaluationRubric {
  criterion: string;
  toolTip: string;
}

@Component({
  selector: 'bmb-evaluation-rubric',
  standalone: true,
  imports: [
    BmbHeaderSectionComponent,
    BmbTooltipComponent,
    BmbFocusElementComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbDividerComponent,
  ],
  templateUrl: './bmb-evaluation-rubric.component.html',
  styleUrl: './bmb-evaluation-rubric.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbEvaluationRubricComponent {
  title = input<string>('');
  icon = input<string>('');
  rightIcon = input<string>('');
  evaluationRubricList = input<IBmbEvaluationRubric[]>();
  maxEval = input<number>(5);

  onClose = output();

  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'close',
      action: () => this.handleClose(),
    },
  ];

  getEvalList(): number[] {
    const evalList: number[] = [];
    for (let index = 0; index < this.maxEval(); index++) {
      evalList.push(index + 1);
    }
    return evalList;
  }

  handleClose(): void {
    this.onClose.emit();
  }
}
