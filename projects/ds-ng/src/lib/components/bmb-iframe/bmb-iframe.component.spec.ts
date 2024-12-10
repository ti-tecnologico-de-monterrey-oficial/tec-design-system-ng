import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbIframeComponent } from './bmb-iframe.component';
import { ComponentRef } from '@angular/core';

describe('BmbIframeComponent', () => {
  let component: BmbIframeComponent;
  let fixture: ComponentFixture<BmbIframeComponent>;
  let componentRef: ComponentRef<BmbIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbIframeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbIframeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('src', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
