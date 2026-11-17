// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=2109-71690
// source=ui-angular/src/lib/components/bmb-action-menu/bmb-action-menu.component.ts
// component=BmbActionMenuComponent
import figma from 'figma';

export default {
  example: figma.code`<bmb-action-menu
  icon="${getIcon("account_balance_wallet")}"
  [iconSize]="iconSize"
  bgIconAppearance="green-light"
  componentTitle="Title"
  [showHeader]="true"
>
  <ng-template #actionMenuItem>
    <bmb-item-hyperlink
      label="Correo"
      value="tecservices@servicios.tec.mx"
      valueLink="mailto:tecservices@servicios.tec.mx"
      valueTarget="_self"
    />
  </ng-template>
</bmb-action-menu>`,
  imports: [
    "import { BmbActionMenuComponent, BmbItemHyperlinkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-action-menu',
  metadata: { nestable: true },
};
