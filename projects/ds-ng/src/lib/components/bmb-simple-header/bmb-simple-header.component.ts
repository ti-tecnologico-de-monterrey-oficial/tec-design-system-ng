import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
} from '../../../public-api';
import { BmbNavigationIconComponent } from '../bmb-navigation-bar/bmb-navigation-icon/bmb-navigation-icon.component';

@Component({
  selector: 'bmb-simple-header',
  standalone: true,
  imports: [
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbNavigationIconComponent,
  ],
  template: `
    <section bmbLayout alignItems="center">
      <h4 bmbLayoutItem [isDynamicItem]="true" [colGrow]="1">{{ title() }}</h4>
      <span>
        <bmb-navigation-icon
          [icon]="icon()"
          [iconSize]="24"
          (buttonClick)="handleClick($event)"
        />
      </span>
    </section>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSimpleHeaderComponent {
  title = input<string>('');
  icon = input<string>('');

  onIconClick = output<any>();

  handleClick(event: any): void {
    this.onIconClick.emit(event);
  }
}
