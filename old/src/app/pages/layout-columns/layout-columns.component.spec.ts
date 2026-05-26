import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutColumnsComponent } from './layout-columns.component';

describe('LayoutColumnsComponent', () => {
  let component: LayoutColumnsComponent;
  let fixture: ComponentFixture<LayoutColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutColumnsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
