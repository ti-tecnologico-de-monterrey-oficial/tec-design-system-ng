import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'bmb-media-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-media-card.component.html',
  styleUrl: './bmb-media-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbMediaCardComponent {
  @Input() src: string = '';
  @Input() mobileSrc?: string;
  @Input() alt: string = '';
  @Input() width: string = '100%';
  @Input() ratio?: string;
  @Input() borderRadius: string = 'm';
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() enableZoom: boolean = false;
  @Input() isBlurredBackdrop: boolean = false;
  @Input() type: 'inline' | 'floating' = 'inline';

  getClasses(): string[] {
    const classes = [];
    classes.push(`bmb_radius-${this.borderRadius}`);
    if (this.enableZoom) classes.push('bmb_media-card-figure-zoom');
    return classes;
  }

  getContentClasses(): string[] {
    const classes = [];
    classes.push(`bmb_radius-${this.borderRadius}`);
    if (this.isBlurredBackdrop)
      classes.push('bmb_media-card-content-container-backdrop');
    return classes;
  }
}
