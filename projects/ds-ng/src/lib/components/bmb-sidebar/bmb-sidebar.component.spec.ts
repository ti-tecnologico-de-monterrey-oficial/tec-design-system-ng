import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbSidebarComponent } from './bmb-sidebar.component';
import { SidebarElement } from './bmb-sidebar.interface';

describe('BmbSidebarComponent', () => {
  let component: BmbSidebarComponent;
  let fixture: ComponentFixture<BmbSidebarComponent>;

  const createSidebarElement = (
    id: number,
    title: string,
    link?: string,
    children?: SidebarElement[],
  ): SidebarElement => ({
    id,
    icon: 'home',
    title,
    link,
    children,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the link when element has no children', () => {
    expect(
      component['getLink']({
        link: '/home',
        hasChildren: false,
      }),
    ).toBe('/home');
  });

  it('should return an empty link when element has children', () => {
    expect(
      component['getLink']({
        link: '/home',
        hasChildren: true,
      }),
    ).toBe('');
  });

  it('should close sidebar and clear selected element open state', () => {
    const selected = createSidebarElement(5, 'Menu', '/menu');
    selected.isOpen = true;
    component.isOpen = true;

    component['closeSidebar'](selected);

    expect(component.isOpen).toBeFalse();
    expect(selected.isOpen).toBeFalse();
  });

  it('should toggle children open state', () => {
    const selected = createSidebarElement(6, 'Nested', '/nested');
    selected.isOpen = false;

    component['toggleChildren'](selected);
    expect(selected.isOpen).toBeTrue();

    component['toggleChildren'](selected);
    expect(selected.isOpen).toBeFalse();
  });
});
