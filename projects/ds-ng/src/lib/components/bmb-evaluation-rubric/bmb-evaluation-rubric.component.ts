import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbFocusElementComponent } from '../bmb-focus-element/bmb-focus-element.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';
import {
  BmbInputComponent,
  IBmbInputAppearance,
} from '../bmb-input/bmb-input.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export interface IBmbEvaluationRubric {
  criterion: string;
  tooltip: string;
  evaluation?: number;
}

export interface IBmbCommentEvalRubric {
  label: string;
  placeHolder: string;
  tooltip: string;
  icon?: string;
  errorMessage?: string;
  helperMessage?: string;
  appearance?: IBmbInputAppearance;
  disabled?: boolean;
  isRequired?: boolean;
  showError?: boolean;
  showMaxTextLength?: boolean;
}

export interface IBmbEvalRubricButtons {
  rightLabel: string;
  rightIcon?: string;
  leftLabel: string;
  leftIcon?: string;
}

@Component({
  selector: 'bmb-evaluation-rubric',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbThreeColsComponent,
    BmbIconComponent,
    BmbTitleContentComponent,
    BmbActionIconComponent,
    BmbTooltipComponent,
    BmbFocusElementComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbDividerComponent,
    BmbInputComponent,
    BmbButtonDirective,
  ],
  templateUrl: './bmb-evaluation-rubric.component.html',
  styleUrl: './bmb-evaluation-rubric.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbEvaluationRubricComponent {
  title = input.required<string>();
  icon = input<string>('checklist_rtl');
  rightIcon = input<string>('close');
  evaluationRubricList = model.required<IBmbEvaluationRubric[]>();
  maxEval = input<number>(5);
  summaryLabel = input.required<string>();
  commentEvalRubric = input.required<IBmbCommentEvalRubric>();
  evalRubricButtons = input.required<IBmbEvalRubricButtons>();

  onClose = output();

  summary: number = 0;

  getEvalList(): number[] {
    const evalList: number[] = [];
    for (let index = 0; index < this.maxEval(); index++) {
      evalList.push(index + 1);
    }
    return evalList;
  }

  getSelectedButtonClass(evaluation: number, element: number): string {
    return evaluation === element ? '-active' : '';
  }

  getButtonClass(
    parentClassName: string,
    item: IBmbEvaluationRubric,
    element: number,
  ): string {
    return `${parentClassName}-button${this.getSelectedButtonClass(item.evaluation!, element)}`;
  }

  handleEval(criterion: string, evaluation: number) {
    this.evaluationRubricList.update((list) =>
      list.map((element) => {
        if (element['criterion'] === criterion) {
          element['evaluation'] = evaluation;
        }
        return element;
      }),
    );

    this.summary = this.evaluationRubricList().reduce(
      (accumulator, current) => accumulator + (current.evaluation || 0),
      0,
    );
  }

  handleClose(): void {
    this.onClose.emit();
  }
}
