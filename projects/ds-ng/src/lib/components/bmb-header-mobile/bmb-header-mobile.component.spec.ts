import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbHeaderMobileComponent } from './bmb-header-mobile.component';

describe('BmbHeaderMobileComponent', () => {
  let component: BmbHeaderMobileComponent;
  let fixture: ComponentFixture<BmbHeaderMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbHeaderMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHeaderMobileComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values for inputs', () => {
    expect(component.text).toEqual('');
    expect(component.type).toEqual('');
    expect(component.image).toEqual('');
    expect(component.altImage).toEqual('');
    expect(component.logo).toEqual('');
    expect(component.altLogo).toEqual('');
    expect(component.iconLeft).toEqual('');
    expect(component.iconRight).toEqual('');
    expect(component.iconRight2).toEqual('');
    expect(component.iconRight3).toEqual('');
    expect(component.isTwoIcons).toEqual(false);
  });

  it('should set isTwoIcons property when isTwoIcons input is provided', () => {
    component.isTwoIcons = true;
    fixture.detectChanges();
    expect(component.isTwoIcons).toEqual(true);
  });

  it('should set text property when text input is provided', () => {
    component.text = 'Sample Text';
    fixture.detectChanges();
    expect(component.text).toEqual('Sample Text');
  });
});
