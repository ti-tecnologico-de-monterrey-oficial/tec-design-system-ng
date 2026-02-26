import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { BmbVerticalLayoutDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';

export type IBmbAlignTooltip = 'above' | 'below' | 'left' | 'right'; //Deprecated
export type IBmbJustifyTooltip = 'centered' | 'before' | 'after'; //Deprecated

@Component({
  selector: 'bmb-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    BmbActionIconComponent,
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
  componentTitle = input<string>('Tooltip title');

  title = input<string>(); // deprecated
  align = input<string>(); // deprecated
  justify = input<string>(); // deprecated

  @ViewChild('contentTooltip', { static: true })
  contentTooltip!: TemplateRef<any>;

  constructor(private contentProjected: BmbProjectionContentService) {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );

      if (!deprecatedTitle && !newTitle) {
        throw new Error(
          'The "componentTitle" input is required. Please provide a value for it.',
        );
      }
    });
  }

  showTooltip(event?: Event): void {
    this.contentProjected.openContent({
      content: this.contentTooltip,
      targetRef: event?.target as HTMLHtmlElement,
      focusOnOpen: true,
      showBackdrop: false,
    });
  }
}
