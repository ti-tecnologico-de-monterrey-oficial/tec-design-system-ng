import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLtsComponent } from './table-lts.component';

describe('TableLtsComponent', () => {
  let component: TableLtsComponent;
  let fixture: ComponentFixture<TableLtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableLtsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableLtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
