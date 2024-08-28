import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHeaderMobileComponent } from '../bmb-header-mobile/bmb-header-mobile.component';
import { BmbChevronTitleSelectorComponent } from '../bmb-chevron-title-selector/bmb-chevron-title-selector.component';
import { BmbContainerButtonComponent } from '../bmb-container-button/bmb-container-button.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbModalComponent } from '../bmb-modal/bmb-modal.component';
import { ModalDataConfig } from '../bmb-modal/bmb-modal.interface';
import { MatDialog } from '@angular/material/dialog';
import { BmbFocusElementComponent } from '../bmb-focus-element/bmb-focus-element.component';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { IBmbGrades, IBmbPartial } from './types';
import { CommonModule } from '@angular/common';
import { BmbGradeValueComponent } from '../bmb-grade-value/bmb-grade-value.component';

@Component({
  selector: 'bmb-grades',
  standalone: true,
  imports: [
    CommonModule,
    BmbHeaderMobileComponent,
    BmbChevronTitleSelectorComponent,
    BmbContainerComponent,
    BmbContainerButtonComponent,
    BmbModalComponent,
    BmbDividerComponent,
    BmbFocusElementComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbGradeValueComponent,
  ],
  templateUrl: './bmb-grades.component.html',
  styleUrl: './bmb-grades.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbGradesComponent {
  grades = input.required<IBmbGrades[]>();

  closeGrades = output();

  showPrincipalDetail: boolean = false;
  partials!: IBmbPartial[];
  gradeIndex: number = 0;
  periodIndex: number = 0;
  modalContent: TemplateRef<any> | null = null;

  @ViewChild('detailContent', { read: TemplateRef })
  detailContent?: TemplateRef<any>;

  ngAfterViewInit(): void {
    if (this.detailContent) {
      this.modalContent = this.detailContent;
    }
  }

  constructor(private matDialog: MatDialog) {}

  openModalComponent(element: any): void {
    this.partials = element.partials;
    const data: ModalDataConfig = {
      title: element.detail.title,
      subtitle: element.detail.subtitle,
      content: this.modalContent,
      size: 'large',
      type: 'informative',
      alertStyle: 'event',
      hidePrimaryButton: true,
    };
    this.matDialog.open(BmbModalComponent, { data });
  }

  getGradesTitle(): string {
    return this.grades()[this.gradeIndex].title;
  }

  getTitle(): string {
    const period = this.grades()[this.gradeIndex].periods[this.periodIndex];
    if (this.showPrincipalDetail) return period.detail.title;
    return this.grades()[this.gradeIndex].subtitle;
  }

  getCalendarIcon(): string {
    if (this.showPrincipalDetail) return 'calendar_month';
    return 'calendar_today';
  }

  getAccreditedClasses(): number {
    const period = this.grades()[this.gradeIndex].periods[this.periodIndex];
    if (this.showPrincipalDetail) return period.accreditedClasses;
    return 0;
  }

  getPeriodAverage(): number {
    const period = this.grades()[this.gradeIndex].periods[this.periodIndex];
    if (this.showPrincipalDetail) return period.periodAverage;
    return 0;
  }

  getServiceHours(): number {
    const period = this.grades()[this.gradeIndex].periods[this.periodIndex];
    if (this.showPrincipalDetail) return period.serviceHours;
    return 0;
  }

  getDetailTitle(element: any): string {
    return element.detail.title;
  }

  getDetailSubtitle(element: any): string {
    return element.detail.subtitle;
  }

  getDetailScore(element: any): string {
    return element.detail.score;
  }

  getElements(): any {
    const periods = this.grades()[this.gradeIndex].periods;
    if (this.showPrincipalDetail) return periods[this.periodIndex].classes;
    return periods;
  }

  handleLeftGradesClick(event: any): void {
    this.closeGrades.emit(event);
  }

  handleRightGradesClick(): void {
    this.showPrincipalDetail = false;
  }

  handleLeftPeriodClick(): void {
    if (this.showPrincipalDetail) {
      if (this.periodIndex) {
        this.periodIndex = this.periodIndex - 1;
      }
      return;
    }

    if (this.gradeIndex) {
      this.gradeIndex = this.gradeIndex - 1;
    }
  }

  handleRightPeriodClick(): void {
    if (this.showPrincipalDetail) {
      if (
        this.periodIndex + 1 <
        this.grades()[this.gradeIndex].periods.length
      ) {
        this.periodIndex = this.periodIndex + 1;
      }
      return;
    }

    if (this.gradeIndex + 1 < this.grades().length) {
      this.gradeIndex = this.gradeIndex + 1;
    }
  }

  handleDetails(element: any): void {
    if (this.showPrincipalDetail) {
      this.openModalComponent(element);
      return;
    }

    if (!this.showPrincipalDetail) {
      this.showPrincipalDetail = true;
      this.periodIndex = this.grades()[this.gradeIndex].periods.findIndex(
        (period) => period.detail.title === element.detail.title,
      );
    }
  }
}
