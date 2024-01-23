import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbBadgeComponent } from './bmb-badge.component';

describe('BmbBadgeComponent', () => {
  let component: BmbBadgeComponent;
  let fixture: ComponentFixture<BmbBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbBadgeComponent],
    });

    fixture = TestBed.createComponent(BmbBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply badge class based on type', () => {
    component.type = 'primary';
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const badgeElement = element.querySelector('.badge');

    expect(badgeElement?.classList).toContain('badge-primary');
  });

  it('should not apply badge class when type is not provided', () => {
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const badgeElement = element.querySelector('.badge');

    expect(badgeElement?.classList).not.toContain('badge-');
  });

  it('should display text inside the badge', () => {
    component.text = 'Sample Text';
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const textElement = element.querySelector('.badge span');

    expect(textElement?.textContent).toContain('Sample Text');
  });
});
