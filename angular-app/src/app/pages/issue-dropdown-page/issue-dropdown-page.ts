import { CommonModule } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import { FormControl, FormsModule, ValidatorFn } from '@angular/forms';
import {
  BmbButtonDirective,
  BmbDropdownComponent,
  type IBmbDropdownItem,
} from 'ui-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-issue-dropdown-page',
  imports: [
    CommonModule,
    FormsModule,
    BmbDropdownComponent,
    BmbButtonDirective,
  ],
  templateUrl: './issue-dropdown-page.html',
  styleUrl: './issue-dropdown-page.scss',
})
export class IssueDropdownPage implements OnDestroy {
  readonly textProperties = [
    'label',
    'placeholder',
    'helperText',
    'errorMessage',
    'name',
    'inputId',
    'icon',
    'tooltip',
  ] as const;
  readonly booleanProperties = [
    'required',
    'showIcon',
    'isMultiSelect',
    'disabled',
    'isFilterable',
  ] as const;
  draft = {
    label: 'Oportunidades',
    placeholder: 'Selecciona oportunidades',
    helperText: 'Busca y selecciona oportunidades.',
    errorMessage: 'Selecciona una oportunidad válida.',
    name: 'opportunities',
    inputId: 'issue-dropdown',
    icon: 'school',
    tooltip: 'Oportunidades para alumnos',
    required: false,
    showIcon: false,
    isMultiSelect: true,
    disabled: false,
    isFilterable: true,
  };
  config = { ...this.draft };
  align: 'above' | 'below' | 'left' | 'right' = 'above';
  justify: 'before' | 'after' | 'centered' = 'before';
  tooltipPosition = { align: this.align, justify: this.justify };
  optionsText = JSON.stringify(
    Array.from({ length: 40 }, (_, index) => ({
      name: `${['Beca', 'Práctica', 'Intercambio', 'Voluntariado'][index % 4]} ${index + 1}`,
      value: `opportunity-${index + 1}`,
      selectedText: `Oportunidad ${index + 1}`,
      icon: 'school',
    })),
    null,
    2,
  );
  options: string[] | IBmbDropdownItem[] = JSON.parse(this.optionsText);
  preferredText = '["opportunity-3"]';
  preferredOptions: string[] = ['opportunity-3'];
  valueText = '[]';
  value: string | string[] = [];
  controlText = '[]';
  useErrorObject = false;
  errorMessage: string | { required: string; customValidation: string } =
    this.draft.errorMessage;
  useCustomValidation = false;
  customValidation: ValidatorFn | undefined;
  filterMode = 'default';
  customFilterFunction: ReturnType<
    BmbDropdownComponent['customFilterFunction']
  > = null;
  readonly rejectFirst: ValidatorFn = (control) => {
    const values = Array.isArray(control.value)
      ? control.value
      : [control.value];
    return values.includes('opportunity-1') ? { customValidation: true } : null;
  };
  control = new FormControl<string | string[]>([]);
  readonly instances = signal([0]);
  readonly events = signal<string[]>([]);
  readonly error = signal('');
  modalOpen = false;
  private subscription?: Subscription;

  constructor() {
    this.watchControl();
  }

  apply(recreate = true): void {
    try {
      const options: unknown = JSON.parse(this.optionsText);
      if (
        !Array.isArray(options) ||
        !(
          options.every((item) => typeof item === 'string') ||
          options.every(
            (item) =>
              item &&
              typeof item === 'object' &&
              typeof item.name === 'string' &&
              typeof item.value === 'string',
          )
        )
      ) {
        throw new Error(
          'options debe ser un arreglo de strings o de objetos con name y value.',
        );
      }
      const preferred: unknown = JSON.parse(this.preferredText);
      if (
        !Array.isArray(preferred) ||
        !preferred.every((item) => typeof item === 'string')
      )
        throw new Error('preferredOptions debe ser un arreglo de strings.');
      const value = this.parseValue(this.valueText);
      const controlValue = this.parseValue(this.controlText);
      if (
        this.draft.isMultiSelect &&
        (!Array.isArray(value) || !Array.isArray(controlValue))
      )
        throw new Error(
          'En selección múltiple, value y control deben ser arreglos.',
        );
      this.config = { ...this.draft };
      this.options = options as string[] | IBmbDropdownItem[];
      this.preferredOptions = preferred;
      this.value = value;
      this.tooltipPosition = { align: this.align, justify: this.justify };
      this.errorMessage = this.useErrorObject
        ? {
            required: this.config.errorMessage,
            customValidation: 'La oportunidad 1 no está permitida.',
          }
        : this.config.errorMessage;
      this.customValidation = this.useCustomValidation
        ? this.rejectFirst
        : undefined;
      this.customFilterFunction =
        this.filterMode === 'default'
          ? null
          : this.filterMode === 'value'
            ? (item, query) => !!item.value?.toLowerCase().includes(query)
            : (item, query) => item.text.toLowerCase().startsWith(query);
      if (recreate) {
        this.subscription?.unsubscribe();
        this.control = new FormControl<string | string[]>(controlValue);
        this.watchControl();
        this.instances.update(([key]) => [key + 1]);
      }
      this.error.set('');
      this.log('Configuración aplicada');
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : String(error));
    }
  }

  updateProperties(): void {
    try {
      if (this.draft.isMultiSelect !== this.config.isMultiSelect) {
        const initial = this.parseValue(this.valueText);
        const current = this.control.value;
        const values = Array.isArray(current)
          ? current
          : current
            ? [current]
            : [];
        this.control.setValue(
          this.draft.isMultiSelect ? values : values[0] || '',
        );
        this.valueText = JSON.stringify(
          this.draft.isMultiSelect
            ? Array.isArray(initial)
              ? initial
              : initial
                ? [initial]
                : []
            : Array.isArray(initial)
              ? initial[0] || ''
              : initial,
        );
      }
      const currentValue = this.control.value;
      this.controlText = JSON.stringify(
        this.draft.isMultiSelect
          ? Array.isArray(currentValue)
            ? currentValue
            : currentValue
              ? [currentValue]
              : []
          : Array.isArray(currentValue)
            ? currentValue[0] || ''
            : currentValue || '',
      );
      this.apply(false);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : String(error));
    }
  }

  setControl(): void {
    try {
      const value = this.parseValue(this.controlText);
      if (this.config.isMultiSelect && !Array.isArray(value))
        throw new Error('control debe ser un arreglo en selección múltiple.');
      this.control.setValue(value);
      this.error.set('');
    } catch (error) {
      this.error.set(String(error));
    }
  }

  log(event: string, value?: unknown): void {
    this.events.update((events) =>
      [
        `${event}${value === undefined ? '' : ': ' + JSON.stringify(value)}`,
        ...events,
      ].slice(0, 30),
    );
  }

  private parseValue(text: string): string | string[] {
    const value: unknown = JSON.parse(text);
    if (
      typeof value === 'string' ||
      (Array.isArray(value) && value.every((item) => typeof item === 'string'))
    )
      return value;
    throw new Error(
      'value y control deben ser strings o arreglos de strings en JSON.',
    );
  }

  private watchControl(): void {
    this.subscription = this.control.valueChanges.subscribe((value) =>
      this.log('control.valueChanges', value),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
