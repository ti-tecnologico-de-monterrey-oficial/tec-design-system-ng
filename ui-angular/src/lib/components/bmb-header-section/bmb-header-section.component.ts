import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { isImage } from '../../_shared/logic/utils';
import { BmbBreadcrumbComponent } from '../bmb-breadcrumb/bmb-breadcrumb.component';
import type { IBmbDataTopBar } from '../../_shared/types';
import { IBmbColor } from '../../_shared/types/colors';
import { IBmbActionHeader } from '../../_shared/types';
import { BmbNavigationBarComponent } from '../bmb-navigation-bar/bmb-navigation-bar.component';
import { getClassNameByConditional } from '../../_shared/logic/getClassName';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { TranslatePipe } from '../../pipes/translations';
import { getHeaderSectionStyles } from '../../_shared/logic/components/header-section';

@Component({
  selector: 'bmb-header-section',
  standalone: true,
  imports: [
    CommonModule,
    BmbContainerComponent,
    BmbIconComponent,
    BmbBreadcrumbComponent,
    BmbActionIconComponent,
    BmbNavigationBarComponent,
    TranslatePipe,
  ],
  styleUrl: './bmb-header-section.component.scss',
  templateUrl: './bmb-header-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbHeaderSectionComponent {
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  leftIcon = input<string>('');
  actionHeaders = input<IBmbActionHeader[]>([]);
  icon = input<string>('');
  iconSize = input<number>(16);
  bgIconAppearance = input<IBmbColor>();
  transparentBgC = input<boolean>();
  componentTitle = input<string>();
  componentTitleLeft = input<string>();
  alternativeTextLeftIcon = input<string>('');

  onClickLeft = output<any>();

  getStyles(): object {
    return getHeaderSectionStyles(
      this.icon(),
      this.bgIconAppearance() as string | undefined,
    );
  }

  evaluateConditional(conditional: any): boolean {
    if (typeof conditional === 'boolean') return conditional;
    return !!conditional;
  }

  getClassNameByConditional(
    mainClassName: string,
    conditional: any,
    newClassName: string,
  ): string[] {
    return getClassNameByConditional(mainClassName, conditional, newClassName);
  }

  isImage(icon: string): boolean {
    return isImage(icon);
  }

  showBreadcrumbs(): boolean {
    return !!this.dataLocalNav().length;
  }

  handleClickLeft(event: any): void {
    this.onClickLeft.emit(event);
  }
}
