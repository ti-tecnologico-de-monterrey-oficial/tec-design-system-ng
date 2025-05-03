import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbDropzoneComponent } from './bmb-dropzone.component';

export default {
  title: 'Micro Componentes/Dropzone',
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
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

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
} from '../../projects/ds-ng/src/public-api';

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

  form: FormGroup;
  progress = signal<Record<string, number>>({});

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      file: [null],
    });
  }

  onFileReceived(files: File | File[]) {
    const incomingFiles = Array.isArray(files) ? files : [files];
    const current = this.getCurrentFiles();

    const currentKeys = new Set(current.map((f) => \`\${f.name}-\${f.size}\`));
    const newFiles = incomingFiles.filter(
      (f) => !currentKeys.has(\`\${f.name}-\${f.size}\`),
    );

    const updated = [...current, ...newFiles];
    this.form.patchValue({
      file: this.formAllowsMultiple(updated) ? updated : updated[0],
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
        console.log('Archivo simulado al 100%');
      }
    }, 300);
  }

  removeFileFromForm(fileName: string) {
    const files = this.getCurrentFiles();
    const updated = files.filter((f) => f.name !== fileName);

    this.form.patchValue({
      file: updated.length > 1 ? updated : (updated[0] ?? null),
    });

    const { [fileName]: _, ...remaining } = this.progress();
    this.progress.set(remaining);
  }

  onSubmit() {
    const files = this.getCurrentFiles();
    const allUploaded = files.every((f) => this.progress()[f.name] === 100);

    if (!allUploaded) {
      console.warn('Algunos archivos no se han subido completamente.');
      return;
    }

    console.log('Archivos listos para enviar:', files);

    // Resetear
    this.form.reset();
    this.progress.set({});
    this.dropzone?.reset();
  }

  private getCurrentFiles(): File[] {
    const control = this.form.value.file;
    if (!control) return [];
    return Array.isArray(control) ? control : [control];
  }

  private formAllowsMultiple(files: File[]): boolean {
    return files.length > 1;
  }
}

\`\`\`
## Architecture

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
  ></bmb-dropzone>

  <button type="submit" bmbButton [disabled]="form.invalid">
    Enviar archivo
  </button>
</form>
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    progress: {
      name: 'Progress',
      control: { type: 'number' },
      description: 'Upload progress of the file.',
      table: { category: 'Properties', type: { summary: 'number' } },
    },
    acceptedExtensions: {
      name: 'Accepted Extensions',
      control: { type: 'object' },
      description: 'Array of accepted file extensions.',
      table: { category: 'Properties', type: { summary: 'string[]' } },
    },
    formatFilesLabel: {
      name: 'Format Files Label',
      control: { type: 'text' },
      description: 'Label that describes the accepted file formats.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    linkFilesSupported: {
      name: 'Link Files Supported',
      control: { type: 'text' },
      description: 'URL link to the supported file format documentation.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    linkLabel: {
      name: 'Link Label',
      control: { type: 'text' },
      description: 'Text for the hyperlink to format info.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    dropInstruction: {
      name: 'Drop Instruction',
      control: { type: 'text' },
      description: 'Instructional text before the file upload link.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    dropLabel: {
      name: 'Drop Label',
      control: { type: 'text' },
      description: 'Label for the file selection link.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    mainIcon: {
      name: 'Main Icon',
      control: { type: 'text' },
      description: 'Icon to be displayed above the instruction.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    errorMessage: {
      name: 'General Error Message',
      control: { type: 'text' },
      description: 'Displayed when the file is not valid.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    errorMessageFormat: {
      name: 'Format Error Message',
      control: { type: 'text' },
      description: 'Message shown when file format is invalid.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    errorMessageSize: {
      name: 'Size Error Message',
      control: { type: 'text' },
      description: 'Message shown when file exceeds size limit.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    name: {
      name: 'Name',
      control: { type: 'text' },
      description: 'Name for the file input.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    fileSize: {
      name: 'File Size Limit (MB)',
      control: { type: 'number' },
      description: 'Maximum allowed file size in MB.',
      table: { category: 'Properties', type: { summary: 'number' } },
    },
    multiple: {
      name: 'Multiple Files',
      control: { type: 'boolean' },
      description: 'Allow selecting multiple files.',
      table: { category: 'Properties', type: { summary: 'boolean' } },
    },
    newFile: {
      name: 'New File',
      control: null,
      description: 'Emits the new valid file(s).',
      table: { category: 'Events', type: { summary: 'File | File[]' } },
    },
    fileRemoved: {
      name: 'File Removed',
      control: null,
      description: 'Emits the name of the file when it is removed.',
      table: { category: 'Events', type: { summary: 'string' } },
    },
  },
  args: {
    progress: 0,
    acceptedExtensions: ['png', 'jpeg', 'jpg'],
    formatFilesLabel: 'Ver más información de formatos de archivo aceptados.',
    linkFilesSupported: '',
    linkLabel: 'Ver más información de formatos de archivo aceptados.',
    dropInstruction: 'Arrastra tus archivos aquí o',
    dropLabel: 'selecciona tus archivos',
    mainIcon: 'image',
    name: 'bmbFileInput',
    errorMessage: 'Archivo no compatible',
    errorMessageFormat: 'Formato no soportado',
    errorMessageSize: 'El archivo supera el tamaño máximo permitido.',
    fileSize: 2,
    multiple: false,
  },
} as Meta<typeof BmbDropzoneComponent>;

type Story = StoryObj<BmbDropzoneComponent>;

export const Default: Story = {};
