import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbOverlayComponent } from './bmb-overlay.component';

describe('BmbOverlayComponent', () => {
  let component: BmbOverlayComponent;
  let fixture: ComponentFixture<BmbOverlayComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbOverlayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
