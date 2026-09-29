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

  it('updates the displayed items and output log through the paginator buttons', () => {
    component.setTotalItems(12);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll(
      'bmb-paginator button',
    );

    buttons[2].click();
    fixture.detectChanges();
    expect(component.currentPage()).toBe(2);
    expect(fixture.nativeElement.querySelector('.items').textContent).toContain(
      'Elemento 6',
    );
    expect(fixture.nativeElement.textContent).toContain('pageChange: 2');

    buttons[3].click();
    fixture.detectChanges();
    expect(component.visibleItems()).toEqual(['Elemento 11', 'Elemento 12']);
    expect(
      fixture.nativeElement.querySelector('bmb-paginator').textContent,
    ).toContain('11 - 12 de 12');
    expect(buttons[3].disabled).toBe(true);

    buttons[0].click();
    fixture.detectChanges();
    expect(component.currentPage()).toBe(1);
    expect(buttons[0].disabled).toBe(true);
  });

  it('renders the empty, single page and partial page scenarios', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.controls button');
    buttons[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(
      'No hay elementos para mostrar.',
    );
    expect(
      fixture.nativeElement.querySelector('bmb-paginator').textContent,
    ).toContain('0 de 0');

    buttons[1].click();
    fixture.detectChanges();
    expect(component.visibleItems()).toEqual(['Elemento 1']);
    expect(
      Array.from(
        fixture.nativeElement.querySelectorAll('bmb-paginator button'),
      ).every((button) => (button as HTMLButtonElement).disabled),
    ).toBe(true);

    buttons[2].click();
    fixture.detectChanges();
    expect(component.visibleItems()).toEqual(['Elemento 11', 'Elemento 12']);
  });
});
