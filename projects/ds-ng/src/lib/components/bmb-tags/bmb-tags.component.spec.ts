import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTagComponent } from './bmb-tags.component';

describe('BmbTagComponent', () => {
  let component: BmbTagComponent;
  let fixture: ComponentFixture<BmbTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbTagComponent],
    });

    fixture = TestBed.createComponent(BmbTagComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply badge class based on appearance', () => {
    component.appearance = 'primary';
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const badgeElement = element.querySelector('.badge');

    expect(badgeElement?.classList).toContain('badge--primary');
  });

  it('should not apply badge class when appearance is not provided', () => {
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const badgeElement = element.querySelector('.badge');

    expect(badgeElement?.classList).not.toContain('badge--');
  });

  it('should display text inside the badge', () => {
    component.text = 'Sample Text';
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const textElement = element.querySelector('.badge span');

    expect(textElement?.textContent).toContain('Sample Text');
  });
});
