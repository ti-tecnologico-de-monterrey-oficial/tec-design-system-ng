import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbInteractiveItemComponent } from './bmb-interactive-item.component';
import { ComponentRef } from '@angular/core';

describe('BmbInteractiveItemComponent', () => {
  let component: BmbInteractiveItemComponent;
  let fixture: ComponentFixture<BmbInteractiveItemComponent>;
  let componentRef: ComponentRef<BmbInteractiveItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInteractiveItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInteractiveItemComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('icon', 'mobile_2');
    componentRef.setInput('label', 'Text');
    componentRef.setInput('value', 'info');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
