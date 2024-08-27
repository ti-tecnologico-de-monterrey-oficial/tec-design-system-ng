import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { ToastService } from '../../services';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  standalone: true,
  selector: 'bmb-toast',
  styleUrls: ['./bmb-toast.component.scss'],
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ToastService],
  encapsulation: ViewEncapsulation.None,
})
export class BmbToastComponent implements OnInit, OnDestroy {
  @Input() appearance: string = '';
  @Input() title: string = '';
  @Input() description?: string;
  @Input() duration?: number;
  @Input() position?: 'top' | 'bottom' | 'middle';

  isOpen$ = this.toastService.isOpen$;

  private isOpenSubscription: Subscription | undefined;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.isOpenSubscription = this.isOpen$.subscribe((isOpen) => {
      if (isOpen && this.duration) {
        this.setAutoClose();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isOpenSubscription) {
      this.isOpenSubscription.unsubscribe();
    }
  }

  getClasses(): string[] {
    const classes: string[] = ['bmb_toast'];

    if (this.appearance) {
      classes.push('bmb_toast-' + this.appearance);
    }

    if (this.position) {
      classes.push('bmb_toast-' + this.position);
    }

    return classes;
  }

  private setAutoClose(): void {
    setTimeout(() => {
      this.toastService.closeToast();
    }, this.duration);
  }

  public openToast() {
    this.toastService.openToast();
  }

  public closeToast() {
    this.toastService.closeToast();
  }
}
