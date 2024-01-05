import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BmbUserImageComponent } from './bmb-user-image.component';
import { Props } from './bmb-user-image.interface';

describe('BmbUserImageComponent', () => {
  let component: BmbUserImageComponent;
  let fixture: ComponentFixture<BmbUserImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmbUserImageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbUserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for size and imageSrc', () => {
    expect(component.size).toBe('');
    expect(component.imageSrc).toBe('../../assets/img/user-image.png');
  });

  it('should add size class when size is provided', () => {
    component.size = 'small';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('small');
  });

  it('getClasses method should return valid classes object', () => {
    const expectedClasses: Props = {
      symbol: true,
      small: true,
    };

    component.size = 'small';
    const classes = component.getClasses();

    expect(classes).toEqual(expectedClasses);
  });
});
