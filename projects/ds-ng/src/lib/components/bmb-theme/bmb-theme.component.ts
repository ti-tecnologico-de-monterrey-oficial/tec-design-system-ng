import {
  Component,
  OnInit,
  inject,
  ViewEncapsulation,
  input,
  model,
  signal,
  computed,
} from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { CommonModule } from '@angular/common';
import { BmbSwitchComponent } from '../bmb-switch/bmb-switch.component';

@Component({
  selector: 'bmb-theme',
  standalone: true,
  imports: [CommonModule, BmbSwitchComponent],
  providers: [ThemeService],
  templateUrl: './bmb-theme.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BmbThemeComponent implements OnInit {
  initialTheme = input<string>('');
  showControls = input<boolean>(false);
  leftText = input<string>('');
  rightText = input<string>('');

  // deprecated icons
  leftIcon = model<string>('light_mode');
  rightIcon = model<string>('dark_mode');

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setInitialTheme(this.initialTheme());
  }

  selectedTheme = computed(() => this.themeService.getTheme());

  applyTheme(theme: string): void {
    this.themeService.setThemeAndSaveInLocal(theme);
  }

  onThemeChange(isChecked: boolean): void {
    const newTheme = isChecked ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }
}
