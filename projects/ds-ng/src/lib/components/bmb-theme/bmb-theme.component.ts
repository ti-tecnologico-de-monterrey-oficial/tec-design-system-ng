import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services';

@Component({
  selector: 'bmb-theme',
  templateUrl: './bmb-theme.component.html',
})
export class BmbThemeComponent implements OnInit {
  selectedTheme: string = 'dark';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.applyTheme(theme);
    });
  }

  applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  onThemeChange(newTheme: string): void {
    this.selectedTheme = newTheme;
    this.themeService.setTheme(this.selectedTheme);
  }
}
