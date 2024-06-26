import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { BmbTabStudenActivityComponent } from './bmb-tab-studen-activity/bmb-tab-studen-activity.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-student-activity-selector',
  standalone: true,
  imports: [ 
    CommonModule,
    BmbTabStudenActivityComponent
  ],
  templateUrl: './bmb-student-activity-selector.component.html',
  styleUrl: './bmb-student-activity-selector.component.css'
})
export class BmbStudentActivitySelectorComponent implements AfterContentInit {

  @ContentChildren(BmbTabStudenActivityComponent) tabs!: QueryList<BmbTabStudenActivityComponent>;

  ngAfterContentInit(): void {

    const ACTIVE_TABS = this.tabs.filter( (tab: any) => tab.active );

    if ( ACTIVE_TABS.length === 0 ) {
      this.selectTab( this.tabs.first );
    }
  }

  selectTab( tab: BmbTabStudenActivityComponent ) {
    this.tabs.toArray().forEach( ( t: any ) => t.active = false );
    tab.active = true;
  }
}
