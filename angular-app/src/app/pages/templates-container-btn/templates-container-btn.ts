import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  BmbBadgeComponent,
  BmbCheckboxComponent,
  BmbContainerButtonBaseComponent,
  BmbGradeValueComponent,
  BmbIconComponent,
  BmbLayoutDirective,
  BmbVerticalLayoutDirective,
  BmbSimpleTextComponent,
  BmbDividerComponent,
  BmbUserImageComponent,
} from 'ui-angular';

@Component({
  selector: 'app-templates-container-btn',
  imports: [
    BmbBadgeComponent,
    BmbCheckboxComponent,
    BmbContainerButtonBaseComponent,
    BmbGradeValueComponent,
    BmbIconComponent,
    BmbLayoutDirective,
    BmbVerticalLayoutDirective,
    BmbSimpleTextComponent,
    BmbDividerComponent,
    BmbUserImageComponent,
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
