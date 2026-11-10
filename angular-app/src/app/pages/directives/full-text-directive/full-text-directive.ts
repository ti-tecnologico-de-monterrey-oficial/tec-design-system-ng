import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbBreadcrumbComponent,
  BmbContainerButtonComponent,
  BmbTabsComponent,
  BmbDividerComponent,
  BmbSimpleTextComponent,
  type IBmbDataTopBar,
  type IBmbTab,
} from 'ui-angular';

@Component({
  selector: 'app-full-text-directive',
  imports: [
    BmbTabsComponent,
    BmbBreadcrumbComponent,
    BmbContainerButtonComponent,
    BmbDividerComponent,
    BmbSimpleTextComponent,
  ],
  templateUrl: './full-text-directive.html',
  styleUrl: './full-text-directive.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullTextDirective {
  readonly selectedTabId = signal(1);
  readonly showFullText = signal(true);
  readonly fullTextEnabled = signal(true);
  readonly fullTextExample =
    'Desarrollo e implementación de estrategias de innovación educativa para la formación de competencias profesionales';
  readonly showContainerButtonFullText = signal(true);
  readonly containerButtonClickCount = signal(0);
  readonly containerButtonTitle =
    'Desarrollo e implementación de estrategias de innovación educativa para la formación de competencias profesionales en programas académicos de educación superior';
  readonly containerButtonSubtitle =
    'Registro de prueba con un subtítulo extenso para comprobar el texto completo sin activar la navegación del botón';
  readonly showBreadcrumbFullText = signal(true);
  readonly breadcrumbInactive = signal(false);
  readonly breadcrumbPath: IBmbDataTopBar[] = [
    { text: 'Inicio', link: '/direcrtives/full-text' },
    { text: 'Mis evidencias académicas', link: '/pages/breadcrumb' },
    {
      text: 'Vitalidad intelectual y desarrollo de estrategias de innovación educativa para la formación de competencias profesionales',
    },
  ];
  readonly extendedBreadcrumbPath: IBmbDataTopBar[] = [
    this.breadcrumbPath[0],
    {
      text: 'Formación de capital humano y desarrollo profesional docente',
      link: '/pages/breadcrumb',
    },
    {
      text: 'Herramientas tecnológicas para la innovación educativa',
      link: '/pages/breadcrumb',
    },
    {
      text: 'MisEvidenciasAcademicasYActividadesDeVitalidadIntelectualSinEspacios',
      link: '/pages/breadcrumb',
    },
    this.breadcrumbPath[1],
    this.breadcrumbPath[2],
  ];
  readonly topBarBreadcrumb: IBmbDataTopBar[] = [
    { text: 'MiTec', link: '/direcrtives/full-text' },
    { text: this.breadcrumbPath[2].text },
  ];
  readonly selectionCount = signal(0);
  readonly selectedTitle = signal('Inicio');
  readonly tabs: IBmbTab[] = [
    { id: 1, title: 'Inicio', isActive: true },
    { id: 2, title: 'Formación de capital humano' },
    { id: 3, title: 'Herramientas tecnológicas', badge: 3 },
    {
      id: 4,
      title:
        'Desarrollo e implementación de estrategias de innovación educativa para la formación de competencias profesionales',
    },
    {
      id: 5,
      title:
        'FormacionDeCapitalHumanoYHerramientasTecnologicasParaLaInnovacionEducativa',
    },
  ];

  handleSelected(tab: IBmbTab): void {
    this.selectionCount.update((count) => count + 1);
    this.selectedTitle.set(tab.title);
  }

  handleContainerButtonClick(): void {
    this.containerButtonClickCount.update((count) => count + 1);
  }
}
