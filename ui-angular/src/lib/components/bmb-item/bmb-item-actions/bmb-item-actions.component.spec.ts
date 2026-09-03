import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbItemActionsComponent } from './bmb-item-actions.component';
import { ComponentRef } from '@angular/core';

describe('BmbItemActionsComponent', () => {
  let component: BmbItemActionsComponent;
  let fixture: ComponentFixture<BmbItemActionsComponent>;
  let componentRef: ComponentRef<BmbItemActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbItemActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbItemActionsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('label', 'Text');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
