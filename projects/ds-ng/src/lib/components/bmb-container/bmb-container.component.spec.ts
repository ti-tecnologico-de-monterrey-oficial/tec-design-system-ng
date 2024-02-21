import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbContainerComponent } from './bmb-container.component';

describe('BmbContainerComponent', () => {
  let component: BmbContainerComponent;
  let fixture: ComponentFixture<BmbContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbContainerComponent],
    });

    fixture = TestBed.createComponent(BmbContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply type class when type is provided', () => {
    component.type = 'custom';
    fixture.detectChanges();

    const containerElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement.classList.contains('container--custom')).toBe(true);
  });

  it('should not apply type class when type is not provided', () => {
    fixture.detectChanges();

    const containerElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement.classList.contains('container--')).toBe(false);
  });
});
