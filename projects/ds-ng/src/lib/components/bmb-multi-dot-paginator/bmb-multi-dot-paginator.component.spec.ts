import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbMultiDotPaginatorComponent } from './bmb-multi-dot-paginator.component';

describe('BmbMultiDotPaginatorComponent', () => {
  let component: BmbMultiDotPaginatorComponent;
  let fixture: ComponentFixture<BmbMultiDotPaginatorComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbMultiDotPaginatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
