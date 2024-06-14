import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbDropdownComponent } from './bmb-dropdown.component';

describe('BmbDropdownComponent', () => {
  let component: BmbDropdownComponent;
  let fixture: ComponentFixture<BmbDropdownComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
