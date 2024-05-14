import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTablesComponent } from './bmb-tables.component';

describe('BmbTablesComponent', () => {
  let component: BmbTablesComponent;
  let fixture: ComponentFixture<BmbTablesComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbTablesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
