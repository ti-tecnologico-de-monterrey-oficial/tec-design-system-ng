import {
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
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
  BmbIconItemComponent,
  BmbSelectorDirective,
  BmbUserSummaryContentComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [
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
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdentityComponent {
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
