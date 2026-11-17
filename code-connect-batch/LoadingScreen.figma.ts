// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-38092
// source=ui-angular/src/lib/components/bmb-loader/bmb-loader.component.ts
// component=BmbLoaderComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-loader
  componentTitle="Cargando..."
  subtitle=""
  [overlay]="false"
  [isVisible]="true"
  [errorState]="false"
  appearance="normal"
  icon="${getIcon('wifi_off')}"
  [actions]="false"
  buttonPrimary="Reintentar"
  buttonSecondary="Salir"
  [showInline]="false"
/>`,
  imports: [
    "import { BmbLoaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-loader',
}
