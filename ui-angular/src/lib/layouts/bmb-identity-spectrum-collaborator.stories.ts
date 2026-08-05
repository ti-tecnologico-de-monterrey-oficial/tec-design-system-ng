import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { Component, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BmbTopBarComponent } from '../components/bmb-top-bar/bmb-top-bar.component';
import { BmbSidebarComponent } from '../components/bmb-sidebar/bmb-sidebar.component';
import { BmbHomeCardComponent } from '../components/bmb-home-card/bmb-home-card.component';
import { BmbTabsComponent } from '../components/bmb-tabs/bmb-tabs.component';
import { BmbUserSummaryContentComponent } from '../components/bmb-user-summary/bmb-user-summary-content/bmb-user-summary-content.component';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../components/bmb-card/bmb-card.component';
import { BmbFormValidatorComponent } from '../components/bmb-form-validator/bmb-form-validator.component';
import { BmbInputComponent } from '../components/bmb-input/bmb-input.component';

import { IBmbNativeModal } from '../components/bmb-modal/bmb-modal.interface';
import { BmbNativeModalService } from '../services/modal/native-modal.service';
import { IBmbActionHeader } from '../types';

import { BmbButtonDirective } from '../directives/bmb-button/button.directive';
import { BmbLayoutDirective } from '../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbSelectorDirective } from '../directives/bmb-selector/bmb-selector.directive';

import * as topBarStory from '../components/bmb-top-bar/bmb-top-bar.stories';
import * as sideBarStory from '../components/bmb-sidebar/bmb-sidebar.stories';
import * as homeCardStory from '../components/bmb-home-card/bmp-home-card.stories';
import * as tabsStory from '../components/bmb-tabs/bmb-tabs.component.stories';
import * as genericCardStory from '../components/bmb-card/bmb-card.stories';
import * as userSummaryContentStory from '../components/bmb-user-summary/bmb-user-summary-content/bmb-user-summary-content.stories';
import * as inputStory from '../components/bmb-input/bmb-input.stories';
import * as itemItemStory from '../components/bmb-item/bmb-item.stories';
import * as actionMenuStory from '../components/bmb-action-menu/bmb-action-menu.stories';
import * as dropzoneStory from '../components/bmb-dropzone/bmb-dropzone.stories';
import * as nativeModalStory from '../components/bmb-modal/bmb-native-modal.stories';

import * as buttonDirectiveStory from '../directives/bmb-button/button.stories';
import * as layoutDirectiveStory from '../directives/bmb-layout/bmb-layout.stories';
import * as verticalLayoutDirectiveStory from '../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.stories';
import * as selectorDirectiveStory from '../directives/bmb-selector/bmb-selector.stories';

import {
  BlockquoteType,
  DESIGN_SYSTEM_TITLE,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralDescription,
  getPageStructureForTemplateStories,
  getSpecialSpecifications,
  getStoryTitle,
  getTechnicalDocReferences,
  RELEVANT_TITLE,
} from '../utils/doc/utils';
import { BmbActionMenuComponent } from '../components/bmb-action-menu/bmb-action-menu.component';
import { BmbItemComponent } from '../components/bmb-item/bmb-item.component';
import { BmbDropzoneComponent } from '../components/bmb-dropzone/bmb-dropzone.component';

