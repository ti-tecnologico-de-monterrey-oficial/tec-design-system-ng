import {
  Component,
  OnInit,
  inject,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { ThemeService } from '../../services';
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
  @Input() initialTheme?: string;
  @Input() showControls: boolean = true;

  selectedTheme: string = 'light';
  private service = inject(ThemeService);
  private initialized = false;

  ngOnInit(): void {
    this.selectedTheme = this.calculateTheme();
    this.applyTheme(this.selectedTheme);

    this.service.theme$.subscribe((theme: any) => {
      if (this.initialized && theme !== this.selectedTheme) {
        this.applyTheme(theme);
      }
    });

    this.initialized = true;
  }

  calculateTheme():string {
    const savedTheme = localStorage.getItem('theme');

    if (!this.showControls && this.initialTheme) return this.initialTheme;
    if (savedTheme) return savedTheme;
    if (this.initialTheme) return this.initialTheme;

    return this.service.getDefaultTheme();
  }

  applyTheme(theme: string): void {
    if (theme !== this.selectedTheme || !this.initialized) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.selectedTheme = theme;
    }
  }

  onThemeChange(isChecked: boolean): void {
    const newTheme = isChecked ? 'dark' : 'light';
    if (newTheme !== this.selectedTheme) {
      this.applyTheme(newTheme);
      this.service.setTheme(newTheme);
    }
  }
}
