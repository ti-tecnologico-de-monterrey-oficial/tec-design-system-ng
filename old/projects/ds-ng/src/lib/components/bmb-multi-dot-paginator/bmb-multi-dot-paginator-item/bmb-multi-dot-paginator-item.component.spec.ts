import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbMultiDotPaginatorItemComponent } from './bmb-multi-dot-paginator-item.component';

describe('BmbMultiDotPaginatorItemComponent', () => {
  let component: BmbMultiDotPaginatorItemComponent;
  let fixture: ComponentFixture<BmbMultiDotPaginatorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbMultiDotPaginatorItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbMultiDotPaginatorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
