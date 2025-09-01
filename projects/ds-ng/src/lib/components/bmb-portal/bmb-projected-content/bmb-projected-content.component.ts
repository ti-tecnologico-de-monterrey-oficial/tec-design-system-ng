import {
  Component,
  ComponentRef,
  effect,
  input,
  output,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BmbOverlayComponent } from '../../bmb-overlay/bmb-overlay.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-projected-content',
  styleUrl: './bmb-projected-content.component.scss',
  templateUrl: './bmb-projected-content.component.html',
  imports: [BmbOverlayComponent, CommonModule],
  standalone: true,
})
export class BmbProjectedContentComponent {
  content = input<TemplateRef<any> | null | Type<any>>(null);
  htmlRef = input<HTMLElement | null>(null);

  removeContent = output<void>();

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  private componentRef: ComponentRef<any> | null = null;

  constructor() {
    effect(() => {
      if (this.content() !== null) {
        this.renderContent();
      } else {
        this.componentRef?.destroy();
        this.componentRef = null;
      }
    });
  }

  getContainerStyles() {
    console.log('styles', {
      left: this.htmlRef() ? this.htmlRef()?.offsetLeft + 'px' : '0',
      top: this.htmlRef() ? this.htmlRef()?.offsetTop + 'px' : '0',
    });

    if (this.content() !== null) return;
    return {
      left: this.htmlRef() ? this.htmlRef()?.offsetLeft + 'px' : '0',
      top: this.htmlRef() ? this.htmlRef()?.offsetTop + 'px' : '0',
    };
  }

  renderContent() {
    // Limpiar contenido previo
    this.container.clear();
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    if (!this.content() || !this.container) return;

    if (this.isTemplateRef(this.content())) {
      // Es un TemplateRef
      this.container.createEmbeddedView(this.content() as TemplateRef<any>);
    } else {
      // Es un componente (Type<any>)
      this.componentRef = this.container.createComponent(
        this.content() as Type<any>,
      );
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
