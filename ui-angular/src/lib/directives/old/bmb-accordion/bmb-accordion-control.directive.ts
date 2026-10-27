import {
  getInitialAccordionState,
  getOpenedAccordionState,
} from '../../../_shared/logic/directives/accordion-control';
import {
  Directive,
  AfterContentInit,
  OnDestroy,
  OutputRefSubscription,
  ContentChildren,
  QueryList,
  input,
  effect,
} from '@angular/core';
import { BmbAccordionComponent } from '../../../components/bmb-accordion/bmb-accordion.component';

@Directive({
  selector: '[bmbAccordionControl]',
  standalone: true,
})
export class BmbAccordionControlDirective
  implements AfterContentInit, OnDestroy
{
  accordionStates = input<{ [id: string]: boolean }>({});

  private contentInitialized = false;

  @ContentChildren(BmbAccordionComponent)
  accordions!: QueryList<BmbAccordionComponent>;

  private subscriptions: OutputRefSubscription[] = [];

  constructor() {
    effect(() => {
      this.accordionStates();
      if (this.contentInitialized) {
        this.applyControlledStates();
      }
    });
  }

  ngAfterContentInit(): void {
    this.contentInitialized = true;

    this.subscriptions = this.accordions.map((accordion) => {
      return accordion.opened.subscribe(() => {
        const states = this.accordionStates();
        const hasControlledStates = !!states && Object.keys(states).length > 0;

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
    this.accordions.forEach((accordion, index) => {
      const state = getInitialAccordionState(
        states,
        String(accordion.accordionId()),
        index,
      );
      accordion._disabled.set(state.disabled);
      accordion._expanded.set(state.expanded);
      accordion._active.set(state.active);
    });
  }

  private closeOthers(openId: string): void {
    const controlled =
      !!this.accordionStates() &&
      Object.keys(this.accordionStates()).length > 0;
    this.accordions.forEach((accordion) => {
      const state = getOpenedAccordionState(
        String(accordion.accordionId()),
        openId,
        controlled,
      );
      if (state.expanded) {
        accordion._active.set(state.active);
        accordion._expanded.set(state.expanded);
        accordion._disabled.set(state.disabled);
      } else {
        accordion._expanded.set(state.expanded);
        accordion._active.set(state.active);
        accordion._disabled.set(state.disabled);
      }
    });
  }

  private updateExternalState(openId: string): void {
    const states = this.accordionStates();

    if (!states) return;

    Object.keys(states).forEach((id) => {
      states[id] = id === openId;
    });

    this.applyControlledStates();
  }
}
