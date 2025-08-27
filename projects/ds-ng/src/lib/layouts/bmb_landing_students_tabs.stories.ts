import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Description, Primary, Title } from '@storybook/addon-docs/blocks';
import {
  BmbHomeCardComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbSidebarComponent,
  BmbTabsComponent,
  BmbTopBarComponent,
  IBmbTab,
} from '../../public-api';
import { CommonModule } from '@angular/common';
import { BmbImageComponent } from '../components/bmb-image/bmb-image.component';
import {
  FULLSCREEN_DESC,
  getBasicExampleBlock,
  getFormatName,
  getLandingGeneralDesc,
  getSpecialSpecifications,
  TECHNICAL_DOC_REFERENCES,
  TECHNICAL_DOC_TITLE,
} from '../utils/doc/utils';
import * as topBarStory from '../components/bmb-top-bar/bmb-top-bar.stories';
import * as sideBarStory from '../components/bmb-sidebar/bmb-sidebar.stories';
import * as homeCardStory from '../components/bmb-home-card/bmp-home-card.stories';
import * as imageStory from '../components/bmb-image/bmb-image.stories';
import * as tabStory from '../components/bmb-tabs/bmb-tabs.component.stories';
import * as layoutStory from '../directives/bmb-layout/bmb-layout.stories';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTabsComponent,
    BmbImageComponent,
  ],
  selector: 'storybook-home-mitec-mobile',
  template: `
    <div class="bmb_template-single-home-card">
      <bmb-top-bar
        [userInformation]="{
          name: 'Santiago Hernández',
          image: 'https://picsum.photos/id/64/200/300',
          role: 'Alumno',
        }"
        [hasLogoutButton]="false"
        [appName]="'TecTest'"
        [appSubTitle]="'Sub title'"
        [showLang]="false"
        [lang]="'es'"
        [assignmentNotification]="['1', '2', '3']"
        [alertNotification]="{
          new: [
            { description: 'Descripcion Corta ', time: '4d 12h' },
            {
              description: 'Descripcion Corta Larga asdasd adasdaw',
              time: '4d 12h',
            },
          ],
          all: [
            { description: 'Descripcion Corta All', time: '4d 12h' },
            { description: 'Descripcion Corta all 1', time: '4d 12h' },
          ],
          seen: [
            { description: 'Descripcion Corta seen 1', time: '4d 12h' },
            { description: 'Descripcion Corta seen 2', time: '4d 12h' },
            { description: 'Descripcion Corta seen 3', time: '4d 12h' },
          ],
        }"
      />
      <main class="bmb_template-single-home-card-main">
        <bmb-home-card
          leftIcon="chevron_left"
          icon="school"
          bgIconAppearance="blue-primary"
          title="Nombre del servicio"
          contentPadding="xl"
        >
          <bmb-image
            src="https://picsum.photos/id/13/1000"
            alt="Alt text"
            ratio="26/9"
            borderRadius="none"
            [enableZoom]="true"
          />
          <bmb-tabs
            [format]="'uppercase'"
            [tabs]="[
              { id: 1, title: 'Opción 1', isActive: true },
              { id: 2, title: 'Opción 2', isActive: false },
            ]"
            (selected)="handleSelectedTab($event)"
          ></bmb-tabs>
          @switch (selectedTab) {
            @case (1) {
              <section bmbLayout margin="none" class="bmb_padding-m">
                <div bmbLayoutItem [colSm]="1">
                  <bmb-image
                    src="https://picsum.photos/id/11/400"
                    alt="Alt text"
                    ratio="1/1"
                    borderRadius="none"
                    [enableZoom]="true"
                  />
                </div>
                <div bmbLayoutItem [colSm]="3">
                  <h1 class="font-medium-8">
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
                </div>
              </section>
            }
            @case (2) {
              <section bmbLayout margin="none" class="bmb_padding-m">
                <div bmbLayoutItem [colSm]="4">
                  <h1 class="font-medium-8">
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus
                    condimentum mi faucibus. In quisque justo senectus in sed
                    adipiscing. Arcu neque feugiat aenean nam accumsan justo ut.
                    Pulvinar urna amet proin sit sed tellus ipsum.
                  </p>
                </div>
              </section>
            }
          }
        </bmb-home-card>
      </main>
    </div>
    <bmb-sidebar
      [elements]="[
        [
          {
            id: 2,
            icon: 'task',
            title: 'Agregar firmantes',
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
          },
        ],
      ]"
      [title]="'Navegacion para mobiles'"
    ></bmb-sidebar>
  `,
})
class StorybookHomeMitecMobile {
  selectedTab = 1;

  handleSelectedTab(tab: IBmbTab) {
    this.selectedTab = tab.id;
  }
}

