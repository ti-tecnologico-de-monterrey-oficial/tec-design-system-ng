import {
  Directive,
  AfterContentInit,
  DoCheck,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy,
  OutputRefSubscription,
  ContentChildren,
  QueryList,
  input,
  effect
} from '@angular/core';
import { BmbAccordionComponent } from '../../components/bmb-accordion/bmb-accordion.component';

@Directive({
  selector: '[bmbAccordionControl]',
  standalone: true,
})
export class BmbAccordionControlDirective
  implements AfterContentInit, OnDestroy
{
  accordionStates = input<{ [id: string]: boolean }>({});

  @ContentChildren(BmbAccordionComponent)
  accordions!: QueryList<BmbAccordionComponent>;

  private subscriptions: OutputRefSubscription[] = [];
  
  constructor() {
    effect(() => {
      const states = this.accordionStates();

      if (!this.accordions) return;

      this.applyControlledStates();
    });
  }

  ngAfterContentInit(): void {
    this.subscriptions = this.accordions.map((accordion) => {
      return accordion.opened.subscribe(() => {
        const states = this.accordionStates();
        const hasControlledStates =
          !!states && Object.keys(states).length > 0;

        if (!hasControlledStates) {
          this.closeOthers(String(accordion.accordionId()));
        } else {
          this.updateExternalState(String(accordion.accordionId()));
        }
      });
    });

    this.applyControlledStates();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private applyControlledStates(): void {
    const states = this.accordionStates();

    if (!states || Object.keys(states).length === 0) {
      this.accordions.forEach((accordion, index) => {
        accordion._disabled.set(false);

        accordion._expanded.set(index === 0);
        accordion._active.set(index === 0);
      });

      return;
    }

    this.accordions.forEach((accordion) => {
      const state = !!states[String(accordion.accordionId())];

      accordion._disabled.set(!state);
      accordion._expanded.set(state);
      accordion._active.set(state);
    });
  }

  private closeOthers(openId: string): void {
    const hasControlledStates =
      !!this.accordionStates() &&
      Object.keys(this.accordionStates()).length > 0;

    this.accordions.forEach((accordion) => {
      if (String(accordion.accordionId()) !== openId) {
        accordion._expanded.set(false);
        accordion._active.set(false);
        accordion._disabled.set(hasControlledStates);
      } else {
        accordion._active.set(true);
        accordion._expanded.set(true);
        accordion._disabled.set(false);
      }
    });
  }

  private updateExternalState(openId: string): void {
    const states = this.accordionStates();

    if (!states) return;

    const newStates = { ...states };

    Object.keys(states).forEach((id) => {
      states[id] = id === openId;
    });
  }
}
