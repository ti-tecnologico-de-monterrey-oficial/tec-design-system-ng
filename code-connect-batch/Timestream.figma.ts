// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=474-32260
// source=ui-angular/src/lib/components/old/bmb-timestream/bmb-timestream.component.ts
// component=BmbTimestreamComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-timestream
  [isMicro]="false"
  lang="es"
  dateFormat="yyyy-MM-dd"
  [events]="[{ id: 7, start: '2026-10-25', end: '2026-10-27', description: 'In sagittis dui vel nisl. Duis ac nibh.', short_description: 'donec vitae nisi nam ultrices libero non mattis', type: 'done', related_to: ['task2'], decision: 'maecenas pulvinar lobortis', title: '12th & Delaware', image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff', picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff', user_first_name: 'Ricky', user_last_name: 'Kimmel', user_email: 'rkimmel6@barnesandnoble.com', tags: ['quam'], icon: 'change_circle' }]"
/>`,
  imports: [
    "import { BmbTimestreamComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-timestream',
  metadata: { nestable: true },
}
