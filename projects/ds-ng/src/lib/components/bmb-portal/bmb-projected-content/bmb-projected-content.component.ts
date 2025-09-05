import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  effect,
  input,
  output,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { BmbOverlayComponent } from '../../bmb-overlay/bmb-overlay.component';
import { CommonModule } from '@angular/common';
import { IBmbProjectedContentMode } from '../../../services/projection.service';

@Component({
  selector: 'bmb-projected-content',
  styleUrl: './bmb-projected-content.component.scss',
  templateUrl: './bmb-projected-content.component.html',
  imports: [BmbOverlayComponent, CommonModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbProjectedContentComponent {
  content = input<TemplateRef<any> | null | Type<any>>(null);
  htmlRef = input<HTMLElement | null>(null);
  mode = input<IBmbProjectedContentMode>('outside');
  fixSizeToRef = input<boolean>(false);
  context = input<{ [key: string]: any }>({});
  showBackdrop = input<boolean>(true);

  removeContent = output<void>();

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  @ViewChild('projectedContentDialogRef')
  projectedContentDialogRef!: HTMLElement;

  private componentRef: ComponentRef<any> | null = null;

  constructor() {
    effect(() => {
      if (this.content() !== null) {
        this.renderContent();
        this.projectedContentDialogRef.focus();
      } else {
        this.componentRef?.destroy();
        this.componentRef = null;
      }
    });
  }

  getPosition() {
    console.log(this.showBackdrop());

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width < 1000) {
      return {
        inset: `0 0 0 0`,
        margin: '16px',
        width: 'calc(100% - 32px)',
        height: 'calc(100% - 32px) ',
      };
    }

    if (this.htmlRef() === null) {
      return {
        inset: `0 0 0 0`,
      };
    }

    const targetPosition = this.htmlRef()?.getBoundingClientRect() ?? {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    };

    let mode = 0;

    if (this.mode() === 'partial') {
      mode = targetPosition.height / 2;
    }

    if (this.mode() === 'outside') {
      mode = targetPosition.height + 8;
    }

    const left =
      targetPosition.left <= width / 2
        ? targetPosition.left.toFixed(0) + 'px'
        : 'auto';
    const right =
      targetPosition.left > width / 2
        ? (width - targetPosition.right).toFixed(0) + 'px'
        : 'auto';
    const top =
      targetPosition.top <= height / 2
        ? (targetPosition.top + mode).toFixed(0) + 'px'
        : 'auto';
    const bottom =
      targetPosition.top > height / 2
        ? (height - (targetPosition.bottom - mode)).toFixed(0) + 'px'
        : 'auto';

    return {
      inset: `${top} ${right} ${bottom} ${left}`,
      width: this.fixSizeToRef()
        ? targetPosition.width.toFixed(0) + 'px'
        : 'auto',
    };
  }

  renderContent() {
    this.container.clear();
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    if (!this.content() || !this.container) return;

    if (this.isTemplateRef(this.content())) {
      this.container.createEmbeddedView(this.content() as TemplateRef<any>);
    } else {
      this.componentRef = this.container.createComponent(
        this.content() as Type<any>,
      );

      if (this.componentRef.instance) {
        Object.keys(this.context()).forEach((key) => {
          this.componentRef?.setInput(key, this.context()[key]);
        });
      }
    }
  }

  private isTemplateRef(obj: any): obj is TemplateRef<any> {
    return obj && obj.createEmbeddedView;
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
