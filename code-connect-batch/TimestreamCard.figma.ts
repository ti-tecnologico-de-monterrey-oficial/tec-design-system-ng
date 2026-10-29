// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=427-10276
// source=ui-angular/src/lib/components/bmb-timestream-card/bmb-timestream-card.component.ts
// component=BmbTimestreamCardComponent
import figma from 'figma'
import { getIcon } from './icon-image'
import { getBoxIconColor } from './box-icon-color'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  dataLocalNav: IBmbDataTopBar[] = [];

  events: ITimelineEvent[] = [
    {
      id: 1,
      start: '2023-02-26',
      end: '2023-02-28',
      description:
        'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\\\\n\\\\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\\\\n\\\\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
      short_description:
        'lacinia nisi venenatis tristique fusce congue diam id ornare',
      type: 'active',
      related_to: ['task3'],
      decision: 'et magnis',
      title: 'Betrayal',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Berrie',
      user_last_name: 'Stolberger',
      user_email: 'bstolberger0@si.edu',
      tags: ['non', 'mattis'],
      icon: ${getIcon('task_alt', 'typescript')},
    },
    {
      id: 2,
      start: '2023-01-01',
      end: '2023-01-01',
      description:
        'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\\\\n\\\\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
      short_description:
        'vestibulum aliquet ultrices erat tortor sollicitudin mi',
      type: 'done',
      related_to: ['task1'],
      decision: 'ac',
      title: 'Omen, The',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Corabella',
      user_last_name: 'Blazewski',
      user_email: 'cblazewski1@github.io',
      tags: ['penatibus', 'et', 'magnis', 'dis', 'parturient'],
      icon: ${getIcon('editor_choice', 'typescript')},
    },
    {
      id: 3,
      start: '2023-12-29',
      end: '2023-12-31',
      description:
        'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\\\\n\\\\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\\\\n\\\\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      short_description:
        'quis orci nullam molestie nibh in lectus pellentesque',
      type: 'active',
      related_to: ['task3'],
      decision: 'proin leo odio',
      title: 'Piranhaconda',
      image: 'http://dummyimage.com/1000x1000.png/5fa2dd/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/ff4444/ffffff',
      user_first_name: 'Tim',
      user_last_name: 'Frontczak',
      user_email: 'tfrontczak2@icio.us',
      tags: ['auctor', 'sed', 'tristique', 'in'],
      icon: ${getIcon('done_outline', 'typescript')},
    },
    {
      id: 4,
      start: '2025-01-13',
      end: '2025-01-16',
      description:
        'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\\\\n\\\\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
      short_description: 'sodales scelerisque mauris',
      type: 'active',
      related_to: ['task4'],
      decision: 'diam',
      title: 'Ploy',
      image: 'http://dummyimage.com/1000x1000.png/ff4444/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/dddddd/000000',
      user_first_name: 'Ryan',
      user_last_name: 'Bendix',
      user_email: 'rbendix3@gmpg.org',
      tags: ['vivamus'],
      icon: ${getIcon('done_outline', 'typescript')},
    },
    {
      id: 5,
      start: '2024-08-09',
      end: '2024-08-10',
      description:
        'Sed ante. Vivamus tortor. Duis mattis egestas metus.\\\\n\\\\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\\\\n\\\\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
      short_description: 'amet turpis elementum',
      type: 'done',
      related_to: ['task1'],
      decision: 'velit',
      title: 'Samurai Assassin (Samurai)',
      image: 'http://dummyimage.com/1000x1000.png/cc0000/ffffff',
      picture_profile: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff',
      user_first_name: 'Flory',
      user_last_name: 'Haton',
      user_email: 'fhaton4@bbb.org',
      tags: ['nullam', 'varius', 'nulla', 'facilisi'],
      icon: ${getIcon('change_circle', 'typescript')},
    },
  ];
}
</script>

<bmb-timestream-card
  componentTitle="Title"
  subtitle="Subtitle"
  [dataLocalNav]="dataLocalNav"
  icon="${getIcon('trending_up')}"
  bgIconAppearance="${getBoxIconColor('mitec-red', 'InteractiveIcon_Base', ['BB_2_12_3', 'BB_2_12_2'])}"
  dateFormat="yyyy-MM-dd"
  lang="es"
  [events]="events"
/>`,
  imports: [
    "import type { IBmbDataTopBar, ITimelineEvent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbTimestreamCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-timestream-card',
}
