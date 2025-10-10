import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbTableLiteComponent,
  BmbIconComponent,
  BmbBadgeComponent,
} from '../../projects/ds-ng/src/public-api';
import { CommonModule } from '@angular/common';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  imports: [
    BmbIconComponent,
    BmbTableLiteComponent,
    CommonModule,
    BmbBadgeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class AppComponent {
  @ViewChild('infoTemplate') infoTemplate!: TemplateRef<any>;
  @ViewChild('lastNameTemplate') lastNameTemplate!: TemplateRef<any>;
  @ViewChild('actionTemplate') actionTemplate!: TemplateRef<any>;
  @ViewChild('detailTemplate') detailTemplate!: TemplateRef<any>;
  @ViewChild('headerNameTemplate') headerNameTemplate!: TemplateRef<any>;

  clearSelectionFlag = false;

  constructor(private cdr: ChangeDetectorRef) {}

  config = {
    isSelectable: true,
    isExpandible: true,
    isPaginable: true,
    showActions: true,
  };

  data: any[] = [];
  columns: any[] = [];

  ngOnInit(): void {
    this.data = [
      {
        lastName: 'Benitez',
        name: 'Romina',
        birthday: '02/02/2000',
        info: 'buscar',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
      },
      {
        lastName: 'Rodriguez',
        name: 'Edgar',
        birthday: '02/23/2020',
        info: 'Info text',
        gorem: 'Gorem Ipsum Gorem Ipsum Gorem Ipsum',
        goremType: 'success',
        country: 'Francia',
        detail: 'Detalle A',
      },
      {
        lastName: 'Benitez',
        name: 'Atenea',
        birthday: '02/02/2010',
        info: 'Info text',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
        detail: {
          columns: [
            { def: 'id', label: 'ID', dataKey: 'id' },
            {
              def: 'description',
              label: 'Description',
              dataKey: 'description',
            },
          ],
          data: [
            { id: 1, description: 'Detalle A' },
            { id: 2, description: 'Detalle B' },
          ],
          config: {
            isSelectable: false,
            isExpandible: false,
            isPaginable: false,
            showActions: false,
          },
        },
      },
      {
        lastName: 'Benitez',
        name: 'Atenea',
        birthday: '02/02/2005',
        info: 'Info text',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
        detail: 'Detalle A',
      },
      {
        lastName: 'Benitez',
        name: 'Atenea',
        birthday: '02/02/2000',
        info: 'Info text',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
        detail: 'Detalle A',
      },
      {
        lastName: 'Benitez',
        name: 'Atenea',
        birthday: '02/02/2000',
        info: 'Info text',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
        detail: 'Detalle A',
      },
      {
        lastName: 'Benitez',
        name: 'Atenea',
        birthday: '02/02/2000',
        info: 'Info text',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
        detail: 'Detalle A',
      },
      {
        lastName: 'Nava',
        name: 'Jesus',
        birthday: '03/04/1998',
        country: 'Mexico',
        info: 'Info text',
        gorem: 'Gorem Ipsum',
        goremType: 'error',
        detail: {
          columns: [
            { def: 'id', label: 'ID', dataKey: 'id' },
            {
              def: 'description',
              label: 'Description',
              dataKey: 'description',
            },
          ],
          data: [
            { id: 1, description: 'Detalle A' },
            { id: 2, description: 'Detalle B' },
          ],
          config: {
            isSelectable: false,
            isExpandible: false,
            isPaginable: false,
            showActions: false,
          },
        },
      },
      {
        lastName: 'Benitez',
        name: 'Romina',
        birthday: '02/02/2000',
        info: 'buscar',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
      },
      {
        lastName: 'Benitez',
        name: 'Romina',
        birthday: '02/02/2000',
        info: 'buscar',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
      },
      {
        lastName: 'Benitez',
        name: 'Romina',
        birthday: '02/02/2000',
        info: 'buscar',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
      },
      {
        lastName: 'Benitez',
        name: 'Romina',
        birthday: '02/02/2000',
        info: 'buscar',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
      },
      {
        lastName: 'Benitez',
        name: 'Romina',
        birthday: '02/02/2000',
        info: 'buscar',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
      },
      {
        lastName: 'Benitez',
        name: 'Romina',
        birthday: '02/02/2000',
        info: 'buscar',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
      },
    ];

    this.columns = [
      {
        def: 'name',
        label: 'Name',
        dataKey: 'name',
        type: 'string',
      },
      {
        def: 'lastName',
        label: 'Last Name',
        dataKey: 'lastName',
        type: 'string',
      },
      {
        def: 'birthday',
        label: 'Birthday',
        dataKey: 'birthday',
        type: 'date',
      },
      {
        def: 'info',
        label: 'Info',
        dataKey: 'info',
        type: 'string',
      },
      {
        def: 'gorem',
        label: 'Gorem Ipsum',
        dataKey: 'gorem',
        type: 'string',
      },
      {
        def: 'country',
        label: 'Country',
        dataKey: 'country',
        type: 'string',
      },
    ];
  }

  ngAfterViewInit(): void {
    this.columns = this.columns.map((col) => {
      if (col.def === 'name') {
        return { ...col, htmlLabel: this.headerNameTemplate };
      }
      return col;
    });

    this.data = this.data.map((row) => {
      return {
        ...row,
        lastNameTemplate: this.lastNameTemplate,
        infoTemplate: this.infoTemplate,
      };
    });

    this.cdr.detectChanges();
  }

  onSelect(selected: any) {
    console.log('Selected rows', selected);
  }

  clickButton(event: any) {
    console.log('Button clicked', event);
  }

  isString(value: any): value is string {
    return typeof value === 'string';
  }

  isObject(value: any): value is object {
    return typeof value === 'object' && value !== null;
  }

  onClickRow(event: any) {
    console.log('Button clicked', event);
  }

  resetSelection() {
    this.clearSelectionFlag = true;
  }
}
