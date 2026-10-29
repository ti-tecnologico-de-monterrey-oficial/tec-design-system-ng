import { getGradesTitle,
  getGradesDetailHeading,
  getGradesCalendarIcon,
  getGradesAccreditedClasses,
  getGradesPeriodAverage,
  getGradesServiceHours,
  getGradesDetailTitle,
  getGradesDetailSubtitle,
  getGradesDetailScore,
  getGradesElements,
  getMissingGradesMicroInputs,
  getGradesNavigationIndex,
  findGradesPeriodIndex } from '../../_shared/logic/components/grades';
import { ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnInit,
  AfterViewInit,
  output,
  signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  inject } from '@angular/core';
import { BmbChevronTitleSelectorComponent } from '../bmb-chevron-title-selector/bmb-chevron-title-selector.component';
import { BmbContainerButtonComponent } from '../bmb-container-button/bmb-container-button.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import type { IBmbGrades, IBmbPartial } from '../../_shared/types/components/grades';
import { CommonModule } from '@angular/common';
import { BmbGradeValueComponent } from '../bmb-grade-value/bmb-grade-value.component';
import { BmbInnerHeaderComponent } from '../bmb-inner-header/bmb-inner-header.component';
import { BmbAcademicProgressComponent } from '../bmb-academic-progress/bmb-academic-progress.component';
import {
  IBmbNameValuePair,
  IBmbNativeModal as IBmbNativeModalGeneric,
} from '../../_shared/types';

type IBmbNativeModal = IBmbNativeModalGeneric<TemplateRef<any>>;
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { buildErrorMessage } from '../../_shared/logic/utils';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { BmbNativeModalService } from '../../services/old/modal/native-modal.service';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';

@Component({
  selector: 'bmb-grades',
  standalone: true,
  imports: [
    CommonModule,
    BmbChevronTitleSelectorComponent,
    BmbContainerButtonComponent,
    BmbDividerComponent,
    BmbTitleContentComponent,
    BmbAcademicProgressComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbGradeValueComponent,
    BmbInnerHeaderComponent,
    BmbContainerComponent,
  ],
  templateUrl: './bmb-grades.component.html',
  styleUrl: './bmb-grades.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbGradesComponent implements OnInit, AfterViewInit {
  grades = input<IBmbGrades[]>([]);
  isMicro = input<boolean>();
  gradeTitle = input<string>();
  accredited = input<IBmbNameValuePair>();
  average = input<IBmbNameValuePair>();
  summary = input<IBmbNameValuePair>();
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  closeGrades = output();

  showPrincipalDetail = false;
  partials!: IBmbPartial[];
  gradeIndex = signal<number>(0);
  periodIndex = signal<number>(0);
  modalContent: TemplateRef<any> | null = null;

  @ViewChild('detailContent', { read: TemplateRef })
  detailContent?: TemplateRef<any>;

  ngOnInit() {
    if (this.isMicro()) {
      const inputs = getMissingGradesMicroInputs({
        gradeTitle: this.gradeTitle(),
        componentTitle: this.componentTitle(),
        title: this.title(),
        accredited: this.accredited(),
        average: this.average(),
        summary: this.summary(),
      });

      if (inputs.length) {
        throw new Error(
          `
          The ${buildErrorMessage(inputs)} required when "isMicro" is true.
          `,
        );
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.detailContent) {
      this.modalContent = this.detailContent;
    }
  }

  private modalService = inject(BmbNativeModalService);

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

  openModalComponent(element: any): void {
    this.partials = element.partials;
    const data: IBmbNativeModal = {
      title: element.detail.title,
      subtitle: element.detail.subtitle,
      content: this.modalContent,
      size: 'small',
    };
    this.modalService.openModal(data);
  }

  getGradesTitle(): string {
    return getGradesTitle(this.grades(), this.gradeIndex());
  }

  getTitle(): string {
    return getGradesDetailHeading(
      this.grades(),
      this.gradeIndex(),
      this.periodIndex(),
      this.showPrincipalDetail,
    );
  }

  getCalendarIcon(): string {
    return getGradesCalendarIcon(this.showPrincipalDetail);
  }

  getAccreditedClasses(): number {
    return getGradesAccreditedClasses(
      this.grades(),
      this.gradeIndex(),
      this.periodIndex(),
      this.showPrincipalDetail,
    );
  }

  getPeriodAverage(): number {
    return getGradesPeriodAverage(
      this.grades(),
      this.gradeIndex(),
      this.periodIndex(),
      this.showPrincipalDetail,
    );
  }

  getServiceHours(): number | boolean {
    return getGradesServiceHours(
      this.grades(),
      this.gradeIndex(),
      this.periodIndex(),
      this.showPrincipalDetail,
    );
  }

  getDetailTitle(element: any): string {
    return getGradesDetailTitle(element);
  }

  getDetailSubtitle(element: any): string {
    return getGradesDetailSubtitle(element);
  }

  getDetailScore(element: any): string {
    return getGradesDetailScore(element);
  }

  getElements(): any {
    return getGradesElements(
      this.grades(),
      this.gradeIndex(),
      this.periodIndex(),
      this.showPrincipalDetail,
    );
  }

  handleLeftGradesClick(event: any): void {
    this.closeGrades.emit(event);
  }

  handleRightGradesClick(): void {
    this.showPrincipalDetail = false;
  }

  handleLeftPeriodClick(): void {
    if (this.showPrincipalDetail) {
      this.periodIndex.update((value) =>
        getGradesNavigationIndex(value, -1, 0),
      );
      return;
    }
    this.gradeIndex.update((value) => getGradesNavigationIndex(value, -1, 0));
  }
  handleRightPeriodClick(): void {
    if (this.showPrincipalDetail) {
      this.periodIndex.update((value) =>
        getGradesNavigationIndex(
          value,
          1,
          this.grades()[this.gradeIndex()].periods.length,
        ),
      );
      return;
    }
    this.gradeIndex.update((value) =>
      getGradesNavigationIndex(value, 1, this.grades().length),
    );
  }

  handleDetails(element: any): void {
    if (this.showPrincipalDetail) {
      this.openModalComponent(element);
      return;
    }

    if (!this.showPrincipalDetail) {
      this.showPrincipalDetail = true;
      this.periodIndex.set(
        findGradesPeriodIndex(
          this.grades(),
          this.gradeIndex(),
          element.detail.title,
        ),
      );
    }
  }
}
