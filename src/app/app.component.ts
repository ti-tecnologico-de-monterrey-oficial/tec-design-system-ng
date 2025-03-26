import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  BmbInputTagsComponent,
  BmbLayoutItemDirective,
} from '../../projects/ds-ng/src/public-api';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BmbInputTagsComponent, BmbLayoutItemDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadForm();
    this.setValueToForm();
  }

  loadForm() {
    this.projectForm = this.fb.group({
      nombre: new FormControl({ value: '', disabled: false }),
      descripcion: new FormControl({ value: '', disabled: false }),
      tipoEmprendimiento: new FormControl({ value: '', disabled: false }),
      perfilEmprendedor: new FormControl({ value: '', disabled: false }),
      odsImpactada: new FormControl({ value: '', disabled: false }),
      liderProyecto: new FormControl({ value: '', disabled: false }),
      socios: new FormControl({ value: '', disabled: false }),
    });
  }

  setValueToForm() {
    this.projectForm.patchValue({
      nombre: 'TEST1',
      descripcion: 'Esto es una prueba',
      tipoEmprendimiento: ['Enchiladas'],
      perfilEmprendedor: ['Quesadillas', 'Enchiladas'],
      odsImpactada: 'Chalupas',
      liderProyecto: 'Osvaldo Mendoza',
      socios: '',
    });
  }

  getFormControl(name: string): FormControl {
    return this.projectForm.get(name) as FormControl;
  }

  tagControl = new FormControl(['Tacos al pastor']);

  handleClick() {
    this.tagControl.setValue(['Tacos al pastor', 'Enchiladas', 'Tamales']);
  }
}
