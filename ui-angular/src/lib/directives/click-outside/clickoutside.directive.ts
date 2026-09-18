/* eslint-disable @angular-eslint/directive-selector*/
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  output,
} from '@angular/core';
import { Subscription, filter, fromEvent } from 'rxjs';
import { isInsideClickOutsideContainer } from '../../_shared/logic/components/click-outside';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  clickOutside = output<void>();

  documentClickSubscription: Subscription | undefined;

  private element: ElementRef = inject(ElementRef);
  private document: Document = inject(DOCUMENT);

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click')
      .pipe(
        filter((event) => {
          return !this.isInside(event.target as HTMLElement);
        }),
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return isInsideClickOutsideContainer(
      elementToCheck,
      this.element.nativeElement,
    );
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }
}