const HTML_TEMPLATE: string = `
<div class="bmb_organism-identity-spectrum">
  <bmb-top-bar
    [userInformation]="{
      name: 'Santiago Hernández',
      image: 'https://picsum.photos/id/64/200/300',
      role: 'Alumno'
    }"
    [appPowered]="'Powered x Bamboo Design'"
    [lang]="'es'"
    [mitec]="true"
    [alertNotification]="[
      {
        id: 10,
        title: 'Alerta 10',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10',
            type: 'button',
            variant: 'primary'
          }
        ],
        date: '19/11/2024',
        isRead: false,
        time: '12:00',
        tags: [
          { text: 'tag1', color: 'info' },
          { text: 'tag2', color: 'brand' }
        ],
        type: 'tipo 1',
        isFavorite: true,
        isArchived: false
      },
      {
        id: 1,
        title: 'Alerta 1',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'link',
            href: 'https://www.google.com'
          },
          {
            text: 'Descripción de la alerta 10',
            type: 'button',
            variant: 'secondary-filled'
          }
        ],
        date: '01/11/2024',
        isRead: false,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: true,
        isArchived: false
      },
      {
        id: 2,
        title: 'Alerta 2',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/25/200'
          }
        ],
        date: '19/11/2024',
        isRead: true,
        time: '15:00',
        type: 'tipo 2',
        isFavorite: false,
        isArchived: true
      },
      {
        id: 3,
        title: 'Alerta 3',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'paragraph',
            style: 'bold'
          },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' }
        ],
        date: '18/11/2024',
        isRead: false,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: false,
        isArchived: false
      },
      {
        id: 4,
        title: 'Alerta 4',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'paragraph',
            style: 'bold'
          },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' }
        ],
        date: '02/11/2024',
        isRead: true,
        time: '12:00',
        type: 'tipo 3',
        isFavorite: false,
        isArchived: false
      },
      {
        id: 4,
        title: 'Alerta 40',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/26/200'
          }
        ],
        date: '02/01/2024',
        isRead: true,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: false,
        isArchived: false
      }
    ]"
  />
  <main class="bmb_organism-identity-spectrum-main">
    <bmb-home-card
      leftIcon="chevron_left"
      icon="account_circle"
      bgIconAppearance="blue-mariner-700"
      title="Mi perfil - Detalle extendido"
      subtitle="Mi perfil - Detalle extendido"
      contentPadding="xl"
      [isExpanded]="true"
      [actionHeaders]="actionHeaders"
    >
      <bmb-tabs
        format="uppercase"
        [tabs]="[
          { id: 1, title: 'Perfil personal', isActive: true },
          { id: 2, title: 'Perfil colaborador', isActive: false }
        ]"
        [(selectedTabId)]="selectedTab"
      >
        <section
          bmbSelector
          [idSelector]="1"
          [activeSelectorID]="selectedTab"
          bmbLayout
          [isContainerQuery]="true"
          margin="l"
          gapSize="xl"
        >
          <section bmbLayoutItem [colLg]="6">
            <section bmbVerticalLayout gapSize="xl">
              <bmb-card borderRadius="m" margin="none" bmbVerticalLayoutItem>
                <bmb-card-content padding="l">
                  <bmb-user-summary-content
                    name="Test Name"
                    userId="L0227613"
                    image="https://picsum.photos/id/1009/200/300"
                    [additionalInfo]="'atavares@tec.mx'"
                    contentLayout="row"
                    [isImageBordered]="false"
                    [isProfile]="true"
                    bmbLayoutItem
                    margin="none"

                  />
                </bmb-card-content>
              </bmb-card>
              <bmb-card borderRadius="m" margin="none" bmbVerticalLayoutItem>
                <bmb-action-menu title="Datos de contacto" [showHeader]='true'>
                  <ng-template>
                    <bmb-item
                      icon="mail"
                      label="Correo personal"
                      value="atavares@gmail.com"
                      valueLink="mailto:atavares@gmail.com"
                      valueTarget="_self"
                    />
                  </ng-template>
                  <ng-template>
                    <bmb-item
                      icon="mobile"
                      label="Teléfono móvil"
                      value="8123456789"
                      valueLink="tel:8123456789"
                      valueTarget="_self"
                    />
                  </ng-template>
                  <ng-template>
                    <bmb-item
                      icon="call"
                      label="Teléfono local"
                      value="8123456789"
                      valueLink="tel:8123456789"
                      valueTarget="_self"
                    />
                  </ng-template>
                  <ng-template>
                    <bmb-item
                      icon="location_on"
                      label="Dirección permanente"
                      value="Av. Eugenio Garza Sada 2501 Col. Tecnológico CP 64700, Monterrey Nuevo León, México"
                    />
                  </ng-template>
                  <ng-template>
                    <bmb-item
                      icon="location_on"
                      label="Dirección de residencia"
                      value="Av. Eugenio Garza Sada 2501 Col. Tecnológico CP 64700, Monterrey Nuevo León, México"
                    />
                  </ng-template>
                </bmb-action-menu>
              </bmb-card>
            </section>
          </section>
          <section bmbLayoutItem [colLg]="6">
            <bmb-card borderRadius="m" margin="none" >
              <bmb-action-menu title="Personas afiliadas" [showHeader]='true'>
                <ng-template>
                  <bmb-item
                    label="Madre"
                    value="Paloma Reyes Araujo"
                  />
                </ng-template>
                <ng-template>
                  <bmb-item
                    label="Padre"
                    value="Arturo Araujo Reyes"
                  />
                </ng-template>
                <ng-template>
                  <bmb-item
                    label="Responsable de pago"
                    value="Arturo Araujo Reyes"
                  />
                </ng-template>
                <ng-template>
                  <bmb-item
                    label="Hijo/Hija"
                    value="Paloma Reyes Araujo"
                  />
                </ng-template>
                <ng-template>
                  <bmb-item
                    label="Esposo/Esposa"
                    value="Paloma Reyes Araujo"
                  />
                </ng-template>
              </bmb-action-menu>  
            </bmb-card>
          </section>
        </section>
        <section
          bmbSelector
          [idSelector]="2"
          [activeSelectorID]="selectedTab"
          bmbLayout
          [isContainerQuery]="true"
          margin="l"
          gapSize="xl"
        >
          <section bmbLayoutItem [colLg]="6">
            <section bmbVerticalLayout gapSize="xl">
              <bmb-card borderRadius="m" margin="none" bmbVerticalLayoutItem>
                <bmb-action-menu title="Datos de colaborador" [showHeader]='true'>
                  <ng-template>
                    <bmb-item
                      icon="badge"
                      label="Puesto"
                      value="Desarrollador de software"
                    />
                  </ng-template>
                  <ng-template>
                    <bmb-item
                      icon="location_on"
                      label="Area"
                      value="Dirección de Desarrollo-Techvolution 2.0"
                    />
                  </ng-template>
                  <ng-template>
                    <bmb-item
                      icon="schedule"
                      label="Antigüedad"
                      value="15 años"
                    />
                  </ng-template>
                  <ng-template>
                    <bmb-item
                      icon="description"
                      label="Tipo de contrato"
                      value="Planta tiempo completo"
                    />
                  </ng-template>
                </bmb-action-menu>
              </bmb-card>
              <bmb-card borderRadius="m" margin="none" bmbVerticalLayoutItem>
              <bmb-action-menu title="Reconocimientos" [showHeader]='true'>
                  <ng-template>
                    <button bmbButton size="large" appearance="secondary-outlined" (click)="goToLink()">
                      Ver reconocimientos en Success Factors
                    </button>
                  </ng-template>
                </bmb-action-menu>
              </bmb-card>
            </section>
          </section>
          <section bmbLayoutItem [colLg]="6">
            <section bmbVerticalLayout gapSize="xl">
              <bmb-card borderRadius="m" margin="none" bmbVerticalLayoutItem>
                <bmb-action-menu title="Contactos laborales" [showHeader]='true'>
                  <ng-template>
                    <h2 class="font-regular-5">Mi Líder</h2>
                    <bmb-user-summary-content 
                      [isProfile]="true" 
                      [name]="'Arturo González Martínez'" 
                      [userId]="'Director de Desarrollo'" 
                      [image]="'https://picsum.photos/id/64/200/300'" 
                      [isImageBordered]="false" 
                      [altImage]="'Arturo González Martínez'" 
                      [imageSize]="'mobile-medium'" 
                      [infoCareer]="'Techvolution 2.0'" 
                      [campus]="'L01290262'" 
                      [email]="{label: 'agonzalez@tec.mx', link: 'mailto:agonzalez@tec.mx', target: '_blank'}" 
                      [contentLayout]="'row'" 
                      (onUserClick)="onUserClick($event)">
                    </bmb-user-summary-content>
                  </ng-template>
                  <ng-template>
                    <h2 class="font-regular-5">Mi Generalista</h2>
                    <bmb-user-summary-content 
                      [isProfile]="true" 
                      [name]="'Ana María Gutiérrez Pineda'" 
                      [userId]="'Generalista de Talento - Áreas de Apoyo'" 
                      [image]="'https://picsum.photos/id/64/200/300'" 
                      [isImageBordered]="false" 
                      [altImage]="'Ana María Gutiérrez Pineda'" 
                      [imageSize]="'mobile-medium'" 
                      [infoCareer]="'TyE Áreas de Apoyo'" 
                      [campus]="'L01290262'" 
                      [email]="{label: 'agutierrez@tec.mx', link: 'mailto:agutierrez@tec.mx', target: '_blank'}" 
                      [contentLayout]="'row'" 
                      (onUserClick)="onUserClick($event)">
                    </bmb-user-summary-content>
                  </ng-template>
                </bmb-action-menu>
              </bmb-card>
              <bmb-card borderRadius="m" margin="none" bmbVerticalLayoutItem>
                <bmb-action-menu title="Días de descanso" [showHeader]='true'>
                  <ng-template>
                    <bmb-item
                      label="Días de descanso"
                      value="10 días"
                    />
                  </ng-template>
                  <ng-template>
                    <bmb-item
                      label="Días Flex"
                      value="10 días"
                    />
                  </ng-template>
                   <ng-template>
                    <button bmbButton size="large" appearance="secondary-outlined" (click)="goToLink()">
                      Administrar días de descanso en Success Factors
                    </button>
                  </ng-template>
                </bmb-action-menu>
              </bmb-card>
            </section>
          </section>
        </section>
      </bmb-tabs>
    </bmb-home-card>
  </main>
  <bmb-sidebar
    [elements]="[
      [
        {
          id: 1,
          icon: 'home',
          title: 'Home',
          link: 'https://developer.mozilla.org/es/docs/Web/JavaScript',
          target: '_blank'
        }
      ],
      [
        {
          id: 2,
          icon: 'build',
          title: 'Tools',
          link: 'https://developer.mozilla.org/es/docs/Web/JavaScript',
          target: '_blank'
        }
      ]
    ]"
    [title]="'Navegacion para mobiles'"
    [position]="'left'"
  />
  <ng-template #modalTemplate>
    <bmb-form-validator [(formGroup)]="userForm" (ngSubmit)="onSubmit()">
      <section bmbLayoutItem bmbVerticalLayout gapSize="m">
        <section bmbVerticalLayoutItem gapSize="s">
          <label for="bmbFileInput" class="font-regular-4 bmb_padding-s">Imagen de perfil</label><br>
          <bmb-dropzone
            [acceptedExtensions]="['png', 'jpeg', 'jpg']"
            [dropInstruction]="'Arrastra tu archivo y suelta o'"
            [dropLabel]="'sube un archivo'"
            [errorMessageFormat]="'Formato no soportado'"
            [errorMessageSize]="'El archivo supera el tamaño máximo permitido.'"
            [fileSize]="2"
            [formatFilesLabel]="'Imagen de perfil'"
            [linkFilesSupported]="''"
            [linkLabel]="'Ver más información de formatos de archivo aceptados.'"
            [mainIcon]="'image'"
            [multiple]="true"
            [name]="'bmbFileInput'"
            [progress]="progress()"
            (fileRemoved)="removeFileFromForm($event)"
            (newFile)="onFileReceived($event)"
          />
        </section>
        <bmb-input
          inputId="email_id"
          name="email"
          label="Correo personal"
          value="paraujo@gmail.com"
          bmbVerticalLayoutItem
        />
        <section bmbVerticalLayoutItem bmbLayout margin="none" gapSize="m">
          <section bmbLayoutItem [colLg]="6">
            <bmb-input
              inputId="celphone_id"
              name="celphone"
              label="Teléfono móvil"
              value="8123456789"
              bmbVerticalLayoutItem
            />
          </section>
          <section bmbLayoutItem [colLg]="6">
            <bmb-input
              inputId="phone_id"
              name="phone"
              label="Teléfono local"
              value="8123456789"
              bmbVerticalLayoutItem
            />
          </section>
        </section>
        <section bmbVerticalLayoutItem bmbLayout margin="none" gapSize="m">
          <section bmbLayoutItem [colLg]="6">
            <bmb-input
              type="text-area"
              [showMaxTextLength]="false"
              inputId="permanent_address_id"
              name="permanent_address"
              label="Dirección permanente"
              value="Av. Eugenio Garza Sada 2501 Col. Tecnológico CP 64700, Monterrey Nuevo León, México"
            />
          </section>
          <section bmbLayoutItem [colLg]="6">
            <bmb-input
              type="text-area"
              [showMaxTextLength]="false"
              inputId="residential_address_id"
              name="residential_address"
              label="Dirección de residencia"
              value="Av. Eugenio Garza Sada 2501 Col. Tecnológico CP 64700, Monterrey Nuevo León, México"
            />
          </section>
        </section>

        <section
          bmbVerticalLayoutItem
          bmbLayout
          margin="none"
          gapSize="l"
          justify="end"
          class="bmb_organism-identity-spectrum-form-buttons"
        >
          <button bmbButton appearance="secondary-outlined" type="button">
            Cancelar
          </button>
          <button bmbButton appearance="primary" type="submit">
            Guardar cambios
          </button>
        </section>
      </section>
    </bmb-form-validator>
  </ng-template>
</div>
`;

