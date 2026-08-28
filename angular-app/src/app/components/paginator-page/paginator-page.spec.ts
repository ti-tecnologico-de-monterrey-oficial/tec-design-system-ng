import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorPage } from './paginator-page';

describe('PaginatorPage', () => {
  let component: PaginatorPage;
  let fixture: ComponentFixture<PaginatorPage>;

  beforeEach(async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '<svg viewBox="0 0 24 24"></svg>',
    } as Response);

    await TestBed.configureTestingModule({
      imports: [PaginatorPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update and clamp every paginator property', () => {
    component.setTotalItems(12);
    component.setItemsPerPage(5);
    component.setCurrentPage(10);

    expect(component.totalItems()).toBe(12);
    expect(component.itemsPerPage()).toBe(5);
    expect(component.totalPages()).toBe(3);
    expect(component.currentPage()).toBe(3);
    expect(component.visibleItems()).toEqual(['Elemento 11', 'Elemento 12']);
  });

  it('should update the current page when pageChange is emitted', () => {
    component.handlePageChange(2);

    expect(component.currentPage()).toBe(2);
    expect(component.lastEvent()).toBe('pageChange: 2');
  });

  it('should support the empty state', () => {
    component.setTotalItems(0);

    expect(component.totalPages()).toBe(0);
    expect(component.currentPage()).toBe(1);
    expect(component.visibleItems()).toEqual([]);
  });
});
