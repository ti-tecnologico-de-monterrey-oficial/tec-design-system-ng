// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=5132-222718
// source=ui-angular/src/lib/components/bmb-alert-center/bmb-alert-center.component.ts
// component=BmbAlertCenterComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  tabsName: string[] | IBmbAlertCenterTabConfig[] = [
    { title: 'Notificaciones', isMobile: true, isDesktop: true },
    { title: 'No leídos', isMobile: true, isDesktop: true },
    { title: 'Favoritos', isMobile: false, isDesktop: true },
    { title: 'Archivados', isMobile: false, isDesktop: true },
    { title: 'Anuncios', isMobile: false, isDesktop: false },
  ];

  emptyStateData: IBmbAlertEmptyState = {
    primaryText: 'No hay notificaciones',
    secondaryText: 'Vuelve a intentarlo más tarde.',
    tertiaryText: 'Si el problema persiste, contacta soporte.',
    buttonText: 'Ir al inicio',
    size: 'large',
    showButton: true,
  };

  enabledFooterOptions: IBmbBottomNavigationBarProps = {
    tags: true,
    favorites: true,
    archive: true,
  };
}
</script>

<bmb-alert-center
  [selectedTab]="selectedTab"
  [tabsName]="tabsName"
  dateFormat="dd/MM/yyyy"
  [hideTabs]="false"
  [emptyStateData]="emptyStateData"
  [showMobileVersion]="false"
  [enableMultipleSelection]="true"
  [enabledFooterOptions]="enabledFooterOptions"
  [enableSwipe]="false"
  [notificationSelectionState]="{ '1': true, '2': false }"
/>`,
  imports: [
    "import type { IBmbAlertCenterTabConfig, IBmbAlertEmptyState, IBmbBottomNavigationBarProps } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbAlertCenterComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-alert-center',
}
