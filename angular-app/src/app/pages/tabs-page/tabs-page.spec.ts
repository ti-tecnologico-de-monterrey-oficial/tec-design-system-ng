import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsPage } from './tabs-page';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsPage],
    }).compileComponents();
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should track the selected event', () => {
    component.handleSelected({ id: 2, title: 'Prestamo educativo' });
    expect(component.lastEvent()).toBe(
      'selected emitido: Prestamo educativo',
    );
  });
});