@Component({
  selector: 'storybook-identity-spectrum-collaborator',
  standalone: true,
  imports: [
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbTabsComponent,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbUserSummaryContentComponent,
    BmbActionMenuComponent,
    BmbItemComponent,
    BmbFormValidatorComponent,
    BmbInputComponent,
    BmbButtonDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbSelectorDirective,
    BmbDropzoneComponent,
  ],
  template: HTML_TEMPLATE,
})
export class StorybookIdentitySpectrumCollaborator {
  selectedTab = 1;
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'edit',
      alt: 'edit',
      action: () => this.openModal(),
    },
  ];
  userForm: FormGroup = new FormGroup({});
  progress = signal<Record<string, number>>({});

  @ViewChild(BmbDropzoneComponent) dropzone?: BmbDropzoneComponent;
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  openModal(): void {
    const dataModal: IBmbNativeModal = {
      title: 'Editar datos de contacto',
      content: this.modalTemplate,
    };
    this.modalService.openModal(dataModal);
  }

  goToLink(): void {
    window.open('https://www.successfactors.com/', '_blank');
  }

  constructor(
    private modalService: BmbNativeModalService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      bmbFileInput: [null],
      email: [''],
      celphone: [''],
      phone: [''],
      permanent_address: [''],
      residential_address: [''],
    });
  }

  onFileReceived(files: File | File[]) {
    const incomingFiles = Array.isArray(files) ? files : [files];
    const current = this.getCurrentFiles();

    const currentKeys = new Set(current.map((f) => `${f.name}-${f.size}`));
    const newFiles = incomingFiles.filter(
      (f) => !currentKeys.has(`${f.name}-${f.size}`),
    );

    const updated = [...current, ...newFiles];

    this.userForm.patchValue({
      bmbFileInput: updated.length > 1 ? updated : updated[0],
    });

    newFiles.forEach(this.simulateUpload.bind(this));
  }

  simulateUpload(file: File) {
    let progress = 0;

    this.progress.update((map) => ({ ...map, [file.name]: 0 }));

    const interval = setInterval(() => {
      progress += 50;

      this.progress.update((map) => ({
        ...map,
        [file.name]: Math.min(progress, 100),
      }));

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  }

  removeFileFromForm(fileName: string) {
    const files = this.getCurrentFiles();
    const updated = files.filter((f) => f.name !== fileName);

    this.userForm.patchValue({
      bmbFileInput: updated.length > 1 ? updated : updated[0] ?? null,
    });

    const progressMap = { ...this.progress() };
    delete progressMap[fileName];
    this.progress.set(progressMap);
  }

  getCurrentFiles(): File[] {
    const control = this.userForm.value.bmbFileInput;
    if (!control) return [];
    return Array.isArray(control) ? control : [control];
  }

  onSubmit() {
    const files = this.getCurrentFiles();
    const allUploaded = files.every((f) => this.progress()[f.name] === 100);

    if (!allUploaded) return;

    console.log('Enviar:', this.userForm.value);

    this.userForm.reset();
    this.progress.set({});
    this.dropzone?.reset();
  }
}

export default {
  title: 'Organisms/Identity spectrum/Collaborator',
  component: StorybookIdentitySpectrumCollaborator,
  tags: ['!autodocs'],
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 80rem;">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `${getGeneralDescription(
          `<br/>***Identity spectrum Collaborators*** is a ${DESIGN_SYSTEM_TITLE} organism where profile details are displayed and some of the data can be edited.
<br/><br/>`,
          {
            isSubStory: true,
          },
        )}
