import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbItemDefaultComponent } from './bmb-item-default.component';
import { ComponentRef } from '@angular/core';

describe('BmbItemDefaultComponent', () => {
  let component: BmbItemDefaultComponent;
  let fixture: ComponentFixture<BmbItemDefaultComponent>;
  let componentRef: ComponentRef<BmbItemDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbItemDefaultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbItemDefaultComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('label', 'Text');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display value', () => {
    componentRef.setInput('value', 'Text');
    fixture.detectChanges();
    expect(componentRef.instance.value()).toBe('Text');
  });
});
