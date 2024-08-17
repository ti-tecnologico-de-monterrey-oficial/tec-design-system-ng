import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BmbFrequentAppsSelectorComponent } from '../bmb-frequent-apps-selector/bmb-frequent-apps-selector.component';
import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbDotPaginatorComponent } from '../bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbMediaCardComponent } from '../bmb-media-card/bmb-media-card.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { IBmbAdvertisementCard, IBmbAdvertisementData } from './types';

@Component({
  selector: 'bmb-advertisement-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbInteractiveIconComponent,
    BmbIconComponent,
    BmbDotPaginatorComponent,
    BmbMediaCardComponent,
    BmbButtonDirective,
  ],
  templateUrl: './bmb-advertisement-card.component.html',
  styleUrl: './bmb-advertisement-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbAdvertisementCardComponent implements OnInit {
  @Input() data: IBmbAdvertisementData = {
    promociones: [
      {
        imgData: {
          url: '',
          alt: 'Imagen',
        },
        content: {
          title: 'Lorem ipsum dolor sit amet',
          description:
            'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
          linkBtn: '',
          labelBtn: 'ACTION',
        },
      },
    ],
    avisos: [
      {
        imgData: {
          url: '',
          alt: 'Imagen',
        },
        content: {
          title: 'Lorem ipsum dolor sit amet',
          description:
            'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
          linkBtn: '',
        },
      },
    ],
    informacion: [
      {
        imgData: {
          url: '',
          alt: 'Imagen',
        },
        content: {
          title: 'Lorem ipsum dolor sit amet',
          description:
            'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
          linkBtn: '',
        },
      },
    ],
  };

  @Input() subtitle: string = '';

  expanded: boolean = false;
  activeData: any = null;
  activeTab: number = 1;
  activeDot: number = 0;

  ngOnInit(): void {
    this.activeTab = 1;
    this.activeData = this.data.promociones;
  }

  setActiveTab(tab: number) {
    this.activeTab = tab;

    switch (tab) {
      case 1:
        this.activeData = this.data.promociones;
        break;
      case 2:
        this.activeData = this.data.avisos;
        break;
      case 3:
        this.activeData = this.data.informacion;
        break;

      default:
        this.activeData = this.data.promociones;
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
