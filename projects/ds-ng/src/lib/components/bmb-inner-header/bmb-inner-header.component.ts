import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbSearchInputComponent } from '../bmb-search-input/bmb-search-input.component';
import { BmbTabsComponent } from '../bmb-tabs/bmb-tabs.component';

interface NavItem {
  title: string;
  id: string;
  badge?: number;
  isActive?: boolean;
}

interface IBmbTab {
  title: string;
  id: number;
  badge?: number;
  isActive?: boolean;
}

@Component({
  selector: 'bmb-inner-header',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbSearchInputComponent,
    BmbTabsComponent,
  ],
  styleUrl: './bmb-inner-header.component.scss',
  templateUrl: './bmb-inner-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInnerHeaderComponent {
  @Input() title: string = '';
  @Input() isLoading: boolean = false;
  @Input() data: string[] = [];
  @Output() onHandleBack: EventEmitter<void> = new EventEmitter<void>();
  @Output() onHandleSearch: EventEmitter<void> = new EventEmitter<void>();
  @Output() onValueChange: EventEmitter<string> = new EventEmitter<string>();

  showSearch: boolean = false;

  handleBack() {
    this.onHandleBack.emit();
  }

  handleSearch() {
    this.showSearch = !this.showSearch;
  }

  handleValueChange(event: string): void {
    this.onValueChange.emit(event);
  }
}
