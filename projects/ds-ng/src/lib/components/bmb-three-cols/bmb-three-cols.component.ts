import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  IAlignItemsOptions,
  IJustifyOptions,
  SizeNames,
} from '../../../public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-three-cols',
  standalone: true,
  imports: [CommonModule, BmbLayoutDirective, BmbLayoutItemDirective],
  templateUrl: './bmb-three-cols.component.html',
  styleUrl: './bmb-three-cols.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbThreeColsComponent {
  gapSize = input<SizeNames>('m');
  justify = input<IJustifyOptions>('spaceBetween');
  alignItems = input<IAlignItemsOptions>('center');
  expandMainColumn = input<boolean>(false);

  @ContentChild('bmbLeftContent', { read: TemplateRef })
  leftContent!: TemplateRef<any>;
  @ContentChild('bmbMainContent', { read: TemplateRef })
  mainContent!: TemplateRef<any>;
  @ContentChild('bmbRightContent', { read: TemplateRef })
  rightContent!: TemplateRef<any>;
}
