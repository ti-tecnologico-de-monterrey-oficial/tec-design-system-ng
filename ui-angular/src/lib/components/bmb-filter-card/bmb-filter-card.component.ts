import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  getFilterCardClearAllResetValue,
  getFilterCardControlResetValue,
  getFilterCardOptions,
  getFilterCardSubmission,
  getFilterCardVisibility,
  matchesFilterCardRule,
} from '../../_shared/logic/components/filter-card';
import type { IBmbNativeModal as IBmbNativeModalGeneric } from '../../_shared/types';

type IBmbNativeModal = IBmbNativeModalGeneric<TemplateRef<any>>;
import type { IBmbDropdownItem } from '../../_shared/types/components/dropdown';
import type {
  IBmbControlType,
  IBmbOptionRule,
  IBmbVisibilityRule,
} from '../../_shared/types/components/filter-card';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { TranslatePipe } from '../../pipes/translations';
import { BmbNativeModalService } from '../../services/old/modal/native-modal.service';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { BmbDropdownComponent } from '../bmb-dropdown/bmb-dropdown.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { BmbSwitchComponent } from '../bmb-switch/bmb-switch.component';
import { BmbTagComponent } from '../bmb-tags/bmb-tags.component';

export * from './bmb-filter-card.interface';

@Component({
  selector: 'bmb-filter-card',
  templateUrl: './bmb-filter-card.component.html',
  styleUrl: './bmb-filter-card.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbIconComponent,
    BmbInputComponent,
    BmbSwitchComponent,
    BmbRadialComponent,
    BmbCheckboxComponent,
    BmbDropdownComponent,
    BmbButtonDirective,
    BmbTagComponent,
    TranslatePipe,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbFilterCardComponent implements OnInit {
  modalTitle = input<string>('');
  primaryBtnLabel = input<string>('');
  secondaryBtnLabel = input<string>('');
  icon = input<string>('');
  controlTypes = input<IBmbControlType[]>([]);
  storedValues: { [name: string]: any } = {};
  inLine = input<boolean>(false);
  showGlobalSearch = input<boolean>(true);

  showDropdown = input<boolean>(false); // deprecated
  dropdownOptions = input<string[]>([]); // deprecated
  placeholderSearch = input<string>('');

  visibilityRules = input<IBmbVisibilityRule[]>([]);
  optionRules = input<IBmbOptionRule[]>([]);

  applyFilters = output<any>();
  resetFilters = output<void>();

  filterForm: FormGroup = new FormGroup({
    search: new FormControl<string>(''),
    selectedDropdown: new FormControl<string>(''),
  });

  modalId = signal<string | null>(null);

  private filterValues = signal<Record<string, any>>({});

  private readonly visibleControlIds = computed(() =>
    getFilterCardVisibility(this.visibilityRules(), this.filterValues()),
  );

  private readonly dynamicOptionsMap = computed(() =>
    getFilterCardOptions(this.optionRules(), this.filterValues()),
  );

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  private modalService: BmbNativeModalService = inject(BmbNativeModalService);

  constructor() {
    effect(
      () => {
        const visMap = this.visibleControlIds();
        if (visMap) {
          visMap.forEach((visible, name) => {
            if (!visible) this.clearControl(name);
          });
        }

        this.dynamicOptionsMap().forEach((options, name) => {
          const current = this.filterForm.get(name)?.value;
          if (!current || (Array.isArray(current) && current.length === 0))
            return;
          const validValues = options.map((o) =>
            typeof o === 'string' ? o : o.value,
          );
          const isValid = Array.isArray(current)
            ? current.every((v: string) => validValues.includes(v))
            : validValues.includes(current);
          if (!isValid) this.clearControl(name);
        });
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.controlTypes().forEach((controlType) => {
      controlType.control.forEach((control) => {
        switch (control.type) {
          case 'switch':
          case 'checkbox':
          case 'tag':
            this.filterForm.addControl(
              control.name,
              new FormControl<boolean>(control.checked ?? false),
            );
            this.storedValues[control.name] = {
              ...control,
              checked: control.checked ?? false,
              originalControl: control,
            };
            break;
          case 'radial': {
            const controlName = this.filterForm.get(control.name);
            if (controlName) {
              controlName.setValue(
                control.checked ? control.label : controlName.value,
              );
              const storedValue = this.storedValues[control.name];
              this.storedValues[control.name] = {
                ...storedValue,
                checked: control.checked || storedValue.checked,
                value: control.checked
                  ? (control.value ?? control.label)
                  : storedValue.value,
                originalControl: [...storedValue.originalControl, control],
              };
            } else {
              this.filterForm.addControl(
                control.name,
                new FormControl<string>(control.checked ? control.label : ''),
              );
              this.storedValues[control.name] = {
                ...control,
                checked: control.checked ?? false,
                value: control.checked ? (control.value ?? control.label) : '',
                originalControl: [control],
              };
            }
            break;
          }
          case 'dropdown':
            this.filterForm.addControl(
              control.name,
              new FormControl<string>(control.value || ''),
            );
            this.storedValues[control.name] = {
              ...control,
              value: control.value ?? control.label,
              originalControl: control,
            };
            break;
          default:
            console.error('Control type not supported');
        }
      });
    });

    const initial: Record<string, any> = {};
    this.controlTypes().forEach((ct) =>
      ct.control.forEach((c) => {
        const stored = this.storedValues[c.name];
        initial[c.name] =
          stored?.type === 'radial'
            ? (stored.value ?? this.filterForm.get(c.name)?.value)
            : this.filterForm.get(c.name)?.value;
      }),
    );
    this.filterValues.set(initial);
  }

  openModalComponent() {
    const data: IBmbNativeModal = {
      title: this.modalTitle(),
      size: 'small',
      content: this.modalTemplate,
      actions: [
        {
          label: this.primaryBtnLabel(),
          action: () => this.handleSubmit(),
          appearance: 'primary',
          buttonName: this.primaryBtnLabel(),
        },
        {
          label: this.secondaryBtnLabel(),
          action: () => this.clearAllFilters(),
          appearance: 'secondary-outlined',
          buttonName: this.secondaryBtnLabel(),
        },
      ],
      scrollable: true,
    };

    this.modalId.set(this.modalService.openModal(data));
  }

  controlChange(control: any, event: any) {
    const formControl = this.filterForm.get(control.name);
    if (formControl) {
      switch (control.type) {
        case 'switch': {
          formControl.setValue(event);
          this.updateFilterValues(control.name, formControl.value);
          const switchValue = {
            ...this.storedValues[control.name],
            checked: event,
          };
          this.storedValues[control.name] = switchValue;
          break;
        }
        case 'checkbox': {
          formControl.setValue(event.target.checked);
          this.updateFilterValues(control.name, formControl.value);
          const checkboxValue = {
            ...this.storedValues[control.name],
            checked: event.target.checked,
          };
          this.storedValues[control.name] = checkboxValue;
          break;
        }
        case 'radial': {
          formControl.setValue(control.label);
          this.updateFilterValues(control.name, control.value ?? control.label);
          const radialValue = {
            ...this.storedValues[control.name],
            checked: event.checked,
            value: control.value ?? control.label,
            label: control.label,
          };
          this.storedValues[control.name] = radialValue;
          break;
        }
        case 'dropdown': {
          formControl.setValue(event);
          this.updateFilterValues(control.name, formControl.value);
          this.storedValues[control.name] = {
            ...this.storedValues[control.name],
            value: formControl.value,
          };
          break;
        }
        default: {
          //for the tag option or any other option that does not have an activated control
          const updatedValue = !this.storedValues[control.name]?.checked;
          formControl.setValue(updatedValue);
          this.updateFilterValues(control.name, formControl.value);
          const elementValue = {
            ...this.storedValues[control.name],
            checked: updatedValue,
          };
          this.storedValues[control.name] = elementValue;
          break;
        }
      }
    }
  }

  handleSubmit() {
    const values = Object.fromEntries(
      Object.keys(this.filterForm.controls).map((key) => [
        key,
        this.filterForm.get(key)?.value,
      ]),
    );
    const formData = getFilterCardSubmission(this.storedValues, values);
    if (this.modalId()) this.modalService.closeModal(this.modalId() as string);
    this.applyFilters.emit(formData);
  }

  clearAllFilters() {
    this.filterForm.reset();
    this.filterValues.set({});
    Object.keys(this.storedValues).forEach((name) => {
      const stored = this.storedValues[name];
      if (!stored) return;
      const resetValue = getFilterCardClearAllResetValue(
        stored.type,
        stored.isMultiSelect,
      );
      this.storedValues[name] = {
        ...stored,
        checked: false,
        value: resetValue,
      };
    });
    this.resetFilters.emit();
  }

  isTagSelected(name: string): boolean {
    return this.filterValues()[name] === true;
  }

  private ruleMatches(
    when: Record<string, any>,
    values: Record<string, any>,
  ): boolean {
    return matchesFilterCardRule(when, values);
  }

  private clearControl(name: string): void {
    const stored = this.storedValues[name];
    let resetValue: any = '';
    if (stored) {
      resetValue = getFilterCardControlResetValue(
        stored.type,
        stored.isMultiSelect,
      );
      this.storedValues[name] = {
        ...stored,
        checked: false,
        value: resetValue,
      };
    }
    this.filterForm.get(name)?.reset(resetValue);
    this.updateFilterValues(name, resetValue);
  }

  private updateFilterValues(name: string, value: any): void {
    const current = this.filterValues()[name];
    if (current === value) return;
    if (
      Array.isArray(current) &&
      Array.isArray(value) &&
      current.length === value.length &&
      current.every((v, i) => v === value[i])
    )
      return;
    this.filterValues.update((vals) => ({ ...vals, [name]: value }));
  }

  isControlVisible(name: string): boolean {
    const map = this.visibleControlIds();
    if (!map) return true;
    const visible = map.get(name);
    return visible ?? true;
  }

  isSectionVisible(controlType: IBmbControlType): boolean {
    const map = this.visibleControlIds();
    if (!map) return true;
    return controlType.control.some((c) => this.isControlVisible(c.name));
  }

  getControlOptions(
    control: IBmbControlType['control'][number],
  ): string[] | IBmbDropdownItem[] {
    return this.dynamicOptionsMap().get(control.name) ?? control.options ?? [];
  }

  getFormControl(name: string): FormControl {
    return this.filterForm.get(name) as FormControl;
  }

  onValueChange(event: string | string[], name: string) {
    this.filterForm.get(name)?.setValue(event);
    this.updateFilterValues(name, event);
    if (this.storedValues[name]) {
      this.storedValues[name] = { ...this.storedValues[name], value: event };
    }
  }
}
