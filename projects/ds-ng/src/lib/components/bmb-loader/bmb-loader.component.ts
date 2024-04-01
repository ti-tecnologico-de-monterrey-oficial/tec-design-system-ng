import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-loader',
  styleUrl: './bmb-loader.component.scss',
  templateUrl: './bmb-loader.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbLoaderComponent {
  @Input() status: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
