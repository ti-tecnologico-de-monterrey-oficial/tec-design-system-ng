import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTagsPage } from './input-tags-page';

describe('InputTagsPage', () => {
  let component: InputTagsPage;
  let fixture: ComponentFixture<InputTagsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTagsPage],
    }).compileComponents();
    fixture = TestBed.createComponent(InputTagsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should track the onChange event', () => {
    component.handleChange(['Angular', 'React']);
    expect(component.lastEvent()).toBe('onChange emitido: Angular, React');
  });
});
