import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
  EventEmitter,
  Output,
} from '@angular/core';
import { BmbTabStudenActivityComponent } from './bmb-student-activity-tab/bmb-student-activity-tab.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-student-activity-selector',
  standalone: true,
  imports: [CommonModule, BmbTabStudenActivityComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bmb-student-activity-selector.component.html',
  styleUrl: './bmb-student-activity-selector.component.scss',
})
export class BmbStudentActivitySelectorComponent implements AfterContentInit {
  @ContentChildren(BmbTabStudenActivityComponent)
  tabs!: QueryList<BmbTabStudenActivityComponent>;

  ngAfterContentInit(): void {
    const ACTIVE_TABS = this.tabs.filter((tab: any) => tab.active);

    if (ACTIVE_TABS.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: BmbTabStudenActivityComponent) {
    this.tabs.toArray().forEach((t: any) => (t.active = false));
    tab.active = true;
  }
}
