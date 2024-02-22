import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ToastService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bmb-toast',
  templateUrl: './bmb-toast.component.html',
  styleUrls: ['../../../assets/styles/components/_toast.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbToastComponent implements OnInit, OnDestroy {
  @Input() appearance: string = '';
  @Input() message: string = '';
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
    const classes: string[] = ['toast'];

    if (this.appearance) {
      classes.push('toast--' + this.appearance);
    }

    if (this.position) {
      classes.push('toast--' + this.position);
    }

    return classes;
  }

  private setAutoClose(): void {
    setTimeout(() => {
      this.toastService.closeToast();
    }, this.duration);
  }

  openToast() {
    this.toastService.openToast();
  }
}
