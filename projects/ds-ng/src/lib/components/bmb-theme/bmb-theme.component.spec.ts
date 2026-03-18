import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbThemeComponent } from './bmb-theme.component';
import { ThemeService } from '../../services/theme/theme.service';
import { signal } from '@angular/core';

describe('BmbThemeComponent', () => {
  let component: BmbThemeComponent;
  let fixture: ComponentFixture<BmbThemeComponent>;
  let themeServiceStub: Partial<ThemeService>;

  beforeEach(() => {
    themeServiceStub = {
      getTheme: () => 'dark',
      setThemeAndSaveInLocal: jasmine.createSpy('setThemeAndSaveInLocal'),
      setInitialTheme: jasmine.createSpy('setInitialTheme'),
    };

    TestBed.configureTestingModule({
      imports: [BmbThemeComponent],
    })
      .overrideComponent(BmbThemeComponent, {
        set: {
          providers: [{ provide: ThemeService, useValue: themeServiceStub }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BmbThemeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call setInitialTheme on init', () => {
    // The initialTheme input starts empty
    fixture.detectChanges();
    expect(themeServiceStub.setInitialTheme).toHaveBeenCalledWith('');
  });

  it('should apply theme on change', () => {
    spyOn(component, 'applyTheme').and.callThrough();
    component.onThemeChange(true);
    expect(component.applyTheme).toHaveBeenCalledWith('dark');
    expect(themeServiceStub.setThemeAndSaveInLocal).toHaveBeenCalledWith('dark');
  });
});

