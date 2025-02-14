import { Component, input, model } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {
  BmbButtonDirective,
  BmbDividerComponent,
  BmbDotPaginatorComponent,
  BmbDrawerOverlayComponent,
  BmbFrequentAppsSelectorComponent,
  BmbGradesComponent,
  BmbHeaderMobileComponent,
  BmbLoginComponent,
  BmbMediaCardComponent,
  BmbSimpleHeaderComponent,
  BmbStudentActivityCardComponent,
  BmbTimestreamComponent,
  BmbUserProfileComponent,
  IBmbApp,
  IBmbHome,
  IBmbUserInfo,
} from '../../public-api';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BmbUserProfileComponent,
    BmbLoginComponent,
    BmbHeaderMobileComponent,
    BmbSimpleHeaderComponent,
    BmbButtonDirective,
    BmbTimestreamComponent,
    BmbDividerComponent,
    BmbStudentActivityCardComponent,
    BmbDrawerOverlayComponent,
    BmbGradesComponent,
    BmbFrequentAppsSelectorComponent,
    BmbMediaCardComponent,
    BmbDotPaginatorComponent,
  ],
  selector: 'storybook-home-mitec-mobile',
  template: `
    @if (userHasValidToken()) {
      <main>
        <bmb-header-mobile
          text=""
          userImage="../assets/images/placeholders/user-icon-test.svg"
          userAltImage=""
          userLink=""
          userTarget="_blank"
          logo="../assets/images/logos-mitec/logo_mitec.png"
          altLogo=""
          logoLink="_blank"
          logoTarget=""
          trailingIcon="notifications"
          (onTrailingIconClick)="onTrailingIconClick($event)"
        />
        <bmb-simple-header title="Mis acciones" icon="trending_up" />
        <bmb-timestream
          [events]="timestreamEvents"
          dateFormat="yyyy-MM-dd"
          [isMicro]="true"
        />
        <bmb-divider />
        <bmb-simple-header title="Mi horario" icon="calendar_month" />
        <section class="bmb_horizontal-scroll">
          <section class="bmb_horizontal-scroll-wrapper">
            <bmb-student-activity-card
              [startDate]="'2021-12-24 10:00:00'"
              [endDate]="'2021-12-24 11:00:00'"
              [title]="'Activity title'"
              [location]="'Activity location'"
              [responsible]="'Activity responsible'"
              [type]="'academic'"
              [isListItem]="false"
              [image]="'https://picsum.photos/id/64/200/300'"
              [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
            />
            <bmb-student-activity-card
              [startDate]="'2021-12-24 10:00:00'"
              [endDate]="'2021-12-24 11:00:00'"
              [title]="'Activity title'"
              [location]="'Activity location'"
              [responsible]="'Activity responsible'"
              [type]="'life'"
              [isListItem]="false"
              [image]="'https://picsum.photos/id/64/200/300'"
              [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
            />
            <bmb-student-activity-card
              [startDate]="'2021-12-24 10:00:00'"
              [endDate]="'2021-12-24 11:00:00'"
              [title]="'Activity title'"
              [location]="'Activity location'"
              [responsible]="'Activity responsible'"
              [type]="'events'"
              [isListItem]="false"
              [image]="'https://picsum.photos/id/64/200/300'"
              [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
            />
            <bmb-student-activity-card
              [startDate]="'2021-12-24 10:00:00'"
              [endDate]="'2021-12-24 11:00:00'"
              [title]="'Activity title'"
              [location]="'Activity location'"
              [responsible]="'Activity responsible'"
              [type]="'academic'"
              [isListItem]="false"
              [image]="'https://picsum.photos/id/64/200/300'"
              [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
            />
            <bmb-student-activity-card
              [startDate]="'2021-12-24 10:00:00'"
              [endDate]="'2021-12-24 11:00:00'"
              [title]="'Activity title'"
              [location]="'Activity location'"
              [responsible]="'Activity responsible'"
              [type]="'life'"
              [isListItem]="false"
              [image]="'https://picsum.photos/id/64/200/300'"
              [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
            />
          </section>
        </section>
        <bmb-divider />
        <bmb-simple-header title="Mis Calificaciones" icon="school" />
        <bmb-grades
          [isMicro]="true"
          [gradeTitle]="'Período actual'"
          [title]="'Semestral AGO-DIC 2024'"
          [accredited]="{ name: 'Créditos aprobados', value: '39' }"
          [average]="{ name: 'Promedio acumulado', value: '90' }"
          [summary]="{ name: 'Faltas totales', value: '3' }"
        />
        <bmb-divider />
        <bmb-simple-header title="Mis apps" icon="apps" />
        <bmb-frequent-apps-selector
          [title]="'Services'"
          [apps]="selectorApps"
          [layout]="'button'"
        />
        <bmb-divider />
        <bmb-simple-header title="CONECTA" icon="open_in_browser" />
        @switch (myActiveDotIndex) {
          @case (0) {
            <bmb-media-card
              src="https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg"
              alt="test"
              ratio="1/1"
              borderRadius="m"
              type="floating"
              title="Custom HTML content 1"
            />
          }
          @case (1) {
            <bmb-media-card
              src="https://es.mypet.com/wp-content/uploads/sites/23/2021/03/GettyImages-1143107320-e1597136744606.jpg"
              alt="test"
              ratio="1/1"
              borderRadius="m"
              type="floating"
              title="Custom HTML content 2"
            />
          }
          @default {}
        }
        <bmb-dot-paginator
          [activeDotIndex]="myActiveDotIndex"
          [totalDots]="2"
          (onDotPress)="handleDotPress($event)"
        />
        <bmb-divider />
        <bmb-drawer-overlay
          [menu]="menu"
          [title]="'Inner Header'"
          [dataSearch]="['Search Item 1', 'Search Item 2', 'Search Item 3']"
          [tabs]="tabs"
          [appServices]="appServices"
        />
      </main>
    } @else if (userHasSession() && !userHasValidToken()) {
      <bmb-user-profile
        headerLabel="ESTUDIANTES"
        [userInfo]="getUserInfo()"
        (onRequest)="handleRequestHome($event)"
        (onContinue)="handleContinue($event)"
      />
    } @else if (!userHasValidToken()) {
      <bmb-login
        headerLabel="ESTUDIANTES"
        (onRequest)="handleRequestHome($event)"
        (onContinue)="handleContinue($event)"
      />
    }
  `,
})
class StorybookHomeMitecMobile {
  /* For testing and development purposes of this tutorial, this code is added as an example or suggestion.*/
  userHasSession = input<boolean>();
  userHasValidToken = model<boolean>();

