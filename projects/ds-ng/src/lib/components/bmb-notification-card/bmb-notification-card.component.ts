import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BmbHomeCardHeaderComponent } from '../bmb-home-card/bmb-home-card-header/bmb-home-card-header.component';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
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

  @Input() data: IBmbNotificationCardData = {
    new: [
      {
        description: 'Descripcion Corta',
        time: '4d 12h'
      },
    ],
    all: [
      {
        description: 'Descripcion Corta',
        time: '4d 12h'
      },
      {
        description: 'Descripcion Corta',
        time: '4d 12h'
      },
    ],
    seen: [
      {
        description: 'Descripcion Corta',
        time: '4d 12h'
      },
      {
        description: 'Descripcion Corta',
        time: '4d 12h'
      },
      {
        description: 'Descripcion Corta',
        time: '4d 12h'
      },
    ]
  };

  expanded: boolean = false;
  activeData: any = null;
  activeTab: number = 1;
  activeDot: number = 0;


  ngOnInit(): void {
    this.activeTab = 1;
    this.activeData = this.data.new;
  }

  setActiveTab(tab: number) {
    this.activeTab = tab;

    switch (tab) {
      case 1:
        this.activeData = this.data.new;
        break;
      case 2:
        this.activeData = this.data.all;
        break;
      case 3:
        this.activeData = this.data.seen;
        break;

      default:
        this.activeData = this.data.new;
        break;
    }
  }

  onDotPress(event: any) {
    this.activeDot = event;
  }

  setSize(size: string) {
    this.expanded = size === 'expand' ? true : false;
  }
}
