import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbSoundsCardComponent } from './bmb-sounds-card.component';

describe('BmbSoundsCardComponent', () => {
  let component: BmbSoundsCardComponent;
  let fixture: ComponentFixture<BmbSoundsCardComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbSoundsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
