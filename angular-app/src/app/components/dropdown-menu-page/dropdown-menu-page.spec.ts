import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownMenuPage } from './dropdown-menu-page';

describe('DropdownMenuPage', () => {
  let component: DropdownMenuPage;
  let fixture: ComponentFixture<DropdownMenuPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose menu items and update the selected item', () => {
    expect(component.items()).toHaveLength(3);

    component.handleItemClick(component.items()[1]);

    expect(component.lastSelectedItem()).toBe('Configuración');
  });

  it('should filter item types and update the selected item through an action', () => {
    component.showExternalLink.set(false);
    component.updateItems();

    expect(component.items()).toHaveLength(2);
    component.items()[0].action?.();
    expect(component.lastSelectedItem()).toBe('Configuración');

    component.showActions.set(false);
    component.showExternalLink.set(true);
    component.updateItems();

    expect(component.items()).toHaveLength(1);
    expect(component.items()[0].text).toBe('Enlace externo');
  });
});
