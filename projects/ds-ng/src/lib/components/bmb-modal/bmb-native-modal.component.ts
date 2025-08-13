import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  TemplateRef,
  Type,
  ViewEncapsulation,
} from '@angular/core';
import { BmbOverlayComponent } from '../bmb-overlay/bmb-overlay.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { CommonModule } from '@angular/common';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import {
  IBmbModalAlertStyle,
  IBmbNativeModalSize,
  IBmbActionButton,
} from './bmb-modal.interface';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbNativeModalService } from '../../services/native-modal.service';

@Component({
  selector: 'bmb-native-modal',
  template: ``,
  styleUrls: ['./bmb-native-modal.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bmb-native-modal.component.html',
  imports: [
    BmbOverlayComponent,
    BmbButtonDirective,
    CommonModule,
    BmbThreeColsComponent,
    BmbTitleContentComponent,
    BmbActionIconComponent,
  ],
})
export class BmbNativeModalComponent {
  title = input<string>('');
  subtitle = input<string>('');
  content = input<TemplateRef<any> | string>('');
  actions = input<IBmbActionButton[]>([]);
  alertIcon = input<IBmbModalAlertStyle>();
  modalId = input.required<string>();
  size = input<IBmbNativeModalSize>('medium');
  iconStyle = input<IBmbModalAlertStyle>();

  actionsClicked = output<{ buttonName: string; event: MouseEvent }>();
  closeModalClicked = output<{ modalId: string; event: MouseEvent }>();

  constructor(private modalService: BmbNativeModalService) {}

  svgUrl: string = 'assets/svg/';
  modalIcon = computed(() => {
    if (this.iconStyle()) {
      return `${this.svgUrl}${this.iconStyle()}_fill.svg`;
    }
    return '';
  });

  getContainerClass(): string {
    switch (this.size()) {
      case 'x-small':
        return 'bmb_native-modal-container-x-small';
      case 'x-large':
        return 'bmb_native-modal-container-x-large';
      case 'small':
        return 'bmb_native-modal-container-small';
      case 'large':
        return 'bmb_native-modal-container-large';
      default:
        return 'bmb_native-modal-container-medium';
    }
  }

  isTemplateRef(): boolean {
    return (
      typeof this.content() !== 'string' &&
      this.content() instanceof TemplateRef
    );
  }

  getContent(): any {
    return this.content() instanceof TemplateRef ? this.content() : null;
  }

  handleButtonClick(buttonName: string, event: MouseEvent): void {
    this.actionsClicked.emit({ buttonName, event });
  }

  handleCloseModal(event: MouseEvent): void {
    this.closeModalClicked.emit({ modalId: this.modalId(), event });
    this.modalService.closeModal(this.modalId());
  }
}