  timestreamEvents = [
    {
      id: 1,
      start: '2024-12-18',
      end: '2025-12-28',
      description:
        'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
      short_description:
        'lacinia nisi venenatis tristique fusce congue diam id ornare',
      type: 'active',
      related_to: ['task3'],
      decision: 'et magnis',
      title: 'Betrayal',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Berrie',
      user_last_name: 'Stolberger',
      user_email: 'bstolberger0@si.edu',
      tags: ['non', 'mattis'],
      icon: 'task_alt',
    },
    {
      id: 2,
      start: '2023-01-01',
      end: '2025-01-01',
      description:
        'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
      short_description:
        'vestibulum aliquet ultrices erat tortor sollicitudin mi',
      type: 'done',
      related_to: ['task1'],
      decision: 'ac',
      title: 'Omen, The',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Corabella',
      user_last_name: 'Blazewski',
      user_email: 'cblazewski1@github.io',
      tags: ['penatibus', 'et', 'magnis', 'dis', 'parturient'],
      icon: 'editor_choice',
    },
    {
      id: 3,
      start: '2023-12-29',
      end: '2025-12-31',
      description:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      short_description:
        'quis orci nullam molestie nibh in lectus pellentesque',
      type: 'active',
      related_to: ['task3'],
      decision: 'proin leo odio',
      title: 'Piranhaconda',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Tim',
      user_last_name: 'Frontczak',
      user_email: 'tfrontczak2@icio.us',
      tags: ['auctor', 'sed', 'tristique', 'in'],
      icon: 'done_outline',
    },
    {
      id: 4,
      start: '2024-01-13',
      end: '2025-01-16',
      description:
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
      short_description: 'sodales scelerisque mauris',
      type: 'active',
      related_to: ['task4'],
      decision: 'diam',
      title: 'Ploy',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Ryan',
      user_last_name: 'Bendix',
      user_email: 'rbendix3@gmpg.org',
      tags: ['vivamus'],
      icon: 'done_outline',
    },
    {
      id: 5,
      start: '2024-08-09',
      end: '2025-08-10',
      description:
        'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
      short_description: 'amet turpis elementum',
      type: 'done',
      related_to: ['task1'],
      decision: 'velit',
      title: 'Samurai Assassin (Samurai)',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Flory',
      user_last_name: 'Haton',
      user_email: 'fhaton4@bbb.org',
      tags: ['nullam', 'varius', 'nulla', 'facilisi'],
      icon: 'change_circle',
    },
  ];

