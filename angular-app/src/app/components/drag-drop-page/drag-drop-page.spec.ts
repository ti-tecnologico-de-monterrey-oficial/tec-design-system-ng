import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropPage } from './drag-drop-page';

describe('DragDropPage', () => {
  let component: DragDropPage;
  let fixture: ComponentFixture<DragDropPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DragDropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Drag y Drop component', () => {
    expect(fixture.nativeElement.querySelector('bmb-drag-drop')).toBeTruthy();
  });

  it('should exercise the page controls and reset function', () => {
    component.moveItemToRight();
    expect(component.dragDrop?.rightItems()).toHaveLength(2);

    component.moveItemToLeft();
    expect(component.dragDrop?.leftItems()).toHaveLength(2);

    component.resetItems();
    expect(component.dragDrop?.leftItems()).toEqual([
      { id: 1, label: 'Item A' },
      { id: 2, label: 'Item B' },
    ]);
    expect(component.dragDrop?.rightItems()).toEqual([
      { id: 3, label: 'Item C' },
    ]);
  });
});
