import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselPage } from './carousel-page';

describe('CarouselPage', () => {
  let component: CarouselPage;
  let fixture: ComponentFixture<CarouselPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the selected index from the property control', () => {
    component.select(2);
    fixture.detectChanges();

    expect(component.selectedIndex()).toBe(2);
    expect(fixture.nativeElement.querySelector('output').textContent).toContain(
      '2',
    );
  });
});
