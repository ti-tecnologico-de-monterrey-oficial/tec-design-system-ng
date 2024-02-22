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

  it('should apply appearance class when appearance is provided', () => {
    component.appearance = 'custom';
    fixture.detectChanges();

    const containerElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement.classList.contains('container--custom')).toBe(true);
  });

  it('should not apply appearance class when appearance is not provided', () => {
    fixture.detectChanges();

    const containerElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement.classList.contains('container--')).toBe(false);
  });
});
