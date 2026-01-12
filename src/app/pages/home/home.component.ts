import {
  Component,
  effect,
  model,
  TemplateRef,
  ViewChild,
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
  BmbNotificationService,
  BmbAdvertisementCardComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { HelpMenuComponent } from '../../components/help-menu/help-menu.component';
import { CdkDragPlaceholder } from '@angular/cdk/drag-drop';

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
    CdkDragPlaceholder,
    BmbAdvertisementCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;
  @ViewChild('notificationTemplate')
  notificationTemplate!: TemplateRef<unknown>;

  constructor(
    private router: Router,
    private contentProjected: BmbProjectionContentService,
    private notificationService: BmbNotificationService,
  ) {
    effect(() => {
      console.log('Bookmark active state changed:', this.bookmarkActive());
    });

    setTimeout(() => {
      console.log('show notification');

      this.notificationService.addNotification({
        title: 'Welcome to the Home Page!',
        content: this.notificationTemplate,
        isFullColor: false,
        component: 'notification',
        type: 'info',
        delay: 500000,
      });
      this.notificationService.addNotification({
        title: 'Welcome to the Home Page!',
        content: 'This is a simple notification message.',
        isFullColor: false,
        component: 'notification',
        type: 'info',
        delay: 5000,
      });
    }, 1000);
  }

  bookmarkActive = model<boolean>(false);

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
}
