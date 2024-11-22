import { BmbTagComponent } from './../bmb-tags/bmb-tags.component';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  input,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  signal,
  ɵINPUT_SIGNAL_BRAND_WRITE_TYPE,
  output,
  forwardRef,
} from '@angular/core';
import {
  FormsModule,
  FormControl,
  ReactiveFormsModule,
  Validators,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';

@Component({
  selector: 'bmb-input-tags',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BmbIconComponent,
    BmbTooltipComponent,
  ],
  templateUrl: './bmb-input-tags.component.html',
  styleUrl: './bmb-input-tags.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BmbInputTagsComponent),
      multi: true,
    },
  ],
})
export class BmbInputTagsComponent {
  @Input() control!: FormControl;
  @Input() tagOptions: string[] = [];
  @Input() errorMessage: string = '';
  @Input() showError: boolean | undefined = false;

  tooltip = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  isRequired = input<boolean>();
  helperMessage = input<string>('');
  disabled = input<boolean>(false);
  maxSelectedItems = input<number>();

  tagsSelected: Array<string> = [];
  filteredOptions: string[] = [];
  showDropdown: boolean = false;
  errorMaxLength: string = '¡Límite alcanzado! No puedes añadir más elementos';
  value: string[] = [];

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  constructor(
    readonly elementRef: ElementRef,
    readonly cdr: ChangeDetectorRef,
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.hideDropdownDialog();
    }
  }

  ngOnInit() {
    this.filteredOptions = this.tagOptions;

    if (!this.control) {
      this.control = new FormControl();
    }

    if (this.isRequired()) {
      this.control.addValidators(Validators.required);
    }

    if (this.maxSelectedItems()) {
      this.control.addValidators(Validators.max(this.maxSelectedItems()!));
    }
    this.control.updateValueAndValidity();
    this.control.valueChanges.subscribe((res) => {
      this.tagsSelected = this.checkTags(res);
      this.updateErrorState();
      this.cdr.markForCheck();
    });
  }

  addTag(option: string) {
    if (this.tagsSelected.length === this.maxSelectedItems()) {
      this.showError = true;
      return;
    }
    if (!this.tagsSelected.includes(option)) {
      this.tagsSelected.push(option);
      this.control.setValue(this.tagsSelected);
      this.showDropdown = false;
    }
  }

  removeTag(tag: string) {
    this.tagsSelected = this.tagsSelected.filter((t) => t !== tag);
    this.control.setValue(this.tagsSelected);
    this.updateErrorState();
  }

  showDropdownDialog(): void {
    this.showDropdown = true;
  }

  hideDropdownDialog(): void {
    this.showDropdown = false;
  }

  private updateErrorState(): void {
    this.showError = this.isRequired() && this.tagsSelected.length == 0;
  }

  private checkTags(newValues: Array<string>): Array<string>{
    return newValues.reduce((acc : any, item: any) => {
      if (this.tagOptions.includes(item) && !acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
  }
}
