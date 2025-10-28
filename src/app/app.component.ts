import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  BmbTopBarComponent,
  BmbSidebarComponent,
  BmbHomeCardComponent,
  BmbTabsComponent,
  BmbCardComponent,
  BmbCardHeaderComponent,
  BmbCardContentComponent,
  BmbFormValidatorComponent,
  BmbInputComponent,
  BmbButtonDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  IBmbActionHeader,
  IBmbNativeModal,
  BmbNativeModalService,
  BmbThemeComponent,
} from '../../dist/ds-ng';
import {
  BmbIconItemComponent,
  BmbSelectorDirective,
  BmbUserSummaryContentComponent,
} from '../../projects/ds-ng/src/public-api';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  imports: [
    RouterModule,
    BmbThemeComponent,
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardComponent,
    BmbTabsComponent,
    BmbCardComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbUserSummaryContentComponent,
    BmbIconItemComponent,
    BmbFormValidatorComponent,
    BmbInputComponent,
    BmbButtonDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbSelectorDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {
  selectedTab = 1;
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'edit',
      alt: 'edit',
      action: () => this.openModal(),
    },
  ];
  userForm: FormGroup = new FormGroup({});

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<undefined>;

  openModal(): void {
    const dataModal: IBmbNativeModal = {
      title: 'Editar datos de contacto',
      content: this.modalTemplate,
    };
    this.modalService.openModal(dataModal);
  }

  constructor(private modalService: BmbNativeModalService) {}
}
