import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemsPage } from './list-items-page';

describe('ListItemsPage', () => {
  let component: ListItemsPage;
  let fixture: ComponentFixture<ListItemsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemsPage],
    }).compileComponents();
    fixture = TestBed.createComponent(ListItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should track the addButtonAction event', () => {
    component.handleAddButtonClick();
    expect(component.lastEvent()).toBe('addButtonAction emitido');
  });
});
