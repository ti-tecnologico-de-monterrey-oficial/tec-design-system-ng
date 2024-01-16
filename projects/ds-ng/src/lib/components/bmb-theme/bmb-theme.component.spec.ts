import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonToggleModule,
  MatButtonToggleChange,
} from '@angular/material/button-toggle';
import { BmbThemeComponent } from './bmb-theme.component';
import { ThemeService } from '../../services/theme.service';

describe('BmbThemeComponent', () => {
  let component: BmbThemeComponent;
  let fixture: ComponentFixture<BmbThemeComponent>;
  let themeService: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbThemeComponent],
      imports: [MatButtonToggleModule],
      providers: [ThemeService],
    });

    fixture = TestBed.createComponent(BmbThemeComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);

    spyOn(component as any, 'applyTheme').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default theme', () => {
    expect(component.selectedTheme).toBe('light');
  });

  it('should apply the theme on initialization', () => {
    const theme = 'dark';
    spyOn(component, 'applyTheme').and.callThrough();
    themeService.setTheme(theme);
    expect(component.applyTheme).toHaveBeenCalledWith(theme);
  });

  it('should update the selected theme on button toggle change', () => {
    const newTheme = 'dark';
    const toggleChangeEvent = { value: newTheme } as MatButtonToggleChange;

    component.onThemeChange(toggleChangeEvent);

    expect(component.selectedTheme).toBe(newTheme);
    expect(themeService.setTheme).toHaveBeenCalledWith(newTheme);
  });
});
