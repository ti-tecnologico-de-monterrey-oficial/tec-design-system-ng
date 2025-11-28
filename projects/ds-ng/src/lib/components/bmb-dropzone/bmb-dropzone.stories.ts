import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbDropzoneComponent } from './bmb-dropzone.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbInputParamDesc,
  getAppearanceParam,
  getDefaultValueControl,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Inputs/Dropzone',
  component: BmbDropzoneComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BmbDropzoneComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getFileAndValidate',
          'getProgress',
          'isInvalidFileOnly',
          'dragLeave',
          'dragOver',
          'drop',
          'onErrorFile',
          'onFileSelected',
          'removeFile',
          'reset',
          'input',
          'validFile',
          'fileDataList',
          'getAvatarIcon',
          'getDropZoneClass',
          'getFileSizeInMB',
          'getFormatProgress',
          'isFileDuplicate',
          'isValidFileSize',
          'isValidFileType',
          'ngOnChanges',
          'getFileSizeMB',
          'getFormatSize',
          'isFormatSize',
          'organizedFiles',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'dropzone' })} to provide an area where files can be dragged and dropped onto it to be uploaded or to be used later`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/dropzone/descripcion-general-pPg1gmxU' })}
##Reactive form example
>This example demonstrates how to use BmbDropdownComponent within an Angular reactive form, ensuring validation and handling the field and its value correctly.
>
###TypeScript example for reactive form
>
Below is a TypeScript example with the basic code to use this component in a reactive form:
>
\`\`\`typescript
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BmbButtonDirective,
  BmbDropzoneComponent,
} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
>
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbButtonDirective,
    BmbDropzoneComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild(BmbDropzoneComponent) dropzone?: BmbDropzoneComponent;
>
  form: FormGroup;
  progress = signal<Record<string, number>>({});
>
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      file: [null],
    });
  }
>
  onFileReceived(files: File | File[]) {
    const incomingFiles = Array.isArray(files) ? files : [files];
    const current = this.getCurrentFiles();
>
    const currentKeys = new Set(current.map((f) => \`\${f.name}-\${f.size}\`));
    const newFiles = incomingFiles.filter(
      (f) => !currentKeys.has(\`\${f.name}-\${f.size}\`),
    );
>
    const updated = [...current, ...newFiles];
    this.form.patchValue({
      file: this.formAllowsMultiple(updated) ? updated : updated[0],
    });
>
    newFiles.forEach(this.simulateUpload.bind(this));
  }
>
  simulateUpload(file: File) {
    let progress = 0;
>
    this.progress.update((map) => ({ ...map, [file.name]: 0 }));
>
    const interval = setInterval(() => {
      progress += 50;
      this.progress.update((map) => ({
        ...map,
        [file.name]: Math.min(progress, 100),
      }));
>
      if (progress >= 100) {
        clearInterval(interval);
        console.log('Archivo simulado al 100%');
      }
    }, 300);
  }
>
  removeFileFromForm(fileName: string) {
    const files = this.getCurrentFiles();
    const updated = files.filter((f) => f.name !== fileName);
>
    this.form.patchValue({
      file: updated.length > 1 ? updated : (updated[0] ?? null),
    });
>
    const progressMap = { ...this.progress() };
    delete progressMap[fileName];
    this.progress.set(progressMap);
  }
>
  onSubmit() {
    const files = this.getCurrentFiles();
    const allUploaded = files.every((f) => this.progress()[f.name] === 100);
>
    if (!allUploaded) {
      console.warn('Algunos archivos no se han subido completamente.');
      return;
    }
>
    console.log('Archivos listos para enviar:', files);
>
    // Resetear
    this.form.reset();
    this.progress.set({});
    this.dropzone?.reset();
  }
>
  getCurrentFiles(): File[] {
    const control = this.form.value.file;
    if (!control) return [];
    return Array.isArray(control) ? control : [control];
  }
>
  formAllowsMultiple(files: File[]): boolean {
    return files.length > 1;
  }
}
>
\`\`\`
>### HTML example for reactive form
>
Below is a HTML example with the basic code to use this component in a reactive form:
\`\`\`html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <bmb-dropzone
    [acceptedExtensions]="['png', 'jpeg', 'jpg']"
    [dropInstruction]="'Arrastra tus archivos aquí o'"
    [dropLabel]="'selecciona tus archivos'"
    [errorMessage]="'Archivo no compatible'"
    [errorMessageFormat]="'Formato no soportado'"
    [errorMessageSize]="'El archivo supera el tamaño máximo permitido.'"
    [fileSize]="2"
    [formatFilesLabel]="'Ver más información de formatos de archivo aceptados.'"
    [linkFilesSupported]="''"
    [linkLabel]="'Ver más información de formatos de archivo aceptados.'"
    [mainIcon]="'image'"
    [multiple]="true"
    [name]="'bmbFileInput'"
    [progress]="progress()"
    (fileRemoved)="removeFileFromForm($event)"
    (newFile)="onFileReceived($event)"
  />
  <button type="submit" bmbButton [disabled]="form.invalid">
    Enviar archivo
  </button>
</form>\`\`\`

<br/>
${getBasicExampleBlock('BmbDropzoneComponent')}
        `,
      },
    },
  },
  argTypes: {
    appearanceContrast: getAppearanceParam(
      'dropzone',
      ['default', 'primary', 'alternative'],
      'default',
    ),
    progress: {
      control: { type: 'number' },
      description: `
Displays the file upload progress.

${RELEVANT_TITLE.note} For the multi option, a record must be used.

  Example:
      progress = signal<Record<string, number>>({});
`,
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'Record | number' },
      },
    },
    acceptedExtensions: {
      control: { type: 'object' },
      description: `Sets the file extensions or MIME types accepted.<br/><br/>
${RELEVANT_TITLE.important} ***/**** is for all extensions or subtypes.<br/><br/>
${RELEVANT_TITLE.example} ***image/**** is for all image types:
- type: images
- *: all subtypes of image`,
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: { summary: 'string[]' },
      },
    },
    formatFilesLabel: {
      control: { type: 'text' },
      description: 'Sets the label that describes the accepted file formats.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(
          'Especificación de formatos y peso',
        ),
        type: { summary: 'string' },
      },
    },
    linkFilesSupported: {
      control: { type: 'text' },
      description:
        'Sets the URL link to the supported file format documentation.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    linkLabel: {
      control: { type: 'text' },
      description: 'Sets the text for the hyperlink to format info.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(
          'Ver más información de formatos de archivo aceptados.',
        ),
        type: { summary: 'string' },
      },
    },
    dropInstruction: {
      control: { type: 'text' },
      description: 'Sets the instructional text before the file upload link.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl('Arrastra tus archivos aquí o'),
        type: { summary: 'string' },
      },
    },
    dropLabel: {
      control: { type: 'text' },
      description: 'Sets the label shown inside of the dropzone area.',
      table: {
        ...DBmbInputParamDesc.label.table,
        defaultValue: getDefaultValueControl('selecciona tus archivos'),
      },
    },
    mainIcon: {
      control: { type: 'text' },
      description: 'Sets the icon to be displayed above the instruction.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl('image'),
        type: { summary: 'string' },
      },
    },
    errorMessage: {
      ...DBmbInputParamDesc.errorMessage,
      table: {
        ...DBmbInputParamDesc.errorMessage.table,
        defaultValue: getDefaultValueControl('Archivo no compatible'),
      },
    },
    errorMessageFormat: DBmbGenericParamDesc.deprecated,
    errorMessageSize: DBmbGenericParamDesc.deprecated,
    name: DBmbInputParamDesc.name,
    fileSize: {
      control: { type: 'number' },
      description: 'Sets the maximum allowed file size in MB.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: getDefaultValueControl(2),
      },
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Allows selecting multiple files when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
    newFile: getOnEventParam(
      getOnEvent('', 'newFile', 'File | File[]'),
      'with the new valid file(s)',
      'other',
    ),
    fileRemoved: getOnEventParam(
      getOnEvent('', 'fileRemoved', 'string'),
      'when a file is removed, the file name is the emitted value. ',
      'other',
    ),
  },
  args: {
    appearanceContrast: 'default',
    name: 'dropzoneInput',
    dropLabel: 'Attach your files',
    progress: 0,
    acceptedExtensions: ['png', 'image/jpeg', 'jpg'],
    formatFilesLabel: 'Formats: png, jpeg, and jpg.',
    linkFilesSupported: 'https://www.youtube.com/',
    linkLabel: 'Images only',
    dropInstruction: 'Drag and drop your files or',
    mainIcon: 'image',
    errorMessage: 'File not compatible',
    fileSize: 2,
    multiple: false,
  },
} as Meta<typeof BmbDropzoneComponent>;

type Story = StoryObj<BmbDropzoneComponent>;

export const Default: Story = {};
