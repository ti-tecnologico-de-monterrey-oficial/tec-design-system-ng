import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BreadcrumbPage } from './breadcrumb-page';

describe('BreadcrumbPage', () => {
  let component: BreadcrumbPage;
  let fixture: ComponentFixture<BreadcrumbPage>;

  beforeEach(async () => {
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '<svg width="24" height="24"></svg>',
      json: async () => ({}),
    });

    await TestBed.configureTestingModule({
      imports: [BreadcrumbPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose every local-navigation length used by the playground', () => {
    component.setItemCount(6);
    expect(component.dataLocalNav()).toHaveLength(6);

    component.setItemCount(1);
    expect(component.dataLocalNav()).toHaveLength(1);
  });

  it('should update top bar, inactive, and dropdown states', () => {
    component.setTopBar(true);
    component.setInactive(true);
    component.setDropdownOpen(true);

    expect(component.isTopBar()).toBe(true);
    expect(component.isInactive()).toBe(true);
    expect(component.dropdownOpen()).toBe(true);
  });

  it('should bind dropdownOpen to the breadcrumb component', () => {
    component.setItemCount(5);
    component.setDropdownOpen(true);
    fixture.detectChanges();

    const dropdownMenu = fixture.nativeElement.querySelector(
      '.bmb_breadcrumb-dropdown-menu',
    );
    expect(dropdownMenu).toBeTruthy();
  });
});
