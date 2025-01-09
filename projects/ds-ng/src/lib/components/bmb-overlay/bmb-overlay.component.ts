import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'bmb-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-overlay.component.html',
  styleUrl: './bmb-overlay.component.scss',
})
export class BmbOverlayComponent implements OnChanges, AfterViewInit {
  displayStyle?: string;

  @Input() active: boolean = false;

  ngAfterViewInit() {
    if (this.active) {
      this.displayStyle = 'block';
    } else {
      this.displayStyle = 'none';
    }
  }

  ngOnChanges() {
    if (this.active) {
      this.displayStyle = 'block';
    } else {
      this.displayStyle = 'none';
    }
  }
}
