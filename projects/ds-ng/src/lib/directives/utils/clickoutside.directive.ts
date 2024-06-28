import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from "@angular/core";
import { Subscription, filter, fromEvent } from "rxjs";

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside: EventEmitter<void> = new EventEmitter<void>();

  documentClickSubscription: Subscription | undefined;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click').pipe(
      filter((event) => {
        return !this.isInside(event.target as HTMLElement);
      })
    ).subscribe(() => {
      this.clickOutside.emit();
    });
  }

  isInside(elemeToCheck: HTMLElement): boolean {
    return (
      elemeToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elemeToCheck) ||
      elemeToCheck?.classList?.contains('modal-persist')
    );
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }
}
