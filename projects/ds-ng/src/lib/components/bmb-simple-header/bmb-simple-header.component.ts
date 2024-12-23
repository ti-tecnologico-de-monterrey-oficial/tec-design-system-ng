import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbIconComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
} from '../../../public-api';

@Component({
  selector: 'bmb-simple-header',
  standalone: true,
  imports: [BmbLayoutDirective, BmbLayoutItemDirective, BmbIconComponent],
  template: `
    <section bmbLayout alignItems="center">
      <h4 bmbLayoutItem [isDynamicItem]="true" [colGrow]="1">{{ title() }}</h4>
      <section>
        <bmb-icon [icon]="icon()" [size]="24" />
      </section>
    </section>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSimpleHeaderComponent {
  title = input<string>('');
  icon = input<string>('');
}
