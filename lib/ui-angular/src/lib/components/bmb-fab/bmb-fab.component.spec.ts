import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbFabComponent } from './bmb-fab.component';

describe('BmbFabComponent', () => {
  let component: BmbFabComponent;
  let fixture: ComponentFixture<BmbFabComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(BmbFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
