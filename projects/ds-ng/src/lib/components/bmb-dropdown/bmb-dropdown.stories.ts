import type { Meta, StoryFn } from '@storybook/angular';
import { BmbDropdownComponent } from './bmb-dropdown.component';
import { attributes } from '../../utils/utils';

export default {
  title: 'Micro Componentes/Dropdown',
  component: BmbDropdownComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
  Below is an example of how you can use this component in TypeScript:
  
  \`\`\`typescript
  import { Component, Injectable, OnInit } from '@angular/core';
  import {
    FormControl,
    FormGroup,
    Validators,
    ReactiveFormsModule,
  } from '@angular/forms';
  import {
    BmbDropdownComponent,
    BmbButtonDirective,
  } from '../../projects/ds-ng/src/public-api';
  import { CommonModule } from '@angular/common';
  import { delay, Observable, of } from 'rxjs';
  
  export interface IBmbDropdownItem {
    name: string;
    value: string;
    icon: string;
    id?: string;
  }
  
  @Injectable({ providedIn: 'root' })
  export class FruitService {
    getSelectedFruit(): Observable<IBmbDropdownItem> {
      return of({
        name: 'Banana',
        value: 'Banana',
        icon: 'bolt',
        id: 'banana',
      }).pipe(delay(1000));
    }
  }
  
  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      BmbDropdownComponent,
      ReactiveFormsModule,
      BmbButtonDirective,
      CommonModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
  })
  export class AppComponent implements OnInit {
    form = new FormGroup({
      category: new FormControl<IBmbDropdownItem | null>(
        null,
        Validators.required,
      ),
    });
  
    dropdownOptions: IBmbDropdownItem[] = [
      { name: 'Apple', value: 'Apple', icon: 'bolt', id: 'apple' },
      { name: 'Banana', value: 'Banana', icon: 'bolt', id: 'banana' },
      { name: 'Orange', value: 'Orange', icon: 'bolt', id: 'orange' },
      { name: 'Pear', value: 'Pear', icon: 'bolt', id: 'pear' },
      { name: 'Grape', value: 'Grape', icon: 'bolt', id: 'grape' },
    ];
  
    constructor(private fruitService: FruitService) {}
  
    ngOnInit(): void {
      this.fruitService.getSelectedFruit().subscribe((selectedFruit) => {
        console.log('Setting value from service:', selectedFruit);
        this.form.get('category')?.setValue(selectedFruit);
      });
    }
  
    selectApple(): void {
      const selectedItem = this.dropdownOptions.find(
        (item) => item.value === 'Apple',
      );
      this.form.get('category')?.setValue(selectedItem || null);
    }
  
    getItem(item: string | IBmbDropdownItem): IBmbDropdownItem {
      if (typeof item === 'string') {
        return {
          name: item,
          value: item,
          icon: 'bolt',
          id: item.toLowerCase(),
        };
      }
      return item;
    }
  
    onSubmit(): void {
      if (this.form.valid) {
        console.log('Form submitted with:', this.form.value);
      } else {
        this.form.markAllAsTouched();
      }
    }
  
    onValueChange(value: string | IBmbDropdownItem): void {
      console.log('Value changed:', value);
    }
  }
  \`\`\`
  Below is an example of how you can use this component in HTML:
  \`\`\`html
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
  <bmb-dropdown
    formControlName="category"
    [isMultiSelect]="false"
    [options]="dropdownOptions"
    helperText="Select a fruit"
    [required]="true"
    label="Fruit"
    [showIcon]="true"
    icon="bolt"
    placeholder="Set Fruit"
    (onValueChange)="onValueChange($event)"
  ></bmb-dropdown>

  <!-- Error message if the field is required -->
  <div
    *ngIf="form.get('category')?.invalid && form.get('category')?.touched"
    class="error-message"
  >
    This field is required.
  </div>

  <button type="submit" bmbButton>Submit</button>
  <button type="button" bmbButton (click)="selectApple()">Select Apple</button>
</form>
  \`\`\`
  This example demonstrates how to use the **BmbDropdownComponent** within an Angular Reactive Form, ensuring validation and handling the selected value properly.
        `,
      },
    },
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'The name of the icon. See Material Icons.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    required: {
      name: 'Required',
      control: { type: 'boolean' },
      description:
        'When set to true, The Dropdown border color turns to red. By default, it is false, and you do not need to explicitly set it.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    showIcon: {
      name: 'Show Icon',
      control: { type: 'boolean' },
      description: 'When set to true, the dropdown icon is show',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      name: 'Placeholder',
      control: { type: 'text' },
      description: 'The text of the placeholder for the dropdown.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    options: {
      name: 'Options',
      control: { type: 'array' },
      description:
        'The inputs to show on the dropdown. The data types it allows are a string array or an array of objects',
      table: {
        category: 'Properties',
        type: {
          summary: `array: string[] | IBmbDropdownItem[]. IBmbDropdownItem = {
            value: string;
            name: string;
            icon: string;
            id?: string;
          }`,
        },
      },
    },
    helperText: {
      name: 'Helper Text',
      control: { type: 'text' },
      description: 'The text of the bottom for the dropdown.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      description:
        'When set to true, The dropdown disabled. By default, it is false, and you do not need to explicitly set it.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      name: 'Label',
      control: { type: 'text' },
      description: 'The text show an text as a label',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    control: {
      control: null,
      name: 'Control',
      description: 'Instance of FormControl to manage the input control state.',
      table: {
        category: 'Properties',
        type: { summary: 'FormControl' },
        defaultValue: { summary: "FormControl('', Validators.required)" },
      },
    },
    onValueChange: {
      name: 'On value change',
      control: { type: '' },
      description:
        'Emitted when an option is selected. Contains the value or item of the selected option.',
      table: { category: 'Events', type: { summary: 'function' } },
    },
    preferredOptions: {
      name: 'Preferred options',
      control: { type: 'array' },
      description:
        'List of options to be displayed at the top, the text must match the value property of an option or must be equal to an option in case the options are text.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    isMultiSelect: {
      name: 'Is Multi Select',
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    isMultiSelect: false,
    icon: 'bolt',
    placeholder: 'Set Fruit',
    required: false,
    label: 'Fruit',
    showIcon: true,
    options: [
      { name: 'Apple', value: 'Apple', icon: 'home', id: 'apple' },
      { name: 'Banana', value: 'Banana', icon: 'bolt', id: 'banana' },
      { name: 'Orange', value: 'Orange', icon: 'bolt', id: 'orange' },
      { name: 'Pear', value: 'Pear', icon: 'bolt', id: 'pear' },
      { name: 'Grape', value: 'Grape', icon: 'bolt', id: 'grape' },
    ],
    disabled: false,
    helperText: 'Select a fruit',
    preferredOptions: ['Orange'],
  },
} as Meta<typeof BmbDropdownComponent>;

const customizable = (): StoryFn => (args) => ({
  props: {
    ...args,
    onValueChange: (value: any) => {
      args['value'] = value;
      setTimeout(() => {
        args['control']?.setValue(value, { emitEvent: true });
      });
    },
  },
  template: `
    <div style="height: 240px">
      <bmb-dropdown
        ${attributes(args)}
        (onValueChange)="onValueChange($event)"
      />
    </div>
  `,
});

export const Default = customizable();
