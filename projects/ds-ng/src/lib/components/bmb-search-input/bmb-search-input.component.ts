import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  SimpleChanges,
  HostListener,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'bmb-search-input',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbButtonDirective,
    BmbLoaderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './bmb-search-input.component.html',
  styleUrl: './bmb-search-input.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSearchInputComponent implements OnChanges {
  @Input() data: string[] = [];
  @Input() isLoading: boolean = false;
  @Input() isServerSideFilter: boolean = false;
  @Input() placeholder: string = '';
  @Input() serverSideFilteredData: string[] = [];

  @Output() onValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onServerSideFilterEvent: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('filterInput') filterField: ElementRef | null = null;

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {
    this.filterControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filteredValue(value);
      });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.childNodes?.contains(event.target)) {
      this.isDialogOpen = false;
    }
  }

  value: string = '';
  filteredData: string[] = [];
  uid: string = Date.now().toString(36) + (Math.floor(Math.random() * 90) + 10);
  isDialogOpen: boolean = false;
  filterControl = new FormControl();

  private childNodes: any = null;

  ngAfterViewInit() {
    this.childNodes = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['serverSideFilteredData'] && this.isServerSideFilter) {
      this.filteredData = changes['serverSideFilteredData'].currentValue;
    } else {
      this.filteredData = this.data;
    }
    if (
      changes['serverSideFilteredData'] &&
      changes['isLoading'].currentValue
    ) {
      this.isDialogOpen =
        changes['serverSideFilteredData']?.currentValue?.length ||
        changes['isLoading']?.currentValue;
    }
  }

  filteredValue(value: string): void {
    if (value.length >= 1) {
      if (this.isServerSideFilter) {
        this.onServerSideFilterEvent.emit(value);
      } else {
        this.filteredData = this.data.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase()),
        );
        this.isDialogOpen = true;
      }
    } else {
      this.filteredData = [];
    }
    this.cdr.detectChanges();
  }

  clearFilter(): void {
    if (this.filterField?.nativeElement) {
      this.filterField.nativeElement.value = '';
    }
    this.isDialogOpen = false;
  }

  getDialogOpen(): string {
    if (this.isDialogOpen) {
      return 'bmb_search-input-dialog-open';
    }

    return '';
  }

  handleItemClick(event: string): void {
    this.onValueChange.emit(event);
    this.isDialogOpen = false;
    if (this.filterField?.nativeElement) {
      this.filterField.nativeElement.value = event;
    }
  }

  openDialog() {
    this.isDialogOpen = !this.isDialogOpen;
  }
}
