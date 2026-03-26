import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { BmbVerticalLayoutDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export type IBmbAlignTooltip = 'above' | 'below' | 'left' | 'right'; //Deprecated
export type IBmbJustifyTooltip = 'centered' | 'before' | 'after'; //Deprecated

@Component({
  selector: 'bmb-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  templateUrl: './bmb-tooltip.component.html',
  styleUrl: './bmb-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTooltipComponent {
  text = input<string>('');
  icon = input<string>('help');
  size = input<number>();
  isFill = input<boolean>(true);
  componentTitle = input<string>('');

  title = input<string>(); // deprecated
  align = input<string>(); // deprecated
  justify = input<string>(); // deprecated

  @ViewChild('contentTooltip', { static: true })
  contentTooltip!: TemplateRef<any>;
  @ViewChild('tooltipContainer', { static: true })
  tooltipContainer!: ElementRef<HTMLElement>;

  isTooltipVisible = signal(false);
  dialogStyles = signal<{ [key: string]: string }>({});

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

  getPosition() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const targetPosition =
      this.tooltipContainer.nativeElement.getBoundingClientRect();

    const left =
      targetPosition.left <= width / 2 ? 'calc(100% + .5rem)' : 'auto';
    const right = targetPosition.left > width / 2 ? 'calc(100% + .5rem)' : null;
    const top = targetPosition.top <= height / 2 ? '0px' : null;
    const bottom = targetPosition.top > height / 2 ? '0px' : null;

    return {
      top,
      left,
      right,
      bottom,
    };
  }

  showTooltip(event?: Event): void {
    const position = this.getPosition();
    const newPosition: any = {};
    if (position.top) {
      newPosition['top'] = position.top;
    }
    if (position.left) {
      newPosition['left'] = position.left;
    }
    if (position.right) {
      newPosition['right'] = position.right;
    }
    if (position.bottom) {
      newPosition['bottom'] = position.bottom;
    }
    this.dialogStyles.set(newPosition);
    this.isTooltipVisible.set(true);
  }

  hideTooltip(): void {
    this.isTooltipVisible.set(false);
  }
}
