import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbInputTagsComponent } from './bmb-input-tags.component';

describe('BmbInputTagsComponent', () => {
  let component: BmbInputTagsComponent;
  let fixture: ComponentFixture<BmbInputTagsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbInputTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
