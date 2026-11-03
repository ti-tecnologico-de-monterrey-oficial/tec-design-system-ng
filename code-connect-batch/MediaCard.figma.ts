// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=107-31699
// source=ui-angular/src/lib/components/bmb-media-card/bmb-media-card.component.ts
// component=BmbMediaCardComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-media-card
  src="https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg"
  mobileSrc="https://2.bp.blogspot.com/-YkNDZEbKt_g/TYzcbF2_tkI/AAAAAAAAalk/Vt_MHS60Xv8/s1600/www.JoseLuisAvilaHerrera.BLOGSPOT.com%2B-%2BFunny%2BCats%2B-%2BGatitos%2Bmuy%2Btiernos%2B8.jpg"
  width="clamp(200px, 100%, calc(50dvw - 3rem))"
  ratio="1/1"
  borderRadius="m"
  loading="lazy"
  [enableZoom]="false"
  [isBlurredBackdrop]="false"
  type="inline"
  componentTitle="Media card title"
  [subtitle]="subtitle"
  [content]="content"
  [date]="date"
  [userImage]="userImage"
  [userName]="userName"
  [boxShadow]="false"
/>`,
  imports: [
    "import { BmbMediaCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-media-card',
  metadata: { nestable: true },
}
