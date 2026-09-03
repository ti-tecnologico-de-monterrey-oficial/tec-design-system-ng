import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbServerTableComponent } from './bmb-server-table.component';

describe('BmbServerTableComponent', () => {
  let component: BmbServerTableComponent;
  let fixture: ComponentFixture<BmbServerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbServerTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbServerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should derive columns and emit page changes', () => {
    fixture.componentRef.setInput('columns', [{ key: 'name', label: 'Name' }]);
    fixture.detectChanges();
    const pageChange = jest.fn();
    component.pageChange.subscribe(pageChange);
    component.onPageChange({ pageIndex: 1 });
    expect(component.displayedColumns).toEqual(['name']);
    expect(pageChange).toHaveBeenCalledWith(2);
  });

  it('should select and emit a row', () => {
    const row = { name: 'Ada' };
    const rowClick = jest.fn();
    component.onClickRow.subscribe(rowClick);
    component.onRowClick(row);
    expect(component.isSelected(row)).toBe(true);
    expect(rowClick).toHaveBeenCalledWith(row);
  });
});
