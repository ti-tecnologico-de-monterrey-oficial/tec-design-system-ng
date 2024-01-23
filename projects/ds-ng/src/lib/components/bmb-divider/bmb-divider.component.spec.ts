import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbDividerComponent } from './bmb-divider.component';

describe('BmbDividerComponent', () => {
  let component: BmbDividerComponent;
  let fixture: ComponentFixture<BmbDividerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbDividerComponent],
    });

    fixture = TestBed.createComponent(BmbDividerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply divider class based on type', () => {
    component.type = 'primary';
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const dividerElement = element.querySelector('.divider');

    expect(dividerElement?.classList).toContain('divider-primary');
  });

  it('should apply size class based on size', () => {
    component.size = 'large';
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const dividerElement = element.querySelector('.divider');

    expect(dividerElement?.classList).toContain('divider-large');
  });

  it('should apply styles class based on styles', () => {
    component.styles = 'dashed';
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const dividerElement = element.querySelector('.divider');

    expect(dividerElement?.classList).toContain('divider-dashed');
  });

  it('should not apply divider class when type is not provided', () => {
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const dividerElement = element.querySelector('.divider');

    expect(dividerElement?.classList).not.toContain('divider-');
  });
});
