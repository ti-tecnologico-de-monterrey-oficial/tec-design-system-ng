import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BmbBadgeComponent, BmbIconComponent } from 'ds-ng';
import { IBmbNotificationCardData } from './types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-notification-card',
  standalone: true,
  imports: [BmbIconComponent, CommonModule, BmbBadgeComponent],
  templateUrl: './bmb-notification-card.component.html',
  styleUrl: './bmb-notification-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNotificationCardComponent implements OnInit {

  @Input() data: IBmbNotificationCardData | null = null

  expanded: boolean = false;
  activeData: any = [];
  activeTab: number = 1;
  activeDot: number = 0;


  ngOnInit(): void {
    this.activeTab = 1;
    if(this.data !== null){
      this.activeData = this.data!.new;
    }
  }

  setActiveTab(tab: number) {
    this.activeTab = tab;

    if(this.data !== null){
      switch (tab) {
        case 1:
          this.activeData = this.data!.new;
          break;
        case 2:
          this.activeData = this.data!.all;
          break;
        case 3:
          this.activeData = this.data!.seen;
          break;
  
        default:
          this.activeData = this.data!.new;
          break;
      }
    }
  }

  onDotPress(event: any) {
    this.activeDot = event;
  }

  setSize(size: string) {
    this.expanded = size === 'expand' ? true : false;
  }
}
