import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbFocusElementComponent } from '../bmb-focus-element/bmb-focus-element.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { IBmbNameValuePair } from '../../types';

@Component({
  selector: 'bmb-academic-progress',
  standalone: true,
  imports: [
    BmbContainerComponent,
    BmbFocusElementComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  styleUrl: './bmb-academic-progress.component.scss',
  template: `
    <bmb-container class="bmb_academic-progress-summary">
      <section
        class="bmb_academic-progress-summary-container"
        bmbLayout
        margin="none"
        justify="spaceAround"
        [dynamicCols]="true"
      >
        <bmb-focus-element
          bmbLayoutItem
          [title]="getName(accredited())"
          [number]="getValue(accredited())"
          [isNormal]="true"
          [isNonFocused]="true"
        />
        <bmb-focus-element
          bmbLayoutItem
          [title]="getName(average())"
          [number]="getValue(average())"
          [isNonFocused]="true"
        />
        <bmb-focus-element
          bmbLayoutItem
          [title]="getName(summary())"
          [number]="getValue(summary())"
          [isNormal]="true"
          [isNonFocused]="true"
        />
      </section>
    </bmb-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAcademicProgressComponent {
  accredited = input.required<IBmbNameValuePair>();
  average = input.required<IBmbNameValuePair>();
  summary = input.required<IBmbNameValuePair>();

  ngOnInit() {
    let inputs = [];
    let elements = '';
    if (!this.accredited()) inputs.push('accredited');
    if (!this.average()) inputs.push('average');
    if (!this.summary()) inputs.push('summary');

    inputs.forEach((element, index) => {
      elements += element;
      elements +=
        index == inputs.length - 2
          ? ' and '
          : inputs.length > 1 && index < inputs.length - 1
            ? ', '
            : '';
    });

    if (inputs.length) {
      throw new Error(
        `
        The "${elements}" input${inputs.length > 1 ? 's' : ''} ${inputs.length > 1 ? 'are' : 'is'} required.
        `,
      );
    }
  }

  getName(element: IBmbNameValuePair): string {
    return element?.name;
  }

  getValue(element: IBmbNameValuePair): number {
    return Number(element?.value);
  }
}
