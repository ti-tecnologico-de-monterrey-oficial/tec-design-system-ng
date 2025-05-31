import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { BmbTabStudentActivityComponent } from './bmb-student-activity-tab/bmb-student-activity-tab.component';
import { CommonModule } from '@angular/common';
import { IStudentActivityAppearance } from '../../types';

export type IAppearance = 'normal' | 'strong' | 'success';

@Component({
  selector: 'bmb-student-activity-selector',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bmb-student-activity-selector.component.html',
  styleUrl: './bmb-student-activity-selector.component.scss',
})
export class BmbStudentActivitySelectorComponent implements AfterContentInit {
  @ContentChildren(BmbTabStudentActivityComponent)
  tabs!: QueryList<BmbTabStudentActivityComponent>;
  appearance = input<IStudentActivityAppearance>('academic');

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    const appearanceValue = this.appearance();

    this.tabs.forEach((tab) => {
      tab.appearance = appearanceValue;
    });

    const ACTIVE_TABS = this.tabs.filter((tab: any) => tab.active);

    if (ACTIVE_TABS.length === 0) {
      this.selectTab(this.tabs.first);
    }

    this.cdr.markForCheck();
  }

  selectTab(tab: BmbTabStudentActivityComponent) {
    this.tabs.toArray().forEach((t: any) => (t.active = false));
    if (tab) tab.active = true;
  }
}