export default {
  title: 'Particularities/mitec web/Landings/Student tab',
  component: BmbTopBarComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookHomeMitecMobile, BmbTopBarComponent],
    }),
  ],
  parameters: {
    docs: {
      page: () => {
        return [Title({}), Description({}), Primary({})];
      },
      description: {
        component: `
${getLandingGeneralDesc('tab')}
${getSpecialSpecifications(`### ${TECHNICAL_DOC_TITLE}
>
${TECHNICAL_DOC_REFERENCES}
- [${topBarStory.default.title}](/docs/${getFormatName(topBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${sideBarStory.default.title}](/docs/${getFormatName(sideBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${homeCardStory.default.title}](/docs/${getFormatName(homeCardStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${imageStory.default.title}](/docs/${getFormatName(imageStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${tabStory.default.title}](/docs/${getFormatName(tabStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
- [${layoutStory.default.title}](/docs/${getFormatName(layoutStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation)
>
${FULLSCREEN_DESC}
`)}
${getBasicExampleBlock(
  `BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbTabsComponent,
    BmbImageComponent`,
  '',
  `selectedTab = 1;

  handleSelectedTab(tab: IBmbTab) {
    this.selectedTab = tab.id;
  }`,
)}
\`\`\`html
<div class="bmb_template-single-home-card">
  <bmb-top-bar
    [userInformation]="{
      name: 'Santiago Hernández',
      image: 'https://picsum.photos/id/64/200/300',
      role: 'Alumno',
    }"
    [hasLogoutButton]="false"
    [appName]="'TecTest'"
    [appSubTitle]="'Sub title'"
    [showLang]="false"
    [lang]="'es'"
    [assignmentNotification]="['1', '2', '3']"
    [alertNotification]="{
      new: [
        { description: 'Descripcion Corta ', time: '4d 12h' },
        {
          description: 'Descripcion Corta Larga asdasd adasdaw',
          time: '4d 12h',
        },
      ],
      all: [
        { description: 'Descripcion Corta All', time: '4d 12h' },
        { description: 'Descripcion Corta all 1', time: '4d 12h' },
      ],
      seen: [
        { description: 'Descripcion Corta seen 1', time: '4d 12h' },
        { description: 'Descripcion Corta seen 2', time: '4d 12h' },
        { description: 'Descripcion Corta seen 3', time: '4d 12h' },
      ],
    }"
  />
  <main class="bmb_template-single-home-card-main">
    <bmb-home-card
      leftIcon="chevron_left"
      icon="school"
      bgIconAppearance="blue-primary"
      title="Nombre del servicio"
      contentPadding="xl"
    >
      <bmb-image
        src="https://picsum.photos/id/15/1000"
        alt="Alt text"
        ratio="26/9"
        borderRadius="none"
        [enableZoom]="true"
      />
      <bmb-tabs
        [format]="'uppercase'"
        [tabs]="[
          { id: 1, title: 'Opción 1', isActive: true },
          { id: 2, title: 'Opción 2', isActive: false },
        ]"
        (selected)="handleSelectedTab($event)"
      ></bmb-tabs>
      @switch(selectedTab) {
        @case(1) {
          <section bmbLayout margin="none" class="bmb_padding-m">
            <div bmbLayoutItem [colSm]="1">
              <bmb-image
                src="https://picsum.photos/id/16/400"
                alt="Alt text"
                ratio="1/1"
                borderRadius="none"
                [enableZoom]="true"
              />
            </div>
            <div bmbLayoutItem [colSm]="3">
              <h1 class="font-medium-8">Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum </h1>
              <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed adipiscing. Arcu neque feugiat aenean nam accumsan justo ut. Pulvinar urna amet proin sit sed tellus ipsum.</p>
              <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed adipiscing. Arcu neque feugiat aenean nam accumsan justo ut. Pulvinar urna amet proin sit sed tellus ipsum.</p>
            </div>
          </section>
        }
        @case(2) {
          <section bmbLayout margin="none" class="bmb_padding-m">
            <div bmbLayoutItem [colSm]="4">
              <h1 class="font-medium-8">Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum </h1>
              <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed adipiscing. Arcu neque feugiat aenean nam accumsan justo ut. Pulvinar urna amet proin sit sed tellus ipsum.</p>
              <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed adipiscing. Arcu neque feugiat aenean nam accumsan justo ut. Pulvinar urna amet proin sit sed tellus ipsum.</p>
            </div>
          </section>
        }
      }
    </bmb-home-card>
  </main>
</div>
<bmb-sidebar
  [elements]="[
    [
      {
        id: 2,
        icon: 'task',
        title: 'Agregar firmantes',
        link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
      },
    ],
  ]"
  [title]="'Navegacion para mobiles'"
/>
\`\`\`
`,
      },
    },
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-home-mitec-mobile />
    `,
  };
};