  menu = [
    {
      appearance: 'red',
      title: 'App 1',
      icon: 'https://img.freepik.com/premium-vector/approved-icon-with-thumb-up-approved-label-quality-control_349999-1321.jpg?w=2000',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'blue',
      title: 'App 2',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'green',
      title: 'App 3',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'blue',
      title: 'Menú de servicios',
      icon: 'lists',
      setButtonTemplate: true,
    },
  ];

  appServices = {
    '0': [
      {
        appearance: 'red',
        title: 'App 1',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 2',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    '1': [
      {
        appearance: 'green',
        title: 'App 3',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 4',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    '2': [
      {
        appearance: 'green',
        title: 'App 5',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 6',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
  };

  tabs = [
    { title: 'Tab 1', id: 0 },
    { title: 'Tab 2', id: 1 },
    { title: 'Tab 3', id: 2 },
  ];

  selectorApps: IBmbApp[] = [
    {
      icon: 'home',
      title: 'Home',
      link: 'https://www.youtube.com/',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: 'https://www.youtube.com/',
      appearance: 'yellow',
    },
    {
      icon: 'home',
      title: 'Home',
      link: 'https://www.youtube.com/',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: 'https://www.youtube.com/',
      appearance: 'yellow',
    },
    {
      icon: 'home',
      title: 'Home',
      link: 'https://www.youtube.com/',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: 'https://www.youtube.com/',
      appearance: 'yellow',
    },
    {
      icon: 'home',
      title: 'Home',
      link: 'https://www.youtube.com/',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: 'https://www.youtube.com/',
      appearance: 'yellow',
    },
    {
      icon: 'home',
      title: 'Home',
      link: 'https://www.youtube.com/',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: 'https://www.youtube.com/',
      appearance: 'yellow',
    },
  ];

  myActiveDotIndex: number = 0;

  handleDotPress(index: number): void {
    this.myActiveDotIndex = index;
  }

  logHTML(data: boolean): string {
    console.log(`LOG HTML ${data}`);
    return `${data}`;
  }

  auth(data: unknown): boolean {
    /*The developer should integrate the service used for authentication in this  suggested code block. */
    console.log('auth', data);
    return true;
  }

  getUserInfo(data?: unknown): IBmbUserInfo {
    data;
    return {
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture:
        'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/assets/images/placeholders/user-icon-test.svg',
    };
  }

  handleRequestHome(event: IBmbHome): void {
    const { data, action, callback } = event;

    /*The callback is provided to perform the screen executions in the corresponding order*/
    switch (action) {
      case 'auth':
        setTimeout(() => {
          callback(this.auth(data));
        }, 1000);
        break;
      case 'profile':
        callback(this.getUserInfo(data));
        break;
      default:
        console.log('Invalid action');
    }
  }

  handleContinue(event: unknown): void {
    /*If this event is emitted, it is possible to continue to the next page, next step or next item on the screen. If we are here we can continue because the event has already been emitted.*/
    this.userHasValidToken.set(true);
  }

  onTrailingIconClick(event: unknown): void {}
}

export default {
  title: 'Macro Componentes/Home mitec/Mobile',
  component: BmbUserProfileComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookHomeMitecMobile, BmbUserProfileComponent],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use the components needed for this organization ingit status
 TypeScript:

\`\`\`typescript
import { MatDialog } from '@angular/material/dialog';
import { BmbModalComponent, ModalDataConfig } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [
    CommonModule,
    BmbUserProfileComponent,
    BmbLoginComponent,
    BmbHeaderMobileComponent,
    BmbSimpleHeaderComponent,
    BmbButtonDirective,
    BmbTimestreamComponent,
    BmbDividerComponent,
    BmbStudentActivityCardComponent,
    BmbDrawerOverlayComponent,
    BmbGradesMicroComponent,
    BmbInteractiveIconComponent,
    BmbMediaCardComponent,
    BmbDotPaginatorComponent,
  ],
  template: '
            @if (userHasValidToken()) {
      <main>
        <bmb-header-mobile
          text=""
          userImage="../assets/images/placeholders/user-icon-test.svg"
          userAltImage=""
          userLink=""
          userTarget="_blank"
          logo="../assets/images/logos-mitec/logo_mitec.png"
          altLogo=""
          logoLink="_blank"
          logoTarget=""
          trailingIcon="notifications"
          (onTrailingIconClick)="onTrailingIconClick($event)"
        />
        <bmb-simple-header title="Mis acciones" icon="trending_up" />
        <bmb-timestream
          [events]="timestreamEvents"
          dateFormat="yyyy-MM-dd"
          [isMicro]="true"
        />
        <bmb-divider />
        <bmb-simple-header title="Mi horario" icon="calendar_month" />
        <section class="bmb_horizontal-scroll">
          <section class="bmb_horizontal-scroll-wrapper">
            <bmb-student-activity-card
              [startDate]="'2021-12-24 10:00:00'"
              [endDate]="'2021-12-24 11:00:00'"
              [title]="'Activity title'"
              [location]="'Activity location'"
              [responsible]="'Activity responsible'"
              [type]="'academic'"
              [isListItem]="false"
              [image]="'https://picsum.photos/id/64/200/300'"
              [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
            />
            <bmb-student-activity-card
              [startDate]="'2021-12-24 10:00:00'"
              [endDate]="'2021-12-24 11:00:00'"
              [title]="'Activity title'"
              [location]="'Activity location'"
              [responsible]="'Activity responsible'"
              [type]="'life'"
              [isListItem]="false"
              [image]="'https://picsum.photos/id/64/200/300'"
              [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
            />
            <bmb-student-activity-card
              [startDate]="'2021-12-24 10:00:00'"
              [endDate]="'2021-12-24 11:00:00'"
              [title]="'Activity title'"
              [location]="'Activity location'"
              [responsible]="'Activity responsible'"
              [type]="'events'"
              [isListItem]="false"
              [image]="'https://picsum.photos/id/64/200/300'"
              [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
            />
            <bmb-student-activity-card
              [startDate]="'2021-12-24 10:00:00'"
              [endDate]="'2021-12-24 11:00:00'"
              [title]="'Activity title'"
              [location]="'Activity location'"
              [responsible]="'Activity responsible'"
              [type]="'academic'"
              [isListItem]="false"
              [image]="'https://picsum.photos/id/64/200/300'"
              [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
            />
            <bmb-student-activity-card
              [startDate]="'2021-12-24 10:00:00'"
              [endDate]="'2021-12-24 11:00:00'"
              [title]="'Activity title'"
              [location]="'Activity location'"
              [responsible]="'Activity responsible'"
              [type]="'life'"
              [isListItem]="false"
              [image]="'https://picsum.photos/id/64/200/300'"
              [dateFormat]="'yyyy-MM-dd HH:mm:ss'"
            />
          </section>
        </section>
        <bmb-divider />
        <bmb-simple-header title="Mis Calificaciones" icon="school" />
        <bmb-grades
          [isMicro]="true"
          [gradeTitle]="'Período actual'"
          [title]="'Semestral AGO-DIC 2024'"
          [accredited]="{ name: 'Créditos aprobados', value: '39' }"
          [average]="{ name: 'Promedio acumulado', value: '90' }"
          [summary]="{ name: 'Faltas totales', value: '3' }"
        />
        <bmb-divider />
        <bmb-simple-header title="Mis apps" icon="apps" />
        <bmb-frequent-apps-selector
          [title]="'Services'"
          [apps]="selectorApps"
          [layout]="'button'"
        />
        <bmb-divider />
        <bmb-simple-header title="CONECTA" icon="open_in_browser" />
        @switch (myActiveDotIndex) {
          @case (0) {
            <bmb-media-card
              src="https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg"
              alt="test"
              ratio="1/1"
              borderRadius="m"
              type="floating"
              title="Custom HTML content 1"
            />
          }
          @case (1) {
            <bmb-media-card
              src="https://es.mypet.com/wp-content/uploads/sites/23/2021/03/GettyImages-1143107320-e1597136744606.jpg"
              alt="test"
              ratio="1/1"
              borderRadius="m"
              type="floating"
              title="Custom HTML content 2"
            />
          }
          @default {}
        }
        <bmb-dot-paginator
          [activeDotIndex]="myActiveDotIndex"
          [totalDots]="2"
          (onDotPress)="handleDotPress($event)"
        />
        <bmb-divider />
        <bmb-drawer-overlay
          [menu]="menu"
          [title]="'Inner Header'"
          [dataSearch]="['Search Item 1', 'Search Item 2', 'Search Item 3']"
          [tabs]="tabs"
          [appServices]="appServices"
        />
      </main>
    } @else if (userHasSession() && !userHasValidToken()) {
      <bmb-user-profile
        headerLabel="ESTUDIANTES"
        [userInfo]="getUserInfo()"
        (onRequest)="handleRequestHome($event)"
        (onContinue)="handleContinue($event)"
      />
    } @else if (!userHasValidToken()) {
      <bmb-login
        headerLabel="ESTUDIANTES"
        (onRequest)="handleRequestHome($event)"
        (onContinue)="handleContinue($event)"
      />
    }
  ',
  styleUrl: './component.scss',
})
export class Component {
  /* For testing and development purposes of this tutorial, this code is added as an example or suggestion.*/
  userHasSession = input<boolean>();
  userHasValidToken = model<boolean>();

  timestreamEvents = [
    {
      id: 1,
      start: '2024-12-18',
      end: '2025-12-28',
      description:
        'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
      short_description:
        'lacinia nisi venenatis tristique fusce congue diam id ornare',
      type: 'active',
      related_to: ['task3'],
      decision: 'et magnis',
      title: 'Betrayal',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Berrie',
      user_last_name: 'Stolberger',
      user_email: 'bstolberger0@si.edu',
      tags: ['non', 'mattis'],
      icon: 'task_alt',
    },
    {
      id: 2,
      start: '2023-01-01',
      end: '2025-01-01',
      description:
        'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
      short_description:
        'vestibulum aliquet ultrices erat tortor sollicitudin mi',
      type: 'done',
      related_to: ['task1'],
      decision: 'ac',
      title: 'Omen, The',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Corabella',
      user_last_name: 'Blazewski',
      user_email: 'cblazewski1@github.io',
      tags: ['penatibus', 'et', 'magnis', 'dis', 'parturient'],
      icon: 'editor_choice',
    },
    {
      id: 3,
      start: '2023-12-29',
      end: '2025-12-31',
      description:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      short_description:
        'quis orci nullam molestie nibh in lectus pellentesque',
      type: 'active',
      related_to: ['task3'],
      decision: 'proin leo odio',
      title: 'Piranhaconda',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Tim',
      user_last_name: 'Frontczak',
      user_email: 'tfrontczak2@icio.us',
      tags: ['auctor', 'sed', 'tristique', 'in'],
      icon: 'done_outline',
    },
    {
      id: 4,
      start: '2024-01-13',
      end: '2025-01-16',
      description:
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
      short_description: 'sodales scelerisque mauris',
      type: 'active',
      related_to: ['task4'],
      decision: 'diam',
      title: 'Ploy',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Ryan',
      user_last_name: 'Bendix',
      user_email: 'rbendix3@gmpg.org',
      tags: ['vivamus'],
      icon: 'done_outline',
    },
    {
      id: 5,
      start: '2024-08-09',
      end: '2025-08-10',
      description:
        'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
      short_description: 'amet turpis elementum',
      type: 'done',
      related_to: ['task1'],
      decision: 'velit',
      title: 'Samurai Assassin (Samurai)',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Flory',
      user_last_name: 'Haton',
      user_email: 'fhaton4@bbb.org',
      tags: ['nullam', 'varius', 'nulla', 'facilisi'],
      icon: 'change_circle',
    },
  ];

  menu = [
    {
      appearance: 'red',
      title: 'App 1',
      icon: 'https://img.freepik.com/premium-vector/approved-icon-with-thumb-up-approved-label-quality-control_349999-1321.jpg?w=2000',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'blue',
      title: 'App 2',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'green',
      title: 'App 3',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'blue',
      title: 'Menú de servicios',
      icon: 'lists',
      setButtonTemplate: true,
    },
  ];

  appServices = {
    '0': [
      {
        appearance: 'red',
        title: 'App 1',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 2',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    '1': [
      {
        appearance: 'green',
        title: 'App 3',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 4',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    '2': [
      {
        appearance: 'green',
        title: 'App 5',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 6',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
  };

  tabs = [
    { title: 'Tab 1', id: 0 },
    { title: 'Tab 2', id: 1 },
    { title: 'Tab 3', id: 2 },
  ];

  selectorApps: IBmbApp[] = [
    {
      icon: 'home',
      title: 'Home',
      link: 'https://www.youtube.com/',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: 'https://www.youtube.com/',
      appearance: 'yellow',
    },
    {
      icon: 'home',
      title: 'Home',
      link: 'https://www.youtube.com/',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: 'https://www.youtube.com/',
      appearance: 'yellow',
    },
    {
      icon: 'home',
      title: 'Home',
      link: 'https://www.youtube.com/',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: 'https://www.youtube.com/',
      appearance: 'yellow',
    },
    {
      icon: 'home',
      title: 'Home',
      link: 'https://www.youtube.com/',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: 'https://www.youtube.com/',
      appearance: 'yellow',
    },
    {
      icon: 'home',
      title: 'Home',
      link: 'https://www.youtube.com/',
      target: '_blank',
      appearance: 'red',
    },
    {
      icon: 'settings',
      title: 'My Page',
      link: 'https://www.youtube.com/',
      appearance: 'yellow',
    },
  ];

  myActiveDotIndex: number = 0;

  handleDotPress(index: number): void {
    this.myActiveDotIndex = index;
  }

  logHTML(data: boolean): string {
    console.log('data', data);
  }

  auth(data: unknown): boolean {
    /*The developer should integrate the service used for authentication in this  suggested code block. */
    console.log('auth', data);
    return true;
  }

  getUserInfo(data?: unknown): IBmbUserInfo {
    data;
    return {
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture:
        'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/assets/images/placeholders/user-icon-test.svg',
    };
  }

  handleRequestHome(event: IBmbHome): void {
    const { data, action, callback } = event;

    /*The callback is provided to perform the screen executions in the corresponding order*/
    switch (action) {
      case 'auth':
        setTimeout(() => {
          callback(this.auth(data));
        }, 1000);
        break;
      case 'profile':
        callback(this.getUserInfo(data));
        break;
      default:
        console.log('Invalid action');
    }
  }

  handleContinue(event: unknown): void {
    /*If this event is emitted, it is possible to continue to the next page, next step or next item on the screen. If we are here we can continue because the event has already been emitted.*/
    this.userHasValidToken.set(true);
  }

  onTrailingIconClick(event: unknown): void {}
}
\`\`\`

Below is an example of how you can use the components needed for this organization in HTML:
        `,
      },
    },
  },
  argTypes: {
    userHasSession: {
      name: 'User has session',
      control: { type: 'boolean' },
      description: 'Gets the active user session.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    userHasValidToken: {
      name: 'User has token',
      control: { type: 'boolean' },
      description: 'Gets the valid token.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    userHasSession: true,
    userHasValidToken: true,
  },
} as Meta;

function attributes(object: { [key: string]: any }): string {
  return Object.entries(object)
    .filter(([key]) => key !== 'text')
    .map(([key, value]) => {
      return `[${key}]="${value}"`;
    })
    .join(' ');
}

export const Default: StoryFn = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-home-mitec-mobile ${attributes(args)}/>
    `,
  };
};
