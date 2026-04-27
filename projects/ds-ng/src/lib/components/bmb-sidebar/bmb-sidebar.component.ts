import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarElement } from './bmb-sidebar.interface';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { IPositionButtonMenu } from '../bmb-top-bar/types';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';

@Component({
  selector: 'bmb-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbCheckExternalLinkButtonComponent,
    BmbActionIconComponent,
    BmbDividerComponent,
  ],
  templateUrl: './bmb-sidebar.component.html',
  styleUrl: './bmb-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSidebarComponent {
  elements = input<SidebarElement[][]>([]);
  position = input<IPositionButtonMenu>('left'); //Only for web
  componentTitle = input<string>('Navigation');
  showHeaderForChildren = input<boolean>(false);

  title = input<string>(); // deprecated

  isOpen: boolean = false;
  maxChildrenLevel: number = 2;
  error = false;

  constructor() {
    effect(() => {
      const totalElements = this.elements().reduce(
        (acc, group) => acc + group.length,
        0,
      );

      if (this.elements()?.length > 2) {
        console.error(
          'The sidebar component only supports two levels of navigation',
        );
        this.error = true;
      }

      if (totalElements > 8) {
        console.error(
          'The sidebar component only supports a maximum of 8 elements in the first level of navigation',
        );
        this.error = true;
      }
    });

    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }

  protected hasChildren(selectedElement: SidebarElement): boolean {
    return !!selectedElement.children;
  }

  protected getLink(selectedElement: SidebarElement): string {
    if (this.hasChildren(selectedElement)) return '';
    return selectedElement.link || '';
  }

  protected closeSidebar(selectedElement: SidebarElement) {
    if (selectedElement) {
      this.clearSelectElement(selectedElement);
      this.isOpen = false;
    }
  }

  protected clearSelectElement(selectedElement: SidebarElement): void {
    if (selectedElement) {
      selectedElement.isOpen = false;
    }
  }

  protected toggleChildren(selectedElement: SidebarElement) {
    if (selectedElement) {
      selectedElement.isOpen = !selectedElement.isOpen;
    }
  }

  protected checkForCustomEvent(
    selectedElement: SidebarElement,
    parentElement: SidebarElement,
  ): void {
    if (selectedElement) {
      this.toggleChildren(selectedElement);
      if (
        !this.hasChildren(selectedElement) &&
        !this.getLink(selectedElement)
      ) {
        this.closeSidebar(parentElement);
        if (selectedElement.event) {
          selectedElement.event(selectedElement);
        }
      }
    }
  }

  protected handleClose(): void {
    if (!this.isOpen) {
      const openElements = document.querySelectorAll('.open');
      openElements.forEach((element) => element.classList.remove('open'));
    }
  }
}
