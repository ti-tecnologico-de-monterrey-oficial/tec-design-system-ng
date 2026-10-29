import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { IPositionButtonMenu, SidebarElement } from '../../_shared/types';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { TranslatePipe } from '../../pipes/translations';
import {
  getSidebarLink,
  getSidebarValidationErrors,
  hasSidebarChildren,
} from '../../_shared/logic/components/sidebar';

@Component({
  selector: 'bmb-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbCheckExternalLinkButtonComponent,
    BmbActionIconComponent,
    BmbDividerComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-sidebar.component.html',
  styleUrl: './bmb-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSidebarComponent {
  testId = input<string>('sidebar-element-button');
  elements = input<SidebarElement[][]>([]);
  position = input<IPositionButtonMenu>('left'); //Only for web
  componentTitle = input<string>('Navigation');
  showHeaderForChildren = input<boolean>(false);

  title = input<string>(); // deprecated

  isOpen = false;
  maxChildrenLevel = 2;
  error = false;

  constructor() {
    effect(() => {
      const errors = getSidebarValidationErrors(this.elements());
      errors.forEach((message) => console.error(message));
      if (errors.length) this.error = true;
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
    return hasSidebarChildren(selectedElement);
  }

  protected getLink(selectedElement: SidebarElement): string {
    return getSidebarLink(selectedElement);
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
      const openElements = document.querySelectorAll(
        '.bmb_sidebar-children.open',
      );
      openElements.forEach((element) => element.classList.remove('open'));
    }
  }
}
