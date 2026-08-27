import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  AfterViewInit,
  output,
  input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { TranslatePipe } from '../../pipes/translations';
import { getTagClasses } from '../../_shared/logic/components/tags';
import { IBmbActivityTags } from '../../_shared/types/components/tags';
import { IBmbTagColors } from '../../_shared/types/foundations/colors/color-type';

@Component({
  selector: 'bmb-tag',
  standalone: true,
  imports: [CommonModule, BmbActionIconComponent, TranslatePipe],
  styleUrl: './bmb-tags.component.scss',
  templateUrl: './bmb-tags.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTagComponent implements AfterViewInit {
  appearance = input<IBmbTagColors | IBmbActivityTags>('normal');
  text = input<string>('');
  grouped = input<boolean>(false);
  dismissible = input<boolean>(false);
  rounded = input<boolean>(false);
  activityTag = input<boolean>(false); //Disable
  isDisabled = input<boolean>(false);
  isActive = input<boolean>(false);
  enableClick = input<boolean>(false);

  closedTag = output<string>();
  clickedTag = output<string>();

  groupedTags = [];

  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

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
    return getTagClasses({
      appearance: this.appearance(),
      dismissible: this.dismissible(),
      enableClick: this.enableClick(),
      isActive: this.isActive(),
      isDisabled: this.isDisabled(),
    });
  }

  closeTag(text: string) {
    this.closedTag.emit(text);
  }

  clickTag(text: string) {
    this.clickedTag.emit(text);
  }
}
