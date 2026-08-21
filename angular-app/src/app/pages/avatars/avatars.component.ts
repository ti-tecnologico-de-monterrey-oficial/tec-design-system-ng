import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  TemplateRef,
  ViewChild,
  signal,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BmbButtonDirective,
  BmbNativeModalService,
  BmbUserImageComponent,
  BmbTablesComponent,
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
  ],
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarsComponent implements AfterViewInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  modalService = inject(BmbNativeModalService);
  cdr = inject(ChangeDetectorRef);

  @ViewChild('conceptTemplate') conceptTemplate!: TemplateRef<any>;

  avatars: unknown[] = [];
  avatar = {
    name: null,
    description: null,
  };
  newAvatar: any;
  id = this.route.snapshot.paramMap.get('id');
  loading = true;
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
  isReadOnly = false;
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

    this.cdr.markForCheck();
  }

  enter(id: any) {
    this.router.navigate(['/admin/groups', id]);
  }
}
