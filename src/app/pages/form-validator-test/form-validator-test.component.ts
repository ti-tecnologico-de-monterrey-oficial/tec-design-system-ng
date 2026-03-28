import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  BmbFormValidatorComponent,
  BmbButtonDirective,
  BmbDropdownComponent,
  BmbInputComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  IBmbDropdownItem,
  BmbTextEditorComponent,
  BmbSearchInputComponent,
  BmbSearchCardComponent,
  IBmbSearchCardItemResult,
  BmbInputTagsComponent,
} from '../../../../projects/ds-ng/src/public-api';
import persons from './persons.json';
import services from './services.json';

@Component({
  selector: 'bmb-form-validator-test',
  imports: [
    CommonModule,
    BmbFormValidatorComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbButtonDirective,
    BmbDropdownComponent,
    BmbInputComponent,
    BmbTextEditorComponent,
    BmbSearchInputComponent,
    BmbSearchCardComponent,
    BmbInputTagsComponent,
  ],
  templateUrl: './form-validator-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FormValidatorTestComponent {
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe((searchTerm) => {
        const searchLower = searchTerm.toLowerCase();

        const filteredPersons = persons
          .filter((person) => person.name?.toLowerCase().includes(searchLower))
          .map((person) => ({
            ...person,
            id: person.id.toString(),
            type: person.type as 'person' | 'service',
          }));

        const filteredServices = services
          .filter((service) =>
            service.name?.toLowerCase().includes(searchLower),
          )
          .map((service) => ({
            ...service,
            id: service.id.toString(),
            type: service.type as 'person' | 'service',
          }));

        this.resultList.set([...filteredPersons, ...filteredServices]);
        this.isSearchLoading.set(false);
      });
  }

  formGroup: FormGroup = new FormGroup({
    htmlText: new FormControl(
      `<div contenteditable="true" class="bmb_text-editor-content"><h1>Test</h1><p>This is a test</p><p><br></p><p><a href="https://www.google.com" target="_blank" rel="noopener noreferrer">asd</a></p></div>`,
    ),
  });

  options: IBmbDropdownItem[] = [];
  filterOptions = [
    'Carlee Bengochea',
    'Reynard Howgate',
    'Pearce Jore',
    'Giacopo Mellings',
    'Clyve Nerval',
    'Pauletta Pavelka',
    'Midge Girardot',
  ];

  handleDropdownChange(event: unknown): void {
    if (event === '_banana') {
      this.formGroup.controls['text_field1'].enable();
      this.options = [
        { name: 'Apple name', value: '_apple', icon: 'home', id: 'apple_' },
        { name: 'Banana name', value: '_banana', icon: 'bolt', id: 'banana_' },
        { name: 'Orange name', value: '_orange', icon: 'bolt', id: 'orange_' },
        { name: 'Pear name', value: '_pear', icon: 'info', id: 'pear_' },
        { name: 'Grape name', value: '_grape', icon: 'bolt', id: 'grape_' },
      ];
      this.formGroup.controls['dropdown2'].enable();
    }
  }

  handleSubmit(form: FormGroup): void {
    console.info('handleSubmit form state:', form);
  }

  getFormControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  handleReset(): void {
    this.formGroup.reset();
  }

  onClearField(event: boolean): void {
    console.info('Clear field event received:', event);
  }

  isSearchLoading = signal<boolean>(false);
  resultList = signal<IBmbSearchCardItemResult[]>([]);

  handleSearchChange(searchTerm: string): void {
    if (searchTerm) {
      this.isSearchLoading.set(true);
      console.log('Search term:', searchTerm);
      this.searchSubject.next(searchTerm);
    }
  }

  handleServiceClick(service: IBmbSearchCardItemResult): void {
    console.log('Service clicked:', service);
  }

  handleBookmarkClick(item: IBmbSearchCardItemResult): void {
    console.log('Bookmark clicked:', item);
  }
}
