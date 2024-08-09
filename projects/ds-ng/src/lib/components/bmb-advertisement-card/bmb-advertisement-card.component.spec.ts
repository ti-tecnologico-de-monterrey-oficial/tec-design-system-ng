import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbAdvertisementCardComponent } from './bmb-advertisement-card.component';

describe('BmbAdvertisementCardComponent', () => {
  let component: BmbAdvertisementCardComponent;
  let fixture: ComponentFixture<BmbAdvertisementCardComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbAdvertisementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
