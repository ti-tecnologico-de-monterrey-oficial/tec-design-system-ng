// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=107-33853
// source=projects/ds-ng/src/lib/components/bmb-student-activity-card/bmb-student-activity-card.component.ts
// component=BmbStudentActivityCardComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-student-activity-card startDate="2021-12-24 10:00:00" endDate="2021-12-24 11:00:00" componentTitle="Activity title" type="academic" location="Activity location" responsible="Activity responsible" image="https://picsum.photos/id/64/200/300" dateFormat="yyyy-MM-dd HH:mm:ss" badgeText="Badge text" [isListItem]="true" [disableImage]="false" bulletColor="success-primary" />`,
  imports: [
    "import { BmbStudentActivityCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-student-activity-card',
}
