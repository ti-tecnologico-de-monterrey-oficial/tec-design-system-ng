import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbInteractiveItemDefaultComponent } from './bmb-interactive-item-default.component';
import { ComponentRef } from '@angular/core';

describe('BmbInteractiveItemDefaultComponent', () => {
  let component: BmbInteractiveItemDefaultComponent;
  let fixture: ComponentFixture<BmbInteractiveItemDefaultComponent>;
  let componentRef: ComponentRef<BmbInteractiveItemDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInteractiveItemDefaultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInteractiveItemDefaultComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('itemTitle', 'Text');
    componentRef.setInput('icon', 'face');
    fixture.detectChanges();
  });

  it('should create', () => {});
});
