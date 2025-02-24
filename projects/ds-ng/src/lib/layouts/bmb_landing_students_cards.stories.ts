import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {
  BmbButtonDirective,
  BmbCardComponent,
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

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbImageComponent,
    BmbCardComponent,
    BmbButtonDirective,
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
          <section bmbLayout margin="none" class="bmb_padding-m">
            <div bmbLayoutItem [colSm]="4" [colLg]="6">
              <bmb-card margin="none">
                <section bmbLayout margin="none" class="bmb_padding-m">
                  <div bmbLayoutItem [colSm]="1">
                    <bmb-image
                      src="https://picsum.photos/400"
                      alt="Alt text"
                      ratio="9/26"
                      borderRadius="none"
                      [enableZoom]="true"
                    />
                  </div>
                  <div bmbLayoutItem [colSm]="3">
                    <h1 class="font-medium-8">
                      Lorem ipsum dolor sit amet consectetur.
                    </h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus. In quisque justo
                      senectus in sed adipiscing. Arcu neque feugiat aenean nam
                      accumsan justo ut. Pulvinar urna amet proin sit sed tellus
                      ipsum.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus. In quisque justo
                      senectus in sed adipiscing. Arcu neque feugiat aenean nam
                      accumsan justo ut. Pulvinar urna amet proin sit sed tellus
                      ipsum.
                    </p>
                  </div>
                </section>
              </bmb-card>
            </div>
            <div bmbLayoutItem [colSm]="4" [colLg]="6">
              <bmb-card margin="none">
                <section bmbLayout margin="none" class="bmb_padding-m">
                  <h1 bmbLayoutItem [colSm]="4" class="font-medium-8">
                    Lorem ipsum dolor sit amet consectetur.
                  </h1>
                  <div bmbLayoutItem [colSm]="1">
                    <bmb-image
                      src="https://picsum.photos/400"
                      alt="Alt text"
                      ratio="9/26"
                      borderRadius="none"
                      [enableZoom]="true"
                    />
                  </div>
                  <div bmbLayoutItem [colSm]="3">
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus.
                    </p>
                    <p>
                      <button bmbButton>Action</button>
                    </p>
                  </div>
                </section>
              </bmb-card>
              <bmb-card margin="none" style="margin-top: 1rem; display: block;">
                <section bmbLayout margin="none" class="bmb_padding-m">
                  <h1 bmbLayoutItem [colSm]="4" class="font-medium-8">
                    Lorem ipsum dolor sit amet
                  </h1>
                  <div bmbLayoutItem [colSm]="4">
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Nisl nibh
                      phasellus condimentum mi faucibus. In quisque justo
                      senectus in sed .
                    </p>
                  </div>
                  <div bmbLayoutItem [colSm]="4">
                    <button bmbButton appearance="secondary-outlined">
                      Action
                    </button>
                    <button bmbButton>2</button>
                  </div>
                </section>
              </bmb-card>
            </div>
          </section>
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
class StorybookHomeMitecMobile {}

export default {
  title: 'Macro componentes/Landing pages/Students cards',
  component: BmbTopBarComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookHomeMitecMobile, BmbTopBarComponent],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use the components needed for this organization ingit status
 TypeScript:

\`\`\`typescript
@Component({
  standalone: true,
  imports: [
    CommonModule,
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbImageComponent,
    BmbCardComponent,
    BmbButtonDirective
  ],
  selector: 'storybook-home-mitec-mobile',
  template:'
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
            <section bmbLayout margin="none" class="bmb_padding-m">
              <div bmbLayoutItem [colSm]="4" [colLg]="6">
                <bmb-card margin="none">
                  <section bmbLayout margin="none" class="bmb_padding-m">
                    <div bmbLayoutItem [colSm]="1">
                      <bmb-image
                        src="https://picsum.photos/400"
                        alt="Alt text"
                        ratio="9/26"
                        borderRadius="none"
                        [enableZoom]="true"
                      />
                    </div>
                    <div bmbLayoutItem [colSm]="3">
                      <h1 class="font-medium-8">Lorem ipsum dolor sit amet consectetur. </h1>
                      <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed adipiscing. Arcu neque feugiat aenean nam accumsan justo ut. Pulvinar urna amet proin sit sed tellus ipsum.</p>
                      <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed adipiscing. Arcu neque feugiat aenean nam accumsan justo ut. Pulvinar urna amet proin sit sed tellus ipsum.</p>
                    </div>
                  </section>
                </bmb-card>
              </div>
              <div bmbLayoutItem [colSm]="4" [colLg]="6">
                <bmb-card margin="none">
                  <section bmbLayout margin="none" class="bmb_padding-m">
                    <h1 bmbLayoutItem [colSm]="4" class="font-medium-8">Lorem ipsum dolor sit amet consectetur. </h1>
                    <div bmbLayoutItem [colSm]="1">
                      <bmb-image
                        src="https://picsum.photos/400"
                        alt="Alt text"
                        ratio="9/26"
                        borderRadius="none"
                        [enableZoom]="true"
                      />
                    </div>
                    <div bmbLayoutItem [colSm]="3">
                      <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus.</p>
                      <p>
                        <button bmbButton>Action</button>
                      </p>
                    </div>
                  </section>
                </bmb-card>
                <bmb-card margin="none" style="margin-top: 1rem; display: block;">
                  <section bmbLayout margin="none" class="bmb_padding-m">
                    <h1 bmbLayoutItem [colSm]="4" class="font-medium-8">Lorem ipsum dolor sit amet</h1>
                    <div bmbLayoutItem [colSm]="4">
                      <p>Lorem ipsum dolor sit amet consectetur. Nisl nibh phasellus condimentum mi faucibus. In quisque justo senectus in sed .</p>
                    </div>
                    <div bmbLayoutItem [colSm]="4">
                      <button bmbButton appearance="secondary-outlined">Action</button>
                      <button bmbButton>2</button>
                    </div>
                  </section>
                </bmb-card>
              </div>
            </section>
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
  ,
})
class StorybookHomeMitecMobile {}
'
\`\`\`

Below is an example of how you can use the components needed for this organization in HTML:
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
