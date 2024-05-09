import { Component, Input } from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { CommonModule } from '@angular/common';
import { SidebarElements } from './bmb-sidebar.interface';

@Component({
  selector: 'bmb-sidebar',
  standalone: true,
  imports: [BmbIconComponent, CommonModule],
  templateUrl: './bmb-sidebar.component.html',
  styleUrl: './bmb-sidebar.component.scss',
})
export class BmbSidebarComponent {
  @Input() elements: SidebarElements[] = [];

  currentChoice: string = '';

  ngOnInit() {
    this.currentChoice = this.elements[0]?.title;
  }

  setActive(choice: string) {
    this.currentChoice = choice;
  }

  getActive(choice: string): string {
    if (this.currentChoice == choice) {
      return 'active';
    } else {
      return 'not';
    }
  }
}
