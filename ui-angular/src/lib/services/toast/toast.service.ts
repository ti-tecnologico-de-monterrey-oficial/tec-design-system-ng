import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  openToast() {
    this.isOpenSubject.next(true);
  }

  closeToast() {
    this.isOpenSubject.next(false);
  }
}
