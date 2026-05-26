import {
  Component,
  TemplateRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';
import { BmbStepProgressBarComponent } from './bmb-step-progress-bar.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import * as mainStory from './bmb-step-progress-bar.stories';
import {
  getBasicExampleBlock,
  getGeneralDescription,
} from '../../utils/doc/utils';

const example = `
<ng-template #step0>
  <form [formGroup]="forms[0]" style="padding: 1rem; background: #eef">
    <h3>Paso 1</h3>
    <input formControlName="campo" placeholder="Campo obligatorio" />
    <div
      *ngIf="
        forms[0].get('campo')?.invalid && forms[0].get('campo')?.touched
      "
    >
      Campo requerido
    </div>
    <div style="margin-top: 1rem">
      <button type="button" (click)="goNext()">Siguiente</button>
    </div>
  </form>
</ng-template>

<ng-template #step1>
  <form [formGroup]="forms[1]" style="padding: 1rem; background: #efe">
    <h3>Paso 2</h3>
    <input formControlName="campo" placeholder="Campo obligatorio" />
    <div
      *ngIf="
        forms[1].get('campo')?.invalid && forms[1].get('campo')?.touched
      "
    >
      Campo requerido
    </div>
    <div style="margin-top: 1rem">
      <button type="button" (click)="goBack()">Atrás</button>
      <button type="button" (click)="goNext()">Siguiente</button>
    </div>
  </form>
</ng-template>

<ng-template #step2>
  <form [formGroup]="forms[2]" style="padding: 1rem; background: #fee">
    <h3>Paso 3</h3>
    <input formControlName="campo" placeholder="Campo obligatorio" />
    <div
      *ngIf="
        forms[2].get('campo')?.invalid && forms[2].get('campo')?.touched
      "
    >
      Campo requerido
    </div>
    <div style="margin-top: 1rem">
      <button type="button" (click)="goBack()">Atrás</button>
      <button type="button" (click)="finish()">Finalizar</button>
    </div>
  </form>
</ng-template>

<bmb-step-progress-bar
  [type]="'step-panel'"
  [totalSteps]="3"
  [activeStep]="activeStep"
  [labelSteps]="['Paso 1', 'Paso 2', 'Paso 3']"
  [stepTemplates]="[step0, step1, step2]"
  (next)="goNext()"
  (back)="goBack()"
  (finish)="finish()"
  (onStepPanelPress)="onStepPress($event)"
/>
`;

@Component({
  selector: 'storybook-step-panel-wrapper',
  standalone: true,
  imports: [BmbStepProgressBarComponent, CommonModule, ReactiveFormsModule],
  template: `${example}`,
})
class StorybookStepPanelWrapperComponent implements AfterViewInit {
  @ViewChild('step0') step0!: TemplateRef<any>;
  @ViewChild('step1') step1!: TemplateRef<any>;
  @ViewChild('step2') step2!: TemplateRef<any>;

  activeStep = 0;
  stepTemplates: TemplateRef<any>[] = [];

  labelSteps = ['Paso 1', 'Paso 2', 'Paso 3'];
  forms: FormGroup[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forms = this.labelSteps.map(() =>
      this.fb.group({
        campo: ['', Validators.required],
      }),
    );
  }

  ngAfterViewInit(): void {
    this.stepTemplates = [this.step0, this.step1, this.step2];
  }

  goNext() {
    const currentForm = this.forms[this.activeStep];
    if (currentForm && currentForm.invalid) {
      currentForm.markAllAsTouched();
      return;
    }
    if (this.activeStep < this.forms.length - 1) {
      this.activeStep++;
    }
  }

  goBack() {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  onStepPress(index: number) {
    const currentForm = this.forms[this.activeStep];
    if (index > this.activeStep && currentForm && currentForm.invalid) {
      currentForm.markAllAsTouched();
      return;
    }
    this.activeStep = index;
  }

  finish() {
    const currentForm = this.forms[this.activeStep];
    if (currentForm && currentForm.invalid) {
      currentForm.markAllAsTouched();
      return;
    }
    console.log('¡Formulario finalizado!');
  }
}

export default {
  title: 'Components/Status indicators/Step progress bar/Wizard',
  component: StorybookStepPanelWrapperComponent,
  tags: ['!autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `**${mainStory.default.title} - Wizard** variant allows to display custom content vertically, making it easier to navigate flows with greater complexity than just indicating the progress of a process.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/components/step-progress-bar/descripcion-general-xebEHoek',
    isSubStory: true,
  },
)}
${getBasicExampleBlock(
  'BmbStepProgressBarComponent',
  `import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';`,
  `@ViewChild('step0') step0!: TemplateRef<any>;
  @ViewChild('step1') step1!: TemplateRef<any>;
  @ViewChild('step2') step2!: TemplateRef<any>;

  activeStep = 0;
  stepTemplates: TemplateRef<any>[] = [];

  labelSteps = ['Paso 1', 'Paso 2', 'Paso 3'];
  forms: FormGroup[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forms = this.labelSteps.map(() =>
      this.fb.group({
        campo: ['', Validators.required],
      }),
    );
  }

  ngAfterViewInit(): void {
    this.stepTemplates = [this.step0, this.step1, this.step2];
  }

  goNext() {
    const currentForm = this.forms[this.activeStep];
    if (currentForm && currentForm.invalid) {
      currentForm.markAllAsTouched();
      return;
    }
    if (this.activeStep < this.forms.length - 1) {
      this.activeStep++;
    }
  }

  goBack() {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  onStepPress(index: number) {
    const currentForm = this.forms[this.activeStep];
    if (index > this.activeStep && currentForm && currentForm.invalid) {
      currentForm.markAllAsTouched();
      return;
    }
    this.activeStep = index;
  }

  finish() {
    const currentForm = this.forms[this.activeStep];
    if (currentForm && currentForm.invalid) {
      currentForm.markAllAsTouched();
      return;
    }
    console.log('¡Formulario finalizado!');
  }`,
  true,
)}
\`\`\`html
${example}
\`\`\`
        `,
      },
      transformSource: () => `${example}`.trim(),
    },
  },
  argTypes: {
    ...mainStory.default.argTypes,
    stepTemplates: {
      control: {
        type: 'object',
      },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: false,
        type: { summary: 'TemplateRef<any>' },
      },
    },
  },
} as Meta<typeof BmbStepProgressBarComponent>;

type Story = StoryObj<typeof StorybookStepPanelWrapperComponent>;

export const Default: Story = {
  name: 'Wizard',
};
