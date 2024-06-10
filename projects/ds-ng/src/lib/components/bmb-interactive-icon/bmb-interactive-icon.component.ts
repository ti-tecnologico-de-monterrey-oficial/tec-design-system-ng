import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-interactive-icon',
  styleUrl: './bmb-interactive-icon.component.scss',
  templateUrl: './bmb-interactive-icon.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInteractiveIconComponent {
  @Input() appearance: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: string = 'face';
  @Input() horizontal: boolean = false;
  @Input() target: string = '';
  @Input() link: string = '';

  getClasses(): string[] {
    const classes: string[] = ['bmb_interactive_icon'];

    if (this.appearance) {
      classes.push('bmb_interactive_icon-' + this.appearance);
    }

    return classes;
  }

  isExternalLink(link: string): boolean {
    return (
      link.startsWith('http://') ||
      link.startsWith('https://') ||
      link.startsWith('#')
    );
  }
}
