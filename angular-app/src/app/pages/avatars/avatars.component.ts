import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  TemplateRef,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BmbButtonDirective,
  BmbNativeModalService,
  IBmbNativeModal,
  BmbUserImageComponent,
  BmbTablesComponent,
  BmbContainerComponent,
  BmbIconComponent,
  BmbThemeComponent,
  BmbDropzoneComponent,
  TableColum,
} from 'ui-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatars',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BmbButtonDirective,
    BmbUserImageComponent,
    BmbTablesComponent,
    BmbContainerComponent,
    BmbIconComponent,
    BmbThemeComponent,
    BmbDropzoneComponent,
  ],
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarsComponent {
  router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private modalService: BmbNativeModalService,
    private cdr: ChangeDetectorRef,
  ) {}
  @ViewChild('conceptTemplate') conceptTemplate!: TemplateRef<any>;

  avatars: unknown[] = [];
  avatar = {
    name: null,
    description: null,
  };
  newAvatar: any;
  id = this.route.snapshot.paramMap.get('id');
  loading: boolean = true;
  columns: TableColum[] = [
    {
      def: 'name',
      label: 'Nombre',
      dataKey: 'name',
      type: 'string',
    },
    {
      def: 'avatarCell',
      label: 'Imagen',
      dataKey: 'avatarCell',
      type: 'string',
    },
  ];
  config = {
    isSelectable: false,
    isExpandible: false,
    isPaginable: true,
    showActions: true,
  };
  // Image dropzone
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  previewUrl: string | null = null;
  isReadOnly: boolean = false;
  progress = signal<Record<string, number>>({});

  ngAfterViewInit(): void {
    this.columns = this.columns.map((col) =>
      col.def === 'avatarCell'
        ? { ...col, cellTemplate: this.conceptTemplate }
        : col,
    );

    this.avatars = [
      {
        id: 1,
        name: 'Lorrin',
        avatarCell:
          'https://robohash.org/blanditiisassumendavoluptas.png?size=50x50&set=set1',
      },
      {
        id: 2,
        name: 'Hall',
        avatarCell:
          'https://robohash.org/odiosimiliquequia.png?size=50x50&set=set1',
      },
      {
        id: 3,
        name: 'Ediva',
        avatarCell:
          'https://robohash.org/sapienteutvel.png?size=50x50&set=set1',
      },
      {
        id: 4,
        name: 'Prent',
        avatarCell:
          'https://robohash.org/reiciendisquasid.png?size=50x50&set=set1',
      },
      {
        id: 5,
        name: 'Theda',
        avatarCell:
          'https://robohash.org/utomnisnesciunt.png?size=50x50&set=set1',
      },
      {
        id: 6,
        name: 'Liz',
        avatarCell:
          'https://robohash.org/voluptatemetperferendis.png?size=50x50&set=set1',
      },
      {
        id: 7,
        name: 'Jourdain',
        avatarCell:
          'https://robohash.org/ducimusavoluptatum.png?size=50x50&set=set1',
      },
      {
        id: 8,
        name: 'Trent',
        avatarCell:
          'https://robohash.org/adipisciquodearum.png?size=50x50&set=set1',
      },
      {
        id: 9,
        name: 'Urbain',
        avatarCell:
          'https://robohash.org/suntvoluptasquia.png?size=50x50&set=set1',
      },
      {
        id: 10,
        name: 'Reggi',
        avatarCell: 'https://robohash.org/solutaeumvel.png?size=50x50&set=set1',
      },
    ];

    // OnPush: forzar la re-evaluación de los bindings (p. ej. [columns] en el
    // bmb-table) ya que la asignación anterior ocurre fuera de un evento de plantilla.
    this.cdr.markForCheck();

    this.cdr.markForCheck();
  }

  enter(id: any) {
    this.router.navigate(['/admin/groups', id]);
  }
}
