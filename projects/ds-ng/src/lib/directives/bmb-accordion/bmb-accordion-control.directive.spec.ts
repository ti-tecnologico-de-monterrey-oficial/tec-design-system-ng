import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { BmbAccordionControlDirective } from './bmb-accordion-control.directive';
import { BmbAccordionComponent } from '../../components/bmb-accordion/bmb-accordion.component';
import { By } from '@angular/platform-browser';
import { KeyValueDiffers } from '@angular/core';

@Component({
  template: `
    <div bmbAccordionControl [accordionStates]="states">
      <bmb-accordion [accordionId]="'a1'"></bmb-accordion>
      <bmb-accordion [accordionId]="'a2'"></bmb-accordion>
    </div>
  `,
  standalone: true,
  imports: [BmbAccordionControlDirective, BmbAccordionComponent],
})
class TestHostComponent {
  states = { a1: true, a2: false };
  @ViewChildren(BmbAccordionComponent)
  accordions!: QueryList<BmbAccordionComponent>;
}

@Component({
  template: `
    <div bmbAccordionControl>
      <bmb-accordion [accordionId]="'a1'"></bmb-accordion>
      <bmb-accordion [accordionId]="'a2'"></bmb-accordion>
      <bmb-accordion [accordionId]="'a3'"></bmb-accordion>
    </div>
  `,
  standalone: true,
  imports: [BmbAccordionControlDirective, BmbAccordionComponent],
})
class UncontrolledTestHostComponent {
  @ViewChildren(BmbAccordionComponent)
  accordions!: QueryList<BmbAccordionComponent>;
}

describe('BmbAccordionControlDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [KeyValueDiffers],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the directive', () => {
    const directive = fixture.debugElement.query(
      By.directive(BmbAccordionControlDirective),
    );
    expect(directive).toBeTruthy();
  });

  it('should apply controlled states to accordions', () => {
    fixture.detectChanges();
    const accordions = hostComponent.accordions.toArray();
    expect(accordions[0]._expanded()).toBe(true);
    expect(accordions[1]._expanded()).toBe(false);
  });

  it('should update external state when an accordion is opened', () => {
    const accordions = hostComponent.accordions.toArray();
    accordions[1].opened.emit();
    fixture.detectChanges();
    expect(hostComponent.states.a1).toBe(false);
    expect(hostComponent.states.a2).toBe(true);
  });

  it('should update accordion states when accordionStates input changes', () => {
    hostComponent.states = { a1: false, a2: true };
    fixture.detectChanges();
    const accordions = hostComponent.accordions.toArray();
    expect(accordions[0]._expanded()).toBe(false);
    expect(accordions[1]._expanded()).toBe(true);
  });

  it('should disable accordions that are not expanded in controlled mode', () => {
    const accordions = hostComponent.accordions.toArray();
    expect(accordions[0]._disabled()).toBe(false);
    expect(accordions[1]._disabled()).toBe(true);
  });

  it('should set active state based on expanded state', () => {
    const accordions = hostComponent.accordions.toArray();
    expect(accordions[0]._active()).toBe(true);
    expect(accordions[1]._active()).toBe(false);
  });

  it('should handle multiple state changes', () => {
    const accordions = hostComponent.accordions.toArray();

    hostComponent.states = { a1: false, a2: true };
    fixture.detectChanges();
    expect(accordions[0]._expanded()).toBe(false);
    expect(accordions[1]._expanded()).toBe(true);

    hostComponent.states = { a1: true, a2: false };
    fixture.detectChanges();
    expect(accordions[0]._expanded()).toBe(true);
    expect(accordions[1]._expanded()).toBe(false);
  });

  it('should unsubscribe from accordion events on destroy', () => {
    const directive = fixture.debugElement
      .query(By.directive(BmbAccordionControlDirective))
      .injector.get(BmbAccordionControlDirective);
    const initialState = { ...hostComponent.states };
    fixture.destroy();

    expect(hostComponent.states).toEqual(initialState);
  });
});

describe('BmbAccordionControlDirective - Uncontrolled mode', () => {
  let uncontrolledFixture: ComponentFixture<UncontrolledTestHostComponent>;
  let uncontrolledHost: UncontrolledTestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UncontrolledTestHostComponent],
    }).compileComponents();
    uncontrolledFixture = TestBed.createComponent(
      UncontrolledTestHostComponent,
    );
    uncontrolledHost = uncontrolledFixture.componentInstance;
    uncontrolledFixture.detectChanges();
  });

  afterEach(() => {
    uncontrolledFixture.destroy();
  });

  it('should close other accordions when one is opened', () => {
    const accordions = uncontrolledHost.accordions.toArray();
    accordions[0].opened.emit();
    uncontrolledFixture.detectChanges();

    expect(accordions[0]._active()).toBe(true);
    expect(accordions[1]._expanded()).toBe(false);
    expect(accordions[2]._expanded()).toBe(false);
  });

  it('should not disable accordions in uncontrolled mode', () => {
    const accordions = uncontrolledHost.accordions.toArray();
    accordions[0].opened.emit();
    uncontrolledFixture.detectChanges();

    expect(accordions[0]._disabled()).toBe(false);
    expect(accordions[1]._disabled()).toBe(false);
    expect(accordions[2]._disabled()).toBe(false);
  });

  it('should allow switching between accordions', () => {
    const accordions = uncontrolledHost.accordions.toArray();

    accordions[0].opened.emit();
    uncontrolledFixture.detectChanges();
    expect(accordions[0]._active()).toBe(true);

    accordions[1].opened.emit();
    uncontrolledFixture.detectChanges();
    expect(accordions[0]._expanded()).toBe(false);
    expect(accordions[1]._active()).toBe(true);
  });

  it('should set active state only for opened accordion', () => {
    const accordions = uncontrolledHost.accordions.toArray();

    accordions[2].opened.emit();
    uncontrolledFixture.detectChanges();

    expect(accordions[0]._active()).toBe(false);
    expect(accordions[1]._active()).toBe(false);
    expect(accordions[2]._active()).toBe(true);
  });
});
