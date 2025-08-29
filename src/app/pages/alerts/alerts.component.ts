import { Component, OnInit, signal } from '@angular/core';
import {
  BmbAlertCenterComponent,
  BmbAlertCenterService,
  IBmbDataAlert,
  BmbButtonDirective,
  IBmbAlertCenterFooterEvent,
  BmbNotificationCardComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-alerts-page',
  templateUrl: './alerts.component.html',
  standalone: true,
  imports: [
    BmbAlertCenterComponent,
    BmbButtonDirective,
    BmbNotificationCardComponent,
  ],
})
export class AlertsPageComponent implements OnInit {
  alerts = signal<IBmbDataAlert[]>([]);

  constructor(private alertCenter: BmbAlertCenterService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.alerts.set([
        {
          id: 10,
          title:
            'Alerta 10 j asndklfjnasldkjfn alksdjnfaklsjdnf klajsdn flkjasndf klajsnfdlkjnasdlkjfn askdljnf klasjdnfklasjdn fklasdjn flkajsdn flkajnsdfkljfn asldkjfnlaksjdn flkajsdnflkajsndflkjnasdlkjfn askldjfnlkasjdnfklajsdn flkajsndfkljan skldffn alksjdn fkljasnfdlkn al k  j snd  f lkajsndf lkjasnd flkjansdkljfn ',
          description: [
            { text: 'Descripción de la alerta 10', type: 'title' },
            {
              text: 'Descripción de la alerta 10 paragraph',
              type: 'paragraph',
            },
            {
              text: 'Descripción de la alerta 10',
              type: 'button',
              variant: 'primary',
            },
          ],
          date: '19/07/2025',
          isRead: false,
          time: '12:00',
          tags: [
            { text: 'tag1', color: 'info' },
            { text: 'tag2', color: 'brand' },
            { text: 'tag1', color: 'info' },
            { text: 'tag2', color: 'brand' },
            { text: 'tag1', color: 'info' },
            { text: 'tag2', color: 'brand' },
            { text: 'tag1', color: 'info' },
            { text: 'tag2', color: 'brand' },
            { text: 'tag1', color: 'info' },
            { text: 'tag2', color: 'brand' },
            { text: 'tag1', color: 'info' },
            { text: 'tag2', color: 'brand' },
            { text: 'tag1', color: 'info' },
            { text: 'tag2', color: 'brand' },
            { text: 'tag1', color: 'info' },
            { text: 'tag2', color: 'brand' },
          ],
          type: 'tipo 1',
          isFavorite: true,
          isArchived: false,
        },
        {
          id: 1,
          title: 'Alerta 1',
          description: [
            { text: 'Descripción de la alerta 10', type: 'title' },
            {
              text: 'Descripción de la alerta 10 paragraph',
              type: 'paragraph',
            },
            {
              text: 'Descripción de la alerta 10 link',
              type: 'link',
              href: 'https://www.google.com',
            },
            {
              text: 'Descripción de la alerta 10',
              type: 'button',
              variant: 'secondary-filled',
            },
          ],
          date: '01/11/2024',
          isRead: false,
          time: '12:00',
          type: 'tipo 1',
          isFavorite: true,
          isArchived: false,
        },
        {
          id: 2,
          title: 'Alerta 2',
          description: [
            { text: 'Descripción de la alerta 10', type: 'title' },
            {
              text: 'Descripción de la alerta 10 paragraph',
              type: 'paragraph',
            },
            {
              text: 'Descripción de la alerta 10 link',
              type: 'image',
              href: 'https://picsum.photos/id/25/200',
            },
          ],
          date: '19/11/2024',
          isRead: true,
          time: '15:00',
          type: 'tipo 2',
          isFavorite: false,
          isArchived: true,
        },
        {
          id: 3,
          title: 'Alerta 3',
          description: [
            {
              text: 'Descripción de la alerta 10',
              type: 'paragraph',
              style: 'bold',
            },
            {
              text: 'Descripción de la alerta 10 paragraph',
              type: 'paragraph',
            },
          ],
          date: '18/11/2024',
          isRead: false,
          time: '12:00',
          type: 'tipo 1',
          isFavorite: false,
          isArchived: false,
        },
        {
          id: 4,
          title: 'Alerta 4',
          description: [
            {
              text: 'Descripción de la alerta 10',
              type: 'paragraph',
              style: 'bold',
            },
            {
              text: 'Descripción de la alerta 10 paragraph',
              type: 'paragraph',
            },
          ],
          date: '02/11/2024',
          isRead: true,
          time: '12:00',
          type: 'tipo 3',
          isFavorite: false,
          isArchived: false,
        },
        {
          id: 40,
          title: 'Alerta 40',
          description: [
            { text: 'Descripción de la alerta 10', type: 'title' },
            {
              text: 'Descripción de la alerta 10 paragraph',
              type: 'paragraph',
            },
            {
              text: 'Descripción de la alerta 10 link',
              type: 'image',
              href: 'https://picsum.photos/id/26/200',
            },
          ],
          date: '02/01/2024',
          isRead: true,
          time: '12:00',
          type: 'tipo 1',
          isFavorite: false,
          isArchived: false,
        },
      ]);
    }, 0);

    // setTimeout(() => {
    //   this.alertCenter.addAlerts([
    //     {
    //       id: 100,
    //       title:
    //         'Alerta 100 j asndklfjnasldkjfn alksdjnfaklsjdnf klajsdn flkjasndf klajsnfdlkjnasdlkjfn askdljnf klasjdnfklasjdn fklasdjn flkajsdn flkajnsdfkljfn asldkjfnlaksjdn flkajsdnflkajsndflkjnasdlkjfn askldjfnlkasjdnfklajsdn flkajsndfkljan skldffn alksjdn fkljasnfdlkn al k  j snd  f lkajsndf lkjasnd flkjansdkljfn ',
    //       description: [
    //         { text: 'Descripción de la alerta 100', type: 'title' },
    //         {
    //           text: 'Descripción de la alerta 100 paragraph',
    //           type: 'paragraph',
    //         },
    //         {
    //           text: 'Descripción de la alerta 100',
    //           type: 'button',
    //           variant: 'primary',
    //         },
    //       ],
    //       date: '28/08/2025',
    //       isRead: false,
    //       time: '12:00',
    //       tags: [
    //         { text: 'tag1', color: 'info' },
    //         { text: 'tag2', color: 'brand' },
    //         { text: 'tag1', color: 'info' },
    //         { text: 'tag2', color: 'brand' },
    //         { text: 'tag1', color: 'info' },
    //         { text: 'tag2', color: 'brand' },
    //         { text: 'tag1', color: 'info' },
    //         { text: 'tag2', color: 'brand' },
    //         { text: 'tag1', color: 'info' },
    //         { text: 'tag2', color: 'brand' },
    //         { text: 'tag1', color: 'info' },
    //         { text: 'tag2', color: 'brand' },
    //         { text: 'tag1', color: 'info' },
    //         { text: 'tag2', color: 'brand' },
    //         { text: 'tag1', color: 'info' },
    //         { text: 'tag2', color: 'brand' },
    //       ],
    //       type: 'tipo 1',
    //       isFavorite: true,
    //       isArchived: false,
    //     },
    //   ]);
    // }, 1000);
  }

  handleChangeAlertStatus(): void {
    console.log('Alert status changed');
  }

  handleAlertEvent(event: unknown): void {
    console.log('Alert event:', event);
  }

  handleCloseDetail(alert: IBmbDataAlert): void {
    if (!alert.isRead) {
      this.alertCenter.updateAlerts([
        {
          ...alert,
          isRead: true,
        },
      ]);
    }
    console.log('Alert detail closed:', alert);
  }

  handleDeleteAllAlerts(): void {
    this.alertCenter.setAlerts([]);
  }

  handleNavigationBarEvents(event: IBmbAlertCenterFooterEvent) {
    console.log('Navigation bar event:', event);
  }

  handleShowAlert(alert: IBmbDataAlert): void {
    console.log('Show alert:', alert);
  }
}
