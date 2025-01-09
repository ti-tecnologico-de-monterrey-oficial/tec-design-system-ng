import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHeaderSectionComponent } from '../bmb-header-section/bmb-header-section.component';
import {
  IBmbModalAction,
  IBmbModalAlertStyle,
  IBmbModalSize,
} from './bmb-modal.interface';
import { CommonModule } from '@angular/common';
import { BmbModalService } from '../../services/modal.service';
import { BmbButtonDirective } from '../../directives/button.directive';
import { IButtonAppearance } from '../../types';

type BmbModalActions = 'close';

@Component({
  selector: 'bmb-modal-footer',
  standalone: true,
  imports: [BmbButtonDirective],
  templateUrl: './bmb-modal-footer.component.html',
  styleUrl: './bmb-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbModalFooterComponent {
  actions = input<IBmbModalAction[]>([]);
  id = input.required<string>();
  disableCloseButtonFooter = input<boolean>(false);

  constructor(private modalService: BmbModalService) {}

  arrayActions: IBmbModalAction[] = this.actions();

  getFooterActions() {
    const closeButton: IBmbModalAction = {
      label: 'Cerrar',
      action: 'close',
    };

    if (this.disableCloseButtonFooter()) {
      this.arrayActions = this.actions();
      return this.actions();
    }

    const newActions = [...this.actions(), closeButton];
    this.arrayActions = newActions;

    return newActions;
  }

  handleButtonFooterClick(event: number) {
    const action = this.arrayActions[event];

    if (typeof action.action === 'string') {
      this.modalService.closeModal(this.id());
    }

    if (typeof action.action === 'function') {
      action.action();
    }
  }
}

@Component({
  selector: 'bmb-modal',
  standalone: true,
  imports: [BmbHeaderSectionComponent, CommonModule, BmbModalFooterComponent],
  templateUrl: './bmb-modal.component.html',
  styleUrl: './bmb-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbModalComponent {
  title = input<string>('');
  subtitle = input<string>('');
  content = input<string | TemplateRef<any>>('');
  size = input<IBmbModalSize>('medium');
  type = input<IBmbModalAlertStyle>('info');
  actions = input<IBmbModalAction[]>([]);
  id = input.required<string>();
  scrollable = input<boolean>(false);
  hideFooter = input<boolean>(false);
  disableCloseButtonFooter = input<boolean>(false);

  constructor(private modalService: BmbModalService) {}

  getActionHeaders() {
    this.modalService.closeModal(this.id());
  }

  getIcon() {
    const alertStyle = this.type();

    switch (alertStyle) {
      case 'warning':
        return 'warning';
      case 'neutral':
        return 'info';
      case 'primary':
        return 'info';
      case 'event':
        return 'notification_important';
      case 'error':
        return 'error';
      case 'success':
        return 'check_circle';
      case 'info':
        return '';
      default:
        return 'info';
    }
  }

  getModalSize() {
    return `bmb_modal-container-${this.size()}`;
  }

  getModalClassList() {
    const classList = ['bmb_modal', `bmb_modal-${this.type()}`];

    return classList;
  }

  getContentType() {
    return typeof this.content() === 'string';
  }

  headerActions = [
    {
      icon: 'close',
      action: () => this.getActionHeaders(),
    },
  ];

  getHeaderActions() {
    return this.headerActions;
  }

  getContent(): any {
    if (typeof this.content() !== 'string' && typeof this.content())
      return this.content() as TemplateRef<any>;
  }
}
