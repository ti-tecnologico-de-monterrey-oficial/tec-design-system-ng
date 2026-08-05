import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbInteractiveItemTextButtonComponent } from './bmb-interactive-item-text-button.component';
import { ComponentRef } from '@angular/core';
import { BmbItemDefaultComponent } from '../../bmb-item/children';

describe('BmbInteractiveItemTextButtonComponent', () => {
  let component: BmbInteractiveItemTextButtonComponent;
  let fixture: ComponentFixture<BmbInteractiveItemTextButtonComponent>;
  let componentRef: ComponentRef<BmbItemDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInteractiveItemTextButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInteractiveItemTextButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'face');
    componentRef.setInput('label', 'Text');
    componentRef.setInput('value', 'info');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
