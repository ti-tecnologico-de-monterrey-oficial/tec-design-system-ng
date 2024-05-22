import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarElements } from './bmb-sidebar.interface';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-sidebar',
  standalone: true,
  imports: [BmbIconComponent, CommonModule, RouterModule],
  templateUrl: './bmb-sidebar.component.html',
  styleUrl: './bmb-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSidebarComponent {
  @Input() elements: SidebarElements[] = [];

  currentChoice: string = '';

  ngOnInit() {
    if (this.elements.length > 0 && this.elements[0].child.length > 0) {
      this.currentChoice = this.elements[0].child[0].title;
    }
  }

  setActive(choice: string) {
    this.currentChoice = choice;
  }

  getActive(choice: string): string {
    return this.currentChoice === choice ? 'active' : 'inactive';
  }

  isInternalLink(link: string): boolean {
    return link.startsWith('/');
  }
}
