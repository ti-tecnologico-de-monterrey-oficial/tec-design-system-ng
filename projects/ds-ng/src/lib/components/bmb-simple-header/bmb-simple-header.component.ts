import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';

@Component({
  selector: 'bmb-simple-header',
  standalone: true,
  imports: [BmbLayoutDirective, BmbLayoutItemDirective, BmbActionIconComponent],
  template: `
    <section bmbLayout alignItems="center">
      <h4 bmbLayoutItem [isDynamicItem]="true" [colGrow]="1">{{ title() }}</h4>
      <span
        [style.color]="
          iconAlternativeColor()
            ? 'var(--buttons-primary-normal)'
            : 'currentColor'
        "
      >
        <bmb-action-icon
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
  iconAlternativeColor = input<boolean>(false);

  onIconClick = output<any>();

  handleClick(event: any): void {
    this.onIconClick.emit(event);
  }
}
