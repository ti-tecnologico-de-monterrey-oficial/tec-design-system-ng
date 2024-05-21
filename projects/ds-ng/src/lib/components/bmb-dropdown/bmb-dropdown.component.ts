import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, HostListener, forwardRef, ChangeDetectionStrategy, ViewEncapsulation, OnChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, SelectControlValueAccessor } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatLabel } from '@angular/material/form-field';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule, MatChipListbox } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, map, startWith } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';


const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BmbDropdownComponent),
  multi: true
};

export const dropdownConfig = {
  selectedValue: -1,
  valueField: 'uId',
  labelField: 'optionDescription',
  heading: 'Title'
};

export interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'bmb-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    MatLabel,
    MatOption,
    FormsModule,
    BmbIconComponent,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatChipsModule,
    MatChipListbox,
    ReactiveFormsModule,
    MatInputModule,
    MatSelect,
  ],
  templateUrl: './bmb-dropdown.component.html',
  styleUrl: './bmb-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers:[     {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BmbDropdownComponent),
    multi: true,
  }, ]
})
export class BmbDropdownComponent implements OnInit, ControlValueAccessor {

 
  myControl = new FormControl();
  options?: Observable<string[]>;
  @Input() iconName: string = ''
  @Input() allOptions: any[] = [];
  @Input() placeholder?: string = ""; 
  @Input() isDisabled?: boolean = false
  @Input() label?: string;
  @Output() selectedItem:  EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.options = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const filterValue = value.toLowerCase();

        return this.allOptions.filter(option => option.toLowerCase().includes(filterValue));
      })
    );
  }

  selectedValue = ''

  selectedOptions: string[] = [];

  selected(value:string){
    this.selectedItem.emit(value)
  }

  addOption(option: string) {
    this.selectedOptions.push(option);
    this.myControl.setValue(this.selectedOptions);
  }

  removeOption(option: string) {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option);

    this.myControl.setValue(this.selectedOptions);
  }


  // @Input() public label?: string;
  // @Input() public options?: {value: number, description: string}[];
  @Input() public text?: string;

  selectedIndex?: number;

  valueChanged(value: any) {
    this.selectedItem.emit(value)
    this.onChange(value);
    this.onTouched();
  }

  // CVA implementation

  public onChange = (_: any) => {};
  public onTouched = () => {};

  // register onChange which we will call when the selected value is changed
  // so that the value is passed back to the form model
  public registerOnChange(fn:any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn:any): void {
    this.onTouched = fn;
  }

  // sets the selected value based on the corresponding form model value
  public writeValue(value: any): void {
    this.selectedIndex = value;
  }


  // @Input() config: any = {};
  // @Input() options: any[] = [];
  // @Output() selectionChanged = new EventEmitter<any>();
  // dropDownList: any[] = [];
  // selectedValue: any = null;
  // valueField?: string;
  // labelField?: string;
  // placeholder?: string;

  // ngOnInit(): void { }

  // ngOnChanges(changes: any) {
  //   console.log("dropdow", this.dropDownList)
  //   if (changes.config) {
  //     this.dropDownList = this.options || [];
  //     this.selectedValue = this.config.selectedValue ?? -1;
  //     this.valueField = this.config.valueField || 'value';
  //     this.labelField = this.config.labelField || 'label';
  //     this.placeholder = this.config.placeholder || 'placeholder';
  //   }
  // }

  // onSelectionChange() {
  //   this.selectionChanged.emit(this.selectedValue);
  // }

  // calculateDropdownWidth() {
  //   let heading = "Please select the "
  //   let maxLength = heading.length;
  //   this.dropDownList.forEach(rule => {
  //     if (rule[this.labelField!].length > maxLength) {
  //       maxLength = rule[this.labelField!].length;
  //     }
  //   });
    
  //   const viewportWidth = window.innerWidth;
  //   const approximateCharWidth = 8; // Assume each char takes approximately 8 pixels
  //   const maxWidth = maxLength * approximateCharWidth;
    
  //   const widthInVW = (maxWidth / viewportWidth) * 100;  // Convert max width in pixels to vw
  //   // console.log(widthInVW,"widthInVW")
  //   return widthInVW;
  // }
}
