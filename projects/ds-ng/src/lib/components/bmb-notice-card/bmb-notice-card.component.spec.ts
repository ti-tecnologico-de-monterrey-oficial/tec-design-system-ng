import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbNoticeCardComponent } from './bmb-notice-card.component';

describe('BmbNoticeCardComponent', () => {
  let component: BmbNoticeCardComponent;
  let fixture: ComponentFixture<BmbNoticeCardComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbNoticeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
