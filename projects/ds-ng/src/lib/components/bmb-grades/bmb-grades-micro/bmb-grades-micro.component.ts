import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbChevronTitleSelectorComponent } from '../../bmb-chevron-title-selector/bmb-chevron-title-selector.component';
import { BmbAcademicProgressComponent } from '../../bmb-academic-progress/bmb-academic-progress.component';
import { IBmbNameValuePair } from '../../../types';
import { BmbContainerComponent } from '../../bmb-container/bmb-container.component';

@Component({
  selector: 'bmb-grades-micro',
  standalone: true,
  imports: [
    BmbContainerComponent,
    BmbChevronTitleSelectorComponent,
    BmbAcademicProgressComponent,
  ],
  template: `
    <bmb-container appearance="primary-home">
      <bmb-chevron-title-selector [title]="gradeTitle()" />
      <bmb-chevron-title-selector [title]="title()" />
      <bmb-academic-progress
        [accredited]="accredited()"
        [average]="average()"
        [summary]="summary()"
      />
    </bmb-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbGradesMicroComponent {
  gradeTitle = input.required<string>();
  title = input.required<string>();
  accredited = input.required<IBmbNameValuePair>();
  average = input.required<IBmbNameValuePair>();
  summary = input.required<IBmbNameValuePair>();
}
