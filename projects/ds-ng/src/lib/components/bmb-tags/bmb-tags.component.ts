import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  AfterViewInit,
  output,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export type IBmbActivityTags =
  | 'normal'
  | 'mitec_blue'
  | 'mitec_red'
  | 'mitec_green'
  | 'mitec_orange'
  | 'mitec_light_green'
  | 'mitec_purple'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon';

@Component({
  selector: 'bmb-tag',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  styleUrl: './bmb-tags.component.scss',
  templateUrl: './bmb-tags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTagComponent implements AfterViewInit {
  appearance = input<IBmbActivityTags>('normal');
  text = input<string>('');
  grouped = input<boolean>(false);
  dismissible = input<boolean>(false);
  rounded = input<boolean>(false);
  activityTag = input<boolean>(false);

  closedTag = output<string>();
  clickedTag = output<string>();

  groupedTags = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    if (this.grouped()) {
      const parentElement = this.el.nativeElement.parentElement;

      let wrapperDiv = parentElement.querySelector('.bmb_tag-grouped');
      if (!wrapperDiv) {
        wrapperDiv = this.renderer.createElement('div');
        this.renderer.addClass(wrapperDiv, 'bmb_tag-grouped');
        this.renderer.insertBefore(parentElement, wrapperDiv, null);
      }

      this.renderer.appendChild(wrapperDiv, this.el.nativeElement);
    }
    this.getClasses();
  }

  getClasses(): string[] {
    const classes = [
      'bmb_tag',
      'bmb_tag-rounded',
      `bmb_tag-${this.appearance()}`,
    ];

    if (this.activityTag()) {
      classes.push('bmb_tag-activity');
    }

    return classes;
  }

  closeTag(text: string) {
    this.closedTag.emit(text);
  }

  clickTag(text: string) {
    this.clickedTag.emit(text);
  }
}
