import {
  Component,
  HostListener,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { FabSize, FabType } from './bmb-fab-.interface';

@Component({
  selector: 'bmb-fab',
  styleUrl: './bmb-fab.component.scss',
  templateUrl: './bmb-fab.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  encapsulation: ViewEncapsulation.None,
})
export class BmbFabComponent {
  icon = input<string>('');
  text = input<string | null>('');
  size = input<FabSize>();
  type = input<FabType>();
  mitec = input<boolean>(false);

  fabClick = output<void>();

  active: boolean = false;

  @HostListener('click') onFabClick() {
    if (this.type() == 'normal') {
      this.active = !this.active;
    }
    this.fabClick.emit();
  }

  getClassName(): string {
    const baseClassName = `${(this.mitec() && 'bmb_fab-mitec') || 'bmb_fab'}`;
    const typeClassName = `${(this.mitec() && 'normal') || this.type()}`;
    return `${baseClassName}-${this.size()}-${typeClassName}`;
  }
}
