import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
  TemplateRef,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { IBmbColor } from '../../types/colors';
import { CommonModule } from '@angular/common';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';

@Component({
  selector: 'bmb-action-menu',
  standalone: true,
  imports: [CommonModule, BmbTitleContentComponent],
  templateUrl: './bmb-action-menu.component.html',
  styleUrl: './bmb-action-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbActionMenuComponent {
  title = input.required<string>();
  subtitle = input<string>();
  icon = input<string>('');
  iconSize = input<number>(24);
  bgIconAppearance = input<IBmbColor>();
  showHeader = input<boolean>(true);

  @ContentChildren(TemplateRef)
  projectedContent!: QueryList<any>;
}
