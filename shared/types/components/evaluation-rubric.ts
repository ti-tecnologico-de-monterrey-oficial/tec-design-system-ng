import type { IBmbInputAppearance } from '../input';

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
