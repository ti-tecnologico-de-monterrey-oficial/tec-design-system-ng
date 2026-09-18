import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInputPage } from './search-input-page';

describe('SearchInputPage', () => {
  let component: SearchInputPage;
  let fixture: ComponentFixture<SearchInputPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputPage],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should track the value change event', () => {
    component.handleValueChange('Mango');
    expect(component.lastEvent()).toBe('onValueChange: Mango');
  });
  it('should track the clear field event', () => {
    component.handleClearField();
    expect(component.lastEvent()).toBe('onClearField emitido');
  });
});
