import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  BmbBadgeComponent,
  BmbBoxIconComponent,
  BmbContainerButtonBaseComponent,
  BmbGradeValueComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbTitleComponent,
  BmbVerticalLayoutDirective,
  BmbSimpleTextComponent,
} from 'ui-angular';

@Component({
  selector: 'app-templates-container-btn',
  imports: [
    BmbBadgeComponent,
    BmbBoxIconComponent,
    BmbContainerButtonBaseComponent,
    BmbGradeValueComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTitleComponent,
    BmbVerticalLayoutDirective,
    BmbSimpleTextComponent,
  ],
  templateUrl: './templates-container-btn.html',
})
export class TemplatesContainerBtn {
  readonly isMobile = toSignal(
    inject(BreakpointObserver)
      .observe('(width < 1001px)')
      .pipe(map(({ matches }) => matches)),
    { initialValue: false },
  );
}
