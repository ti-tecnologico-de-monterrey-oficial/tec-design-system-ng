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
import { BmbOverlayComponent } from '../../bmb-overlay/bmb-overlay.component';
import { CommonModule } from '@angular/common';
import { IBmbProjectedContentMode } from '../../../services/projection/projection.service';

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
  inputContext = input<{ [key: string]: any }>({});
  showBackdrop = input<boolean>(true);
  outputContext = input<{ [key: string]: (value: any) => void }>({});
  focusOnOpen = input<boolean>(true);

  removeContent = output<void>();

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('projectedContentDialogRef', { static: true })
  projectedContentDialogRef!: ElementRef<HTMLElement>;

  private componentRef: ComponentRef<any> | null = null;

  constructor() {
    effect(() => {
      if (this.content() !== null) {
        this.renderContent();
        this.projectedContentDialogRef?.nativeElement?.focus();
      } else {
        this.componentRef?.destroy();
        this.componentRef = null;
      }
    });
  }

  getPosition() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (this.htmlRef() === null) {
      return {};
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
      display: 'flex',
      'max-height': `calc(100vh - (${top} + ${bottom} + 1rem))`,
      'justify-content': width > 1000 && width / 2 ? 'flex-end' : 'flex-start',
    };
  }

  renderContent() {
    this.container?.clear();
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
        const instance = this.componentRef.instance as any;

        Object.keys(this.inputContext()).forEach((key) => {
          this.componentRef?.setInput(key, this.inputContext()[key]);
        });

        Object.keys(this.outputContext()).forEach((key) => {
          if (instance[key] && instance[key].subscribe) {
            instance[key].subscribe((event: unknown) => {
              this.outputContext()[key](event);
            });
          }
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
