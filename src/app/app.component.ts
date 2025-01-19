import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BmbTablesComponent,
  IBmbColumn,
} from '../../projects/ds-ng/src/public-api';

export interface Target {
  target: string;
  index: number;
}
// import timelineEvents from './timelineEvents.json';
import {} from '../../projects/ds-ng/src/lib/components/bmb-home-card-chat/bmb-home-card-chat.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    BmbTablesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  columns: IBmbColumn[] = [
    {
      title: 'ID',
      name: 'id',
      width: '100px',
      isHidden: true,
    },
    {
      title: 'First name',
      name: 'first_name',
      isSortable: true,
    },
    {
      title: 'Last name',
      name: 'last_name',
    },
    {
      title: 'E-mail',
      name: 'email',
    },
    {
      title: 'Gender',
      name: 'gender',
      width: '100px',
    },
    {
      title: 'IP',
      name: 'ip_address',
    },
  ];
  data = [
    {
      id: 1,
      first_name: 'Desi',
      last_name: 'Billows',
      email: 'dbillows0@go.com',
      gender: 'Male',
      // ip_address: '24.96.201.15',
    },
    {
      id: 2,
      first_name: 'Latisha',
      last_name: 'Mabbot',
      email: 'lmabbot1@ifeng.com',
      gender: 'Female',
      ip_address: '127.139.248.205',
    },
    {
      id: 3,
      first_name: 'Gabriell',
      last_name: 'Bedinn',
      email: 'gbedinn2@networksolutions.com',
      gender: 'Agender',
      ip_address: '128.236.207.164',
    },
    {
      id: 4,
      first_name: 'Krishnah',
      last_name: 'Llewelly',
      email: 'kllewelly3@wikipedia.org',
      gender: 'Male',
      ip_address: '13.30.4.149',
    },
    {
      id: 5,
      first_name: 'George',
      last_name: 'Haverson',
      email: 'ghaverson4@washingtonpost.com',
      gender: 'Female',
      ip_address: '205.90.225.47',
    },
    {
      id: 6,
      first_name: 'Lucien',
      last_name: 'Lorryman',
      email: 'llorryman5@topsy.com',
      gender: 'Male',
      ip_address: '25.250.171.189',
    },
    {
      id: 7,
      first_name: 'Alair',
      last_name: 'Simao',
      email: 'asimao6@shutterfly.com',
      gender: 'Bigender',
      ip_address: '187.252.86.234',
    },
    {
      id: 8,
      first_name: 'Arluene',
      last_name: 'Ferrarese',
      email: 'aferrarese7@github.com',
      gender: 'Female',
      ip_address: '52.136.66.206',
    },
    {
      id: 9,
      first_name: 'Angelique',
      last_name: 'Ingre',
      email: 'aingre8@guardian.co.uk',
      gender: 'Female',
      ip_address: '239.11.10.214',
    },
    {
      id: 10,
      first_name: 'Elsie',
      last_name: 'Bruckent',
      email: 'ebruckent9@reuters.com',
      gender: 'Female',
      ip_address: '165.85.226.219',
    },
  ];
}
