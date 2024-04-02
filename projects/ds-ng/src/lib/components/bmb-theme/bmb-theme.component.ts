import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
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
  selectedTheme: string = 'light';

  private service = inject(ThemeService);

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log(savedTheme);
    this.selectedTheme = savedTheme;
    this.applyTheme(savedTheme);

    this.service.theme$.subscribe((theme: any) => {
      this.applyTheme(theme);
    });
  }

  applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  onThemeChange(isChecked: boolean): void {
    this.selectedTheme = isChecked ? 'dark' : 'light';
    localStorage.setItem('theme', this.selectedTheme);
    this.service.setTheme(this.selectedTheme);
  }
}
