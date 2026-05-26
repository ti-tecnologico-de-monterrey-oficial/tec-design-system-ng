import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';

@Component({
  selector: 'bmb-simple-header',
  standalone: true,
  imports: [BmbLayoutDirective, BmbLayoutItemDirective, BmbActionIconComponent],
  template: `
    <section bmbLayout alignItems="center">
      <h4 bmbLayoutItem [isDynamicItem]="true" [colGrow]="1">
        {{ componentTitle() || title() }}
      </h4>
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
          [alt]="componentTitle() || title() || ''"
        />
      </span>
    </section>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSimpleHeaderComponent {
  icon = input<string>('');
  iconAlternativeColor = input<boolean>(false);
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  onIconClick = output<any>();

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }

  handleClick(event: any): void {
    this.onIconClick.emit(event);
  }
}
