import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotPaginatorComponent } from './dot-paginator.component';

describe('DotPaginatorComponent', () => {
  let component: DotPaginatorComponent;
  let fixture: ComponentFixture<DotPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotPaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DotPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
