import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  Renderer2,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';

@Component({
  selector: 'bmb-loader',
  styleUrl: './bmb-loader.component.scss',
  templateUrl: './bmb-loader.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, BmbButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbLoaderComponent implements OnInit, OnDestroy, OnChanges {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() overlay: boolean = false;
  @Input() isVisible: boolean = true;
  @Input() errorState: boolean = false;
  @Input() actions: boolean = false;
  @Input() buttonPrimary: string = '';
  @Input() buttonSecondary: string = '';

  @Output() onButtonPrimary: EventEmitter<void> = new EventEmitter<void>();
  @Output() onButtonSecondary: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
  ) {}

  ngOnInit() {
    this.updateBodyClass();
  }

  ngOnChanges() {
    this.updateBodyClass();
  }

  ngOnDestroy() {
    this.cleanupBody();
  }

  private updateBodyClass() {
    if (this.isVisible) {
      document.body.appendChild(this.elRef.nativeElement);

      if (this.overlay && !this.errorState) {
        this.renderer.addClass(document.body, 'bmb_loader-body-overlay');
      }
    } else {
      this.cleanupBody();
    }
  }

  private cleanupBody() {
    if (document.body.contains(this.elRef.nativeElement)) {
      this.renderer.removeChild(document.body, this.elRef.nativeElement);
    }
    this.renderer.removeClass(document.body, 'bmb_loader-body-overlay');
  }

  handleButtonPrimary() {
    this.onButtonPrimary.emit();
  }

  handleButtonSecondary() {
    this.onButtonSecondary.emit();
  }
}
