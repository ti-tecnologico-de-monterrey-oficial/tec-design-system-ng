import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbCarouselComponent } from './bmb-carousel.component';
import { ComponentRef } from '@angular/core';

describe('BmbCarouselComponent', () => {
  let component: BmbCarouselComponent;
  let fixture: ComponentFixture<BmbCarouselComponent>;
  let componentRef: ComponentRef<BmbCarouselComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbCarouselComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