${getSpecialSpecifications(
  `
  ${getAlertBlockquote(
    `
The content documented in the code blocks can be used as a template or example of the Identity Spectrum implementation,
the developer can add data to the ${getStoryTitle(genericCardStory.default.title!)} as needed, as well as more inputs in the form for editing.
`,
    {
      title: '###'.concat(RELEVANT_TITLE.important),
      blockquoteType: BlockquoteType.important,
    },
  )}
  ${getTechnicalDocReferences({
    references: [
      { title: topBarStory.default.title! },
      { title: sideBarStory.default.title! },
      { title: homeCardStory.default.title! },
      { title: tabsStory.default.title! },
      { title: genericCardStory.default.title! },
      { title: userSummaryContentStory.default.title! },
      { title: actionMenuStory.default.title! },
      { title: itemItemStory.default.title! },
      { title: inputStory.default.title! },
      { title: nativeModalStory.default.title! },
      { title: buttonDirectiveStory.default.title! },
      { title: layoutDirectiveStory.default.title! },
      { title: verticalLayoutDirectiveStory.default.title! },
      { title: selectorDirectiveStory.default.title! },
      { title: dropzoneStory.default.title! },
    ],
  })}`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock(
  `
  BmbTopBarComponent,
  BmbSidebarComponent,
  BmbHomeCardComponent,
  BmbTabsComponent,
  BmbCardComponent,
  BmbCardHeaderComponent,
  BmbCardContentComponent,
  BmbUserSummaryContentComponent,
  BmbIconItemComponent,
  BmbFormValidatorComponent,
  BmbInputComponent,
  BmbActionMenuComponent,
  BmbButtonDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbSelectorDirective,
  BmbDropzoneComponent
`,
  `import { TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
  `,
  `selectedTab = 1;
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'edit',
      alt: 'edit',
      action: () => this.openModal(),
    },
  ];
  userForm: FormGroup = new FormGroup({});

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  openModal(): void {
    const dataModal: IBmbNativeModal = {
      title: 'Editar datos de contacto',
      content: this.modalTemplate,
    };
    this.modalService.openModal(dataModal);
  }

  constructor(private modalService: BmbNativeModalService) {}`,
)}
\`\`\`html
${HTML_TEMPLATE}
\`\`\`
    `,
      },
    },
  },
} as Meta<typeof StorybookIdentitySpectrumCollaborator>;

type Story = StoryObj<StorybookIdentitySpectrumCollaborator>;

export const Default: Story = {
  render: (args) => ({
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-identity-spectrum-collaborator />
    `,
  }),
};
