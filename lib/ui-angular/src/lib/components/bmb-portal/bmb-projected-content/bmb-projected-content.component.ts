import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  effect,
  ElementRef,
  input,
  output,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BmbOverlayComponent } from '../../bmb-overlay/bmb-overlay.component';
import { IBmbProjectedContentMode } from '../../../services/projection/projection.service';

import {
  buildDialogClasses,
  getProjectedContentPosition,
  renderProjectedContent,
} from '../../../_core/logic/components/projected-content/projected-content';

@Component({
  selector: 'bmb-projected-content',
  standalone: true,
  imports: [BmbOverlayComponent, CommonModule],
  templateUrl: './bmb-projected-content.component.html',
  styleUrl: './bmb-projected-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbProjectedContentComponent {
  content = input<TemplateRef<any> | null | Type<any>>(null);
  htmlRef = input<HTMLElement | null>(null);
  mode = input<IBmbProjectedContentMode>('outside');
  fixSizeToRef = input<boolean>(false);
  inputContext = input<{ [key: string]: any }>({});
  showBackdrop = input<boolean>(true);
  outputContext = input<{ [key: string]: (value: any) => void }>({});
  focusOnOpen = input<boolean>(true);
  dialogClass = input<string | string[] | Record<string, boolean>>('');
  forceMobileCenter = input<boolean>(false);

  removeContent = output<void>();

  @ViewChild('container', {
    read: ViewContainerRef,
    static: true,
  })
  container!: ViewContainerRef;

  @ViewChild('projectedContentDialogRef', {
    static: true,
  })
  projectedContentDialogRef!: ElementRef<HTMLElement>;

  private componentRef: ComponentRef<any> | null = null;

  constructor() {
    effect(() => {
      if (this.content() !== null) {
        this.renderContent();

        if (this.focusOnOpen()) {
          this.projectedContentDialogRef?.nativeElement?.focus();
        }
      } else {
        this.componentRef?.destroy();
        this.componentRef = null;
      }
    });
  }

  getPosition() {
    return getProjectedContentPosition({
      htmlRef: this.htmlRef(),
      mode: this.mode(),
      fixSizeToRef: this.fixSizeToRef(),
    });
  }

  renderContent(): void {
    this.componentRef = renderProjectedContent({
      container: this.container,
      componentRef: this.componentRef,
      content: this.content(),
      inputContext: this.inputContext(),
      outputContext: this.outputContext(),
    });
  }

  dialogNgClass() {
    return buildDialogClasses({
      fixSizeToRef: this.fixSizeToRef(),
      dialogClass: this.dialogClass(),
      forceMobileCenter: this.forceMobileCenter(),
    });
  }

  ngOnDestroy(): void {
    this.componentRef?.destroy();
  }
}