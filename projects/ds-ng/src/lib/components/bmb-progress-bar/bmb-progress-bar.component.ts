import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  computed,
  output,
  effect,
} from '@angular/core';
import { IBmbTargetLink } from '../../types';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';
import { BmbValueCounterComponent } from '../bmb-value-counter/bmb-value-counter.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';

export type IBmbProgressBarVariations = 'info' | 'warning' | 'error';
export type IBmbProgressBarTypes = 'simple' | 'counter' | 'container';
export type IBmbProgressBarStatusColor =
  | 'info'
  | 'warning'
  | 'error'
  | 'success';

@Component({
  selector: 'bmb-progress-bar',
  standalone: true,
  imports: [
    CommonModule,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbIconComponent,
    BmbValueCounterComponent,
    BmbTextLinkComponent,
    BmbActionIconComponent,
  ],
  templateUrl: './bmb-progress-bar.component.html',
  styleUrl: './bmb-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProgressBarComponent {
  componentTitle = input<string>();
  type = input<IBmbProgressBarTypes>('simple');
  totalCount = input<number>(0);
  counter = input<number>(0);
  appearance = input<IBmbProgressBarVariations>('info');
  textLink = input<string>('');
  href = input<string>('');
  target = input<IBmbTargetLink>('_blank');
  textFormat = input<(counter: string, total: string) => string>(
    (counter, total) => `${counter}/${total}`,
  );
  isContainer = input<boolean>(false);
  avatarIcon = input<string>('');
  actionIcon = input<string>('');
  statusColor = input<IBmbProgressBarStatusColor>('info');
  textFormatSeparator = input<string>(''); //Internal
  showStatusIcon = input<boolean>(false); //Internal

  actionClick = output<MouseEvent>();

  title = input<string>(''); // deprecated

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

  handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.actionClick.emit(event);
  }

  progressValue = computed(() => {
    const numberProgress = (this.counter() / this.totalCount()) * 100;
    let newProgress = numberProgress.toFixed(2);
    if (numberProgress < 0) newProgress = '0';
    if (numberProgress > 100) newProgress = '100';

    return newProgress;
  });

  progressBarColorClass = computed(() => {
    return `bmb_progress-bar-active-${this.statusColor()}`;
  });
}
