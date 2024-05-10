import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTagComponent } from './bmb-tags.component';

describe('BmbTagComponent', () => {
  let component: BmbTagComponent;
  let fixture: ComponentFixture<BmbTagComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbTagComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not apply badge class when appearance is not provided', () => {
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const badgeElement = element.querySelector('.bmb_tag');

    expect(badgeElement?.classList).not.toContain('bmb_tag-');
  });

  it('should display text inside the badge', () => {
    component.text = 'Sample Text';
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const textElement = element.querySelector('.bmb_tag span');

    expect(textElement?.textContent).toContain('Sample Text');
  });
});
