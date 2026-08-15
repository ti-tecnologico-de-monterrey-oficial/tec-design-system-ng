import {
  Component,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import {
  BmbBadgeComponent,
  BmbIconComponent,
  BmbTablesComponent,
} from 'ui-angular';

@Component({
  selector: 'table-main',
  standalone: true,
  imports: [BmbBadgeComponent, BmbIconComponent, BmbTablesComponent],
  templateUrl: './table-main.component.html',
  styleUrl: './table-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableMainComponent {
  @ViewChild('infoTemplate') infoTemplate!: TemplateRef<any>;
  @ViewChild('lastNameTemplate') lastNameTemplate!: TemplateRef<any>;
  @ViewChild('actionTemplate') actionTemplate!: TemplateRef<any>;
  @ViewChild('detailTemplate') detailTemplate!: TemplateRef<any>;
  @ViewChild('headerNameTemplate') headerNameTemplate!: TemplateRef<any>;

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
        gorem: 'Gorem Ipsum',
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
        detail: 'Detalle A',
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
    // Asignar templates a columnas
    this.columns = this.columns.map((col) => {
      if (col.def === 'name') {
        return { ...col, htmlLabel: this.headerNameTemplate };
      }
      return col;
    });

    // Asignar templates a datos
    this.data = this.data.map((row) => {
      return {
        ...row,
        lastNameTemplate: this.lastNameTemplate,
        infoTemplate: this.infoTemplate,
      };
    });

    // Forzar renderizado porque los ViewChild no están disponibles en ngOnInit
    this.cdr.detectChanges();
  }

  onSelect(selected: any) {
    // Maneja la selección
  }

  clickButton(event: any) {
    // Maneja el click del botón
  }

  isString(value: any): value is string {
    return typeof value === 'string';
  }

  isObject(value: any): value is object {
    return typeof value === 'object' && value !== null;
  }
}
