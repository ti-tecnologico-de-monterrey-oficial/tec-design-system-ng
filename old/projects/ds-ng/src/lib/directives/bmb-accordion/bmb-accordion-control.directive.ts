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
  Input,
} from '@angular/core';
import { BmbAccordionComponent } from '../../components/bmb-accordion/bmb-accordion.component';

@Directive({
  selector: '[bmbAccordionControl]',
  standalone: true,
})
export class BmbAccordionControlDirective
  implements AfterContentInit, DoCheck, OnDestroy
{
  @Input() accordionStates?: { [id: string]: boolean };

  @ContentChildren(BmbAccordionComponent)
  accordions!: QueryList<BmbAccordionComponent>;

  private differ?: KeyValueDiffer<string, boolean>;
  private subscriptions: OutputRefSubscription[] = [];
  private contentReady = false;

  constructor(private differs: KeyValueDiffers) {}

  ngAfterContentInit(): void {
    this.subscriptions = this.accordions.map((accordion) => {
      return accordion.opened.subscribe(() => {
        if (!this.accordionStates) {
          this.closeOthers(String(accordion.accordionId()));
        } else {
          this.updateExternalState(String(accordion.accordionId()));
        }
      });
    });

    if (this.accordionStates) {
      this.differ = this.differs.find({}).create();
      this.applyControlledStates();
    }
    this.contentReady = true;
  }

  ngDoCheck(): void {
    if (!this.contentReady || !this.accordionStates || !this.differ) return;

    const changes = this.differ.diff(this.accordionStates);
    if (changes) {
      this.applyControlledStates();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private applyControlledStates(): void {
    this.accordions.forEach((accordion) => {
      const state = this.accordionStates![accordion.accordionId()!];
      accordion._disabled.set(false);
      if (!state) {
        accordion._disabled.set(true);
      }
      accordion._expanded.set(state);
      accordion._active.set(state);
    });
  }

  private closeOthers(openId: string): void {
    this.accordions.forEach((accordion) => {
      if (String(accordion.accordionId()) !== openId) {
        accordion._expanded.set(false);
        accordion._active.set(false);

        if (this.accordionStates) {
          accordion._disabled.set(true);
        } else {
          accordion._disabled.set(false);
        }
      } else {
        accordion._active.set(true);
      }
    });
  }

  private updateExternalState(openId: string): void {
    if (!this.accordionStates) return;
    Object.keys(this.accordionStates).forEach((id) => {
      this.accordionStates![id] = id === openId;
    });
  }
}
