import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbThemeComponent } from './bmb-theme.component';
import { ThemeService } from '../../services';
import { of } from 'rxjs';

describe('BmbThemeComponent', () => {
  let component: BmbThemeComponent;
  let fixture: ComponentFixture<BmbThemeComponent>;
  let themeServiceStub: Partial<ThemeService>;

  beforeEach(() => {
    themeServiceStub = {
      theme$: of('dark'),
      getDefaultTheme: () => 'light',
      setTheme: jasmine.createSpy('setTheme'),
    };

    TestBed.configureTestingModule({
      imports: [BmbThemeComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbThemeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize leftIcon and rightIcon', () => {
    spyOn(component.leftIcon, 'update').and.callThrough();
    spyOn(component.rightIcon, 'update').and.callThrough();

    component.ngOnInit();

    expect(component.leftIcon.update).toHaveBeenCalled();
    expect(component.rightIcon.update).toHaveBeenCalled();
  });

  it('should set selectedTheme and apply it', () => {
    spyOn(component, 'calculateTheme').and.returnValue('dark');
    spyOn(component, 'applyTheme').and.callThrough();

    component.ngOnInit();

    expect(component.selectedTheme).toBe('dark');
    expect(component.applyTheme).toHaveBeenCalledWith('dark');
  });
});
