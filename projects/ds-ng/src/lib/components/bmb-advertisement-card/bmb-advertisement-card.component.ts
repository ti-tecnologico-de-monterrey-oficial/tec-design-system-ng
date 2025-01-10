import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbDotPaginatorComponent } from '../bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { IBmbAdvertisementData } from './types';

@Component({
  selector: 'bmb-advertisement-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbDotPaginatorComponent,
    BmbButtonDirective,
  ],
  templateUrl: './bmb-advertisement-card.component.html',
  styleUrl: './bmb-advertisement-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbAdvertisementCardComponent {
  data = model<IBmbAdvertisementData>({
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
  });

  subtitle = input<string>('');

  expanded: boolean = false;
  activeData: any = null;
  activeTab: number = 1;
  activeDot: number = 0;

  ngOnInit(): void {
    this.activeTab = 1;
    this.activeData = this.data()['promociones'];
  }

  setActiveTab(tab: number) {
    this.activeTab = tab;

    switch (tab) {
      case 1:
        this.activeData = this.data()['promociones'];
        break;
      case 2:
        this.activeData = this.data()['avisos'];
        break;
      case 3:
        this.activeData = this.data()['informacion'];
        break;

      default:
        this.activeData = this.data()['promociones'];
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
