import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbAccordionComponent } from './bmb-accordion.component';

describe('BmbAccordionComponent', () => {
  let component: BmbAccordionComponent;
  let fixture: ComponentFixture<BmbAccordionComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
