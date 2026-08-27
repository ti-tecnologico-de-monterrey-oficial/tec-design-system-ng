import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbPaginatorComponent } from './bmb-paginator.component';

describe('BmbPaginatorComponent', () => {
  let component: BmbPaginatorComponent;
  let fixture: ComponentFixture<BmbPaginatorComponent>;

  beforeEach(() => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
    } as Response);
    fixture = TestBed.createComponent(BmbPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should calculate pages and pagination text', () => {
    fixture.componentRef.setInput('totalItems', 12);
    fixture.componentRef.setInput('itemsPerPage', 5);
    fixture.componentRef.setInput('currentPage', 2);

    expect(component.totalPages()).toBe(3);
    expect(component.pages()).toEqual([1, 2, 3]);
    expect(component.getPaginationText()).toBe('6 - 10 de 12');
  });

  it('should emit only valid page changes', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('totalItems', 12);
    fixture.componentRef.setInput('itemsPerPage', 5);

    component.onPageChange(2);
    component.onPageChange(0);
    component.onPageChange(4);

    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(2);
  });

  it('should describe the empty state', () => {
    expect(component.getPaginationText()).toBe('0 de 0');
  });
});
