import {
  Component,
  computed,
  effect,
  model,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbAccordionComponent,
  BmbInputComponent,
  BmbFormValidatorComponent,
  BmbButtonDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbContainerButtonComponent,
  BmbTextLinkComponent,
  BmbDividerComponent,
  BmbHomeCardComponent,
  IBmbProjectionContent,
  BmbProjectionContentService,
  BmbMediaCardComponent,
  BmbImageComponent,
  BmbNativeModalService,
  BmbFilterCardComponent,
  ThemeService,
} from '../../../../projects/ds-ng/src/public-api';
import { HelpMenuComponent } from '../../components/help-menu/help-menu.component';
import { ModalWDropdownComponent } from '../../components/modal-w-dropdown/modal-w-dropdown.component';

@Component({
  selector: 'bmb-home',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbAccordionComponent,
    BmbInputComponent,
    BmbFormValidatorComponent,
    BmbButtonDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbContainerButtonComponent,
    BmbTextLinkComponent,
    BmbDividerComponent,
    BmbHomeCardComponent,
    BmbMediaCardComponent,
    BmbImageComponent,
    BmbFilterCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  bookmarkActive = model<boolean>(false);
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;
  @ViewChild('notificationTemplate')
  notificationTemplate!: TemplateRef<unknown>;

  constructor(
    private router: Router,
    private contentProjected: BmbProjectionContentService,
    private modalService: BmbNativeModalService,
    private themeService: ThemeService,
  ) {
    effect(() => {
      const theme = this.currentTheme();

      console.log('Current theme:', theme);
    });
  }

  currentTheme = computed(() => {
    console.log('Computing current theme...');

    return this.themeService.getTheme();
  });

  templateClick(event: MouseEvent | KeyboardEvent) {
    const data: IBmbProjectionContent = {
      content: this.modalTemplate,
      targetRef: event.target as HTMLElement,
      mode: 'outside',
    };

    this.contentProjected.openContent(data);
  }

  logBookmarkChange(event: boolean) {
    console.log('Bookmark active state:', event);
  }

  onExpandClick() {
    console.log('Expand clicked');

    this.router.navigate(['/homeCardTransition']);
  }

  onExpandClick2() {
    console.log('Expand clicked');

    this.router.navigate(['/dropdown']);
  }

  handleHelpButtonClick(event: MouseEvent | KeyboardEvent): void {
    const data: IBmbProjectionContent = {
      content: HelpMenuComponent,
      targetRef: event.target as HTMLElement,
      mode: 'outside',
    };

    this.contentProjected.openContent(data);
  }

  handleImageCard(event: MouseEvent | KeyboardEvent): void {
    console.log('Image card clicked', event);
  }

  handleImageClick(event: unknown): void {
    console.log('Image clicked:', event);
  }

  handleModalWithDropdown(event: MouseEvent | KeyboardEvent): void {
    this.modalService.openModal({
      title: 'Modal with Dropdown',
      content: ModalWDropdownComponent,
      size: 'medium',
    });
  }
}
