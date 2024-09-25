import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbFilterCardComponent } from './bmb-filter-card.component';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BmbFilterCardComponent', () => {
  let component: BmbFilterCardComponent;
  let fixture: ComponentFixture<BmbFilterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmbFilterCardComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbFilterCardComponent);
    component = fixture.componentInstance;
    component.tags = ['Competencia 1', 'Competencia 2', 'Competencia 3'];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter tags based on search query', () => {
    const searchQuery = 'Competencia 1';
    component.onSearch(searchQuery);
    expect(component.filteredTags).toEqual(['Competencia 1']);
  });

  it('should toggle the state of a filter option', () => {
    const indexToTest = 0;
    const initialCheckedState = component.options[indexToTest].checked;

    component.handleToggleOption(indexToTest);
    fixture.detectChanges();

    expect(component.options[indexToTest].checked).toBe(!initialCheckedState);
  });
});
