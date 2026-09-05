import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleHeaderPage } from './simple-header-page';

describe('SimpleHeaderPage', () => {
  let component: SimpleHeaderPage;
  let fixture: ComponentFixture<SimpleHeaderPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleHeaderPage],
    }).compileComponents();
    fixture = TestBed.createComponent(SimpleHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should expose icon options', () =>
    expect(component.icons).toContain('apps'));
  it('should record icon events', () => {
    component.handleIconClick(new MouseEvent('click'));
    expect(component.lastEvent()).toBe('onIconClick: click');
  });
});
