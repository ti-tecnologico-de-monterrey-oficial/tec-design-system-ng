import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-theme',
  standalone: true,
  imports: [CommonModule],
  providers: [ThemeService],
  templateUrl: './bmb-theme.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BmbThemeComponent implements OnInit {
  selectedTheme: string = 'dark';

  private service = inject(ThemeService);

  ngOnInit(): void {
    this.service.theme$.subscribe((theme: any) => {
      this.applyTheme(theme);
    });
  }

  applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  onThemeChange(newTheme: string): void {
    this.selectedTheme = newTheme;
    this.service.setTheme(this.selectedTheme);
  }
}
