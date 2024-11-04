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
import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BmbDropzoneComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BmbDropzoneComponent,
  ],
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
\`\`\`

### Example in HTML

Below is an example of how to use this component in HTML:

\`\`\`html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <bmb-date-range
    placeholder="Selecciona la fecha de cumpleaños"
    name="datePicker"
    dateFormat="MM/dd/yyyy"
    label="Fecha de tu cumpleaños"
    [disabled]="false"
    icon="cake"
    [isRequired]="true"
    [isClearable]="true"
    invalidFormaterrorMessage="El formato debe ser el siguiente: dd/mm/yyyy"
    requiredFieldErrorMessage="Este campo es requerido"
  />
</form>


\`\`\`
        `,
      },
    },
  },
  argTypes: {
    progress: {
      name: 'Progress',
      control: {
        type: 'number',
      },
      description: 'Progress of the file upload.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    acceptedExtensions: {
      name: 'Accepted Extensions',
      control: {
        type: 'object',
      },
      description: 'Accepted file extensions.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
      },
    },
    formatFilesLabel: {
      name: 'Format Files Label',
      control: {
        type: 'text',
      },
      description: 'Label for the format files input.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: {
          summary: 'Ver más información de formatos de archivo aceptados.',
        },
      },
    },
    linkFilesSupported: {
      name: 'Link Files Supported',
      control: {
        type: 'text',
      },
      description: 'Link to more information about the supported files.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    linkLabel: {
      name: 'Link Label',
      control: {
        type: 'text',
      },
      description: 'Label for the link.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: {
          summary: 'Ver más información de formatos de archivo aceptados.',
        },
      },
    },
    name: {
      name: 'Name',
      control: {
        type: 'text',
      },
      description: 'Name of the input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'bmbFileInput' },
      },
    },
    errorMessage: {
      name: 'Error Message',
      control: {
        type: 'text',
      },
      description: 'Error message to display when the input is invalid.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Archivo no compatible' },
      },
    },
    fileSize: {
      name: 'File Size',
      control: {
        type: 'number',
      },
      description: 'Maximum file size in MB.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    uploadStatus: {
      name: 'Upload Status',
      control: {
        type: 'select',
      },
      description: 'Status of the file upload.',
      options: ['success', 'error', 'loading', 'none'],
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    newFile: {
      name: 'New File',
      control: null,
      description: 'New valid file to upload.',
      table: {
        category: 'Events',
        type: { summary: 'File' },
      },
    },
  },

  args: {
    progress: 0,
    acceptedExtensions: ['png', 'jpeg', 'jpg'],
    formatFilesLabel: 'Ver más información de formatos de archivo aceptados.',
    linkFilesSupported: '',
    linkLabel: 'Ver más información de formatos de archivo aceptados.',
    name: 'bmbFileInput',
    errorMessage: 'Archivo no compatible',
    fileSize: 2,
    uploadStatus: 'none',
  },
} as Meta<typeof BmbDropzoneComponent>;

type Story = StoryObj<BmbDropzoneComponent>;

export const Default: Story = {};
