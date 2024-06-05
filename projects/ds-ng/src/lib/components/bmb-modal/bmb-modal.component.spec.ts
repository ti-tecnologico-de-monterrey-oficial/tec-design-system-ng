import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbModalComponent } from './bmb-modal.component';

describe('BmbModalComponent', () => {
  let component: BmbModalComponent;
  let fixture: ComponentFixture<BmbModalComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
