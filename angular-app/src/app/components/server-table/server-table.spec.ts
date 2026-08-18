import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerTablePage } from './server-table';

describe('ServerTablePage', () => {
  let component: ServerTablePage;
  let fixture: ComponentFixture<ServerTablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerTablePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerTablePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update its controls', () => {
    component.setLoading(true);
    component.handlePageChange(2);
    component.handleRowClick({ name: 'Ana Torres' });
    expect(component.loading()).toBe(true);
    expect(component.page()).toBe(2);
    expect(component.selectedName()).toBe('Ana Torres');
  });
});
