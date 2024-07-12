import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbTimestreamComponent } from './bmb-timestream.component';

export default {
  title: 'Macro Componentes/Timestream',
  component: BmbTimestreamComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbTimestreamComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTimestreamComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    startDate: {
      name: 'Start date',
      control: {
        type: 'text',
      },
      description:
        'Set the initial date for the timeline (this date will be expressed as **dateFormat**).',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    endDate: {
      name: 'End date',
      control: {
        type: 'text',
      },
      description:
        'Set the last date for the timeline (this date will be expressed as **dateFormat**).',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    dateFormat: {
      name: 'Date format',
      control: {
        type: 'text',
      },
      description: 'Set the format for all dates.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'dd/MM/yyyy' },
      },
    },
    lang: {
      name: 'Language',
      control: {
        type: 'text',
      },
      description: 'Set the language for the translations.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'es' },
      },
    },
    events: {
      name: 'Events',
      control: {
        type: 'object',
      },
      description: 'List of events to display.',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
  },
  args: {
    startDate: '31/01/2020',
    endDate: '31/12/2024',
    dateFormat: 'dd/MM/yyyy',
    lang: 'es',
    events: [
      {
        id: 1,
        start: '24/04/2024',
        end: '28/04/2024',
        title: 'Wirey Spindell',
        image: 'http://dummyimage.com/241x100.png/ff4444/ffffff',
        short_description:
          'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        type: 'avance_academico',
        instance:
          'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        action: 'Horizontal',
      },
      {
        id: 2,
        start: '24/05/2022',
        end: '27/05/2022',
        title: 'Superman/Batman: Apocalypse',
        image: 'http://dummyimage.com/145x100.png/cc0000/ffffff',
        short_description:
          'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        description:
          'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
        type: 'enriquecedoras',
        instance:
          'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        action: 'tertiary',
      },
      {
        id: 3,
        start: '19/11/2024',
        end: '19/11/2024',
        title: 'Arc',
        image: 'http://dummyimage.com/238x100.png/dddddd/000000',
        short_description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
        description:
          'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        type: 'avance_academico',
        instance:
          'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        action: 'bifurcated',
      },
      {
        id: 4,
        start: '18/09/2020',
        end: '22/09/2020',
        title: 'Talcum Powder',
        image: 'http://dummyimage.com/122x100.png/cc0000/ffffff',
        short_description:
          'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        description:
          'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
        type: 'avance_academico',
        instance:
          'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        action: 'cohesive',
      },
      {
        id: 5,
        start: '18/03/2022',
        end: '19/03/2022',
        title: 'Ted',
        image: 'http://dummyimage.com/213x100.png/5fa2dd/ffffff',
        short_description:
          'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        description:
          'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        type: 'avance_academico',
        instance:
          'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        action: 'access',
      },
      {
        id: 6,
        start: '16/01/2024',
        end: '21/01/2024',
        title: 'Smart People',
        image: 'http://dummyimage.com/134x100.png/ff4444/ffffff',
        short_description:
          'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
        description:
          'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
        type: 'flexibles',
        instance:
          'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
        action: 'benchmark',
      },
      {
        id: 7,
        start: '27/12/2024',
        end: '30/12/2024',
        title: 'Bulli: Cooking in Progress, El',
        image: 'http://dummyimage.com/128x100.png/ff4444/ffffff',
        short_description:
          'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        description:
          'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
        type: 'enriquecedoras',
        instance:
          'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
        action: 'Sharable',
      },
      {
        id: 8,
        start: '24/05/2022',
        end: '27/05/2022',
        title: 'B.T.K.',
        image: 'http://dummyimage.com/108x100.png/ff4444/ffffff',
        short_description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
        description:
          'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
        type: 'flexibles',
        instance:
          'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        action: 'bottom-line',
      },
      {
        id: 9,
        start: '26/04/2021',
        end: '26/04/2021',
        title: "It's Good to Be Alive",
        image: 'http://dummyimage.com/247x100.png/cc0000/ffffff',
        short_description:
          'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        description:
          'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        type: 'seriadas',
        instance:
          'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        action: 'website',
      },
      {
        id: 11,
        start: '03/05/2021',
        end: '08/05/2021',
        title: 'Eat',
        image: 'http://dummyimage.com/211x100.png/ff4444/ffffff',
        short_description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
        description:
          'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
        type: 'avance_academico',
        instance:
          'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
        action: 'interface',
      },
      {
        id: 12,
        start: '26/06/2024',
        end: '27/06/2024',
        title: 'Dreams That Money Can Buy',
        image: 'http://dummyimage.com/175x100.png/5fa2dd/ffffff',
        short_description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        description:
          'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        type: 'otras',
        instance:
          'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        action: 'ability',
      },
      {
        id: 13,
        start: '30/11/2022',
        end: '04/12/2022',
        title: 'Forever, Darling',
        image: 'http://dummyimage.com/189x100.png/ff4444/ffffff',
        short_description:
          'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
        description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        type: 'seriadas',
        instance:
          'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
        action: 'Synergistic',
      },
      {
        id: 14,
        start: '05/12/2020',
        end: '10/12/2020',
        title: 'RV',
        image: 'http://dummyimage.com/121x100.png/dddddd/000000',
        short_description:
          'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        description:
          'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
        type: 'otras',
        instance:
          'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',
        action: 'customer loyalty',
      },
      {
        id: 15,
        start: '09/10/2024',
        end: '12/10/2024',
        title: 'Ruggles of Red Gap',
        image: 'http://dummyimage.com/139x100.png/5fa2dd/ffffff',
        short_description:
          'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
        description:
          'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
        type: 'avance_academico',
        instance:
          'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
        action: 'Cross-group',
      },
      {
        id: 16,
        start: '07/08/2022',
        end: '08/08/2022',
        title: 'Male and Female',
        image: 'http://dummyimage.com/126x100.png/dddddd/000000',
        short_description:
          'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
        description:
          'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        type: 'flexibles',
        instance:
          'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
        action: 'groupware',
      },
      {
        id: 18,
        start: '28/01/2020',
        end: '02/02/2020',
        title: 'Tales That Witness Madness',
        image: 'http://dummyimage.com/125x100.png/ff4444/ffffff',
        short_description:
          'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        description:
          'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        type: 'enriquecedoras',
        instance:
          'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        action: 'homogeneous',
      },
      {
        id: 19,
        start: '15/03/2024',
        end: '17/03/2024',
        title: 'Gypsy 83',
        image: 'http://dummyimage.com/249x100.png/5fa2dd/ffffff',
        short_description:
          'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
        description:
          'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
        type: 'enriquecedoras',
        instance:
          'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        action: 'Polarised',
      },
      {
        id: 20,
        start: '15/09/2021',
        end: '18/09/2021',
        title: 'Streaks, The (Pregi)',
        image: 'http://dummyimage.com/207x100.png/cc0000/ffffff',
        short_description:
          'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
        description:
          'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
        type: 'flexibles',
        instance:
          'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        action: 'Grass-roots',
      },
      {
        id: 21,
        start: '24/09/2024',
        end: '25/09/2024',
        title: 'Kippur',
        image: 'http://dummyimage.com/104x100.png/dddddd/000000',
        short_description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
        description:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        type: 'inscripciones',
        instance:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
        action: 'encompassing',
      },
      {
        id: 22,
        start: '14/02/2023',
        end: '19/02/2023',
        title: 'Tarzan and His Mate',
        image: 'http://dummyimage.com/219x100.png/dddddd/000000',
        short_description:
          'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
        description:
          'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        type: 'otras',
        instance:
          'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
        action: 'web-enabled',
      },
      {
        id: 23,
        start: '03/11/2020',
        end: '08/11/2020',
        title: 'Cure, The',
        image: 'http://dummyimage.com/244x100.png/cc0000/ffffff',
        short_description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        description:
          'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
        type: 'avance_academico',
        instance:
          'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        action: 'concept',
      },
      {
        id: 24,
        start: '13/12/2020',
        end: '15/12/2020',
        title: 'Barefoot Contessa, The',
        image: 'http://dummyimage.com/204x100.png/ff4444/ffffff',
        short_description:
          'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
        description:
          'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        type: 'flexibles',
        instance:
          'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        action: 'Self-enabling',
      },
      {
        id: 25,
        start: '28/08/2020',
        end: '28/08/2020',
        title: 'Mother Night',
        image: 'http://dummyimage.com/248x100.png/ff4444/ffffff',
        short_description:
          'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
        description:
          'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        type: 'otras',
        instance:
          'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
        action: 'fresh-thinking',
      },
      {
        id: 26,
        start: '09/08/2021',
        end: '12/08/2021',
        title: 'Lonely Villa, The',
        image: 'http://dummyimage.com/138x100.png/cc0000/ffffff',
        short_description:
          'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        description:
          'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        type: 'enriquecedoras',
        instance:
          'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
        action: 'service-desk',
      },
      {
        id: 27,
        start: '03/05/2021',
        end: '03/05/2021',
        title: 'Keep Your Distance',
        image: 'http://dummyimage.com/225x100.png/5fa2dd/ffffff',
        short_description:
          'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
        description:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        type: 'enriquecedoras',
        instance:
          'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
        action: 'protocol',
      },
      {
        id: 28,
        start: '22/06/2022',
        end: '23/06/2022',
        title: 'Supervixens',
        image: 'http://dummyimage.com/115x100.png/dddddd/000000',
        short_description:
          'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        description:
          'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        type: 'otras',
        instance:
          'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        action: 'knowledge user',
      },
      {
        id: 29,
        start: '16/03/2023',
        end: '17/03/2023',
        title: 'Pirate, The',
        image: 'http://dummyimage.com/126x100.png/5fa2dd/ffffff',
        short_description:
          'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        description:
          'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        type: 'flexibles',
        instance:
          'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
        action: 'homogeneous',
      },
      {
        id: 30,
        start: '25/03/2020',
        end: '26/03/2020',
        title: 'Fados',
        image: 'http://dummyimage.com/186x100.png/5fa2dd/ffffff',
        short_description:
          'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
        description:
          'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        type: 'flexibles',
        instance:
          'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
        action: 'Fundamental',
      },
      {
        id: 31,
        start: '29/10/2020',
        end: '02/11/2020',
        title: 'Smashed',
        image: 'http://dummyimage.com/160x100.png/ff4444/ffffff',
        short_description:
          'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        type: 'avance_academico',
        instance:
          'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        action: 'local area network',
      },
      {
        id: 32,
        start: '02/04/2020',
        end: '03/04/2020',
        title: 'Boy in Blue, The',
        image: 'http://dummyimage.com/231x100.png/5fa2dd/ffffff',
        short_description:
          'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        type: 'avance_academico',
        instance:
          'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        action: 'directional',
      },
      {
        id: 33,
        start: '17/09/2024',
        end: '21/09/2024',
        title: 'La Bande du drugstore',
        image: 'http://dummyimage.com/194x100.png/dddddd/000000',
        short_description: 'Fusce consequat. Nulla nisl. Nunc nisl.',
        description:
          'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        type: 'avance_academico',
        instance:
          'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        action: 'hybrid',
      },
      {
        id: 34,
        start: '26/07/2021',
        end: '28/07/2021',
        title: 'Hollow Triumph (a.k.a. The Scar)',
        image: 'http://dummyimage.com/122x100.png/cc0000/ffffff',
        short_description:
          'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
        description:
          'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
        type: 'flexibles',
        instance: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
        action: 'array',
      },
      {
        id: 35,
        start: '17/09/2023',
        end: '21/09/2023',
        title: 'Character (Karakter)',
        image: 'http://dummyimage.com/243x100.png/cc0000/ffffff',
        short_description:
          'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
        description:
          'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        type: 'enriquecedoras',
        instance:
          'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
        action: 'definition',
      },
      {
        id: 36,
        start: '11/10/2021',
        end: '11/10/2021',
        title: 'My Left Eye Sees Ghosts (Ngo joh aan gin diy gwai)',
        image: 'http://dummyimage.com/218x100.png/dddddd/000000',
        short_description:
          'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        description:
          'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
        type: 'enriquecedoras',
        instance:
          'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        action: 'Balanced',
      },
      {
        id: 37,
        start: '05/04/2021',
        end: '06/04/2021',
        title: 'Deep Crimson (Profundo carmesí)',
        image: 'http://dummyimage.com/108x100.png/cc0000/ffffff',
        short_description:
          'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        type: 'avance_academico',
        instance:
          'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
        action: 'infrastructure',
      },
      {
        id: 38,
        start: '22/01/2023',
        end: '27/01/2023',
        title: 'Tom & Viv',
        image: 'http://dummyimage.com/177x100.png/dddddd/000000',
        short_description:
          'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
        description:
          'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        type: 'otras',
        instance:
          'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        action: 'solution',
      },
      {
        id: 39,
        start: '29/05/2020',
        end: '03/06/2020',
        title: 'The Party',
        image: 'http://dummyimage.com/157x100.png/cc0000/ffffff',
        short_description:
          'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
        description:
          'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        type: 'flexibles',
        instance:
          'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        action: 'modular',
      },
      {
        id: 40,
        start: '06/09/2023',
        end: '11/09/2023',
        title: 'Fallen Idol, The',
        image: 'http://dummyimage.com/207x100.png/cc0000/ffffff',
        short_description:
          'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
        description:
          'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
        type: 'seriadas',
        instance:
          'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
        action: 'Multi-layered',
      },
      {
        id: 41,
        start: '25/08/2021',
        end: '26/08/2021',
        title: 'Arrested Development Documentary Project, The',
        image: 'http://dummyimage.com/178x100.png/cc0000/ffffff',
        short_description:
          'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
        description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        type: 'flexibles',
        instance:
          'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
        action: 'asynchronous',
      },
      {
        id: 42,
        start: '28/01/2021',
        end: '29/01/2021',
        title: 'Kindred, The',
        image: 'http://dummyimage.com/153x100.png/cc0000/ffffff',
        short_description:
          'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        description:
          'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        type: 'seriadas',
        instance:
          'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
        action: 'disintermediate',
      },
      {
        id: 43,
        start: '21/12/2020',
        end: '22/12/2020',
        title:
          'Django the Bastard (Strangers Gundown, The) (Django il bastardo)',
        image: 'http://dummyimage.com/234x100.png/ff4444/ffffff',
        short_description:
          'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        description:
          'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        type: 'seriadas',
        instance:
          'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        action: 'Self-enabling',
      },
      {
        id: 44,
        start: '26/06/2021',
        end: '27/06/2021',
        title: 'Lord of the Flies',
        image: 'http://dummyimage.com/128x100.png/ff4444/ffffff',
        short_description:
          'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
        description:
          'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
        type: 'seriadas',
        instance:
          'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
        action: 'bandwidth-monitored',
      },
      {
        id: 45,
        start: '25/07/2022',
        end: '29/07/2022',
        title: 'Frankie Starlight',
        image: 'http://dummyimage.com/177x100.png/ff4444/ffffff',
        short_description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
        description:
          'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        type: 'flexibles',
        instance:
          'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
        action: 'real-time',
      },
      {
        id: 46,
        start: '29/01/2022',
        end: '02/02/2022',
        title: 'Monkey Business',
        image: 'http://dummyimage.com/185x100.png/ff4444/ffffff',
        short_description:
          'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
        description:
          'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        type: 'avance_academico',
        instance:
          'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        action: 'secured line',
      },
      {
        id: 47,
        start: '22/05/2020',
        end: '25/05/2020',
        title: 'My Big Fat Greek Wedding',
        image: 'http://dummyimage.com/177x100.png/5fa2dd/ffffff',
        short_description:
          'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        description:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        type: 'seriadas',
        instance:
          'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        action: 'human-resource',
      },
      {
        id: 48,
        start: '16/03/2023',
        end: '18/03/2023',
        title: 'Santa Clause, The',
        image: 'http://dummyimage.com/233x100.png/5fa2dd/ffffff',
        short_description:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
        description:
          'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        type: 'seriadas',
        instance:
          'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        action: 'grid-enabled',
      },
      {
        id: 49,
        start: '28/02/2021',
        end: '03/03/2021',
        title: 'Electric Dragon 80.000 V',
        image: 'http://dummyimage.com/129x100.png/cc0000/ffffff',
        short_description:
          'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
        description:
          'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
        type: 'flexibles',
        instance:
          'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
        action: 'content-based',
      },
      {
        id: 50,
        start: '01/05/2024',
        end: '01/05/2024',
        title: 'My One and Only',
        image: 'http://dummyimage.com/140x100.png/ff4444/ffffff',
        short_description:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
        description:
          'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        type: 'enriquecedoras',
        instance:
          'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        action: 'multi-state',
      },
      {
        id: 51,
        start: '18/01/2022',
        end: '20/01/2022',
        title: 'Some Came Running',
        image: 'http://dummyimage.com/110x100.png/cc0000/ffffff',
        short_description:
          'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        description:
          'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
        type: 'flexibles',
        instance:
          'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        action: 'User-friendly',
      },
      {
        id: 52,
        start: '19/09/2022',
        end: '20/09/2022',
        title: 'Journey for Margaret',
        image: 'http://dummyimage.com/189x100.png/dddddd/000000',
        short_description:
          'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
        description:
          'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
        type: 'enriquecedoras',
        instance:
          'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        action: 'Centralized',
      },
      {
        id: 53,
        start: '16/05/2023',
        end: '20/05/2023',
        title: 'Swing Time',
        image: 'http://dummyimage.com/103x100.png/ff4444/ffffff',
        short_description:
          'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
        description:
          'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
        type: 'flexibles',
        instance:
          'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        action: 'Virtual',
      },
      {
        id: 54,
        start: '29/04/2020',
        end: '03/05/2020',
        title: 'By the Light of the Silvery Moon',
        image: 'http://dummyimage.com/118x100.png/dddddd/000000',
        short_description:
          'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
        description:
          'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        type: 'avance_academico',
        instance:
          'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
        action: 'Diverse',
      },
      {
        id: 1000,
        start: '20/02/2023',
        end: '22/02/2023',
        title: 'Black Pond',
        image: 'http://dummyimage.com/192x100.png/cc0000/ffffff',
        short_description:
          'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        description:
          'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        type: 'avance_academico',
        instance:
          'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
        action: 'systemic',
      },
    ],
  },
} as Meta<typeof BmbTimestreamComponent>;

type Story = StoryObj<BmbTimestreamComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 1000px">
        <bmb-timestream
          [startDate]="startDate"
          [endDate]="endDate"
          [dateFormat]="dateFormat"
          [lang]="lang"
          [events]="events"
        />
      </div>
    `,
  }),
};
