import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BmbHomeCardComponent,
  BmbInteractiveIconComponent,
  BmbMediaCardComponent,
  BmbMultiDotPaginatorComponent,
  BmbMultiDotPaginatorItemComponent,
  BmbSoundsCardComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
  BmbVerticalLayoutDirective,
  BmbImageComponent,
} from 'ui-angular';

@Component({
  selector: 'app-issue-padding-page',
  imports: [
    FormsModule,
    BmbHomeCardComponent,
    BmbInteractiveIconComponent,
    BmbMediaCardComponent,
    BmbMultiDotPaginatorComponent,
    BmbMultiDotPaginatorItemComponent,
    BmbSoundsCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbLayoutGridDirective,
    BmbLayoutGridItemDirective,
    BmbVerticalLayoutDirective,
    BmbImageComponent,
  ],
  templateUrl: './issue-padding-page.html',
  styles: `
    :host ::ng-deep .announcement-card > .bmb_home-card {
      height: 100%;
    }
    :host ::ng-deep .announcement-card .bmb_home-card-wrapper-container {
      min-height: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuePaddingPage {
  carouselWidth = 640;
  carouselHeight = 360;
  readonly announcementImage =
    'https://mitecpprd.tec.mx/api/images/mitec/colaboradores/Avisos/2022/mar/CentroIdiomas.png';

  readonly conectaImage =
    'https://conecta.tec.mx/sites/default/files/styles/tarjetas_principal/public/2026-09/qs-latam-2027-tec-monterrey.webp';

  readonly workShortcuts = [
    { icon: 'payments', label: 'mi Recibo de nómina' },
    { icon: 'savings', label: 'mi Caja de ahorro' },
    { icon: 'description', label: 'mis Contratos' },
    { icon: 'arrow_forward', label: 'mi Préstamo TEC' },
    { icon: 'verified', label: 'mis Constancias' },
  ];

  readonly serviceShortcuts = [
    { icon: 'badge', label: 'ID Digital', appearance: 'blue' as const },
    { icon: 'groups', label: 'Reserva de Salas', appearance: 'green' as const },
    {
      icon: 'workspace_premium',
      label: 'Success Factors',
      appearance: 'red' as const,
    },
    /* { icon: 'smart_toy', label: 'TECgpt', appearance: 'red' as const }, */
  ];

  readonly reservationShortcuts = [
    { icon: 'groups', label: 'Salas' },
    { icon: 'directions_car', label: 'Vehículos' },
    { icon: 'assignment', label: 'Report@Tec' },
  ];
}
