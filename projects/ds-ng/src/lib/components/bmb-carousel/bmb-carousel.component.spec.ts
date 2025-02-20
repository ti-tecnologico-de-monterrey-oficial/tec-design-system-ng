import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbCarouselComponent } from './bmb-carousel.component';

describe('BmbCarouselComponent', () => {
  let component: BmbCarouselComponent;
  let fixture: ComponentFixture<BmbCarouselComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbCarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
