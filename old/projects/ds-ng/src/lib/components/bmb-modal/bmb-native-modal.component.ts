import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  effect,
  input,
  output,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
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
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { TranslatePipe } from '../../pipes/translations';

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
    BmbIconComponent,
    TranslatePipe,
  ],
})
export class BmbNativeModalComponent {
  componentTitle = input<string>('');
  subtitle = input<string>('');
  content = input<TemplateRef<any> | null | Type<any> | string>('');
  actions = input<IBmbActionButton[]>([]);
  modalId = input.required<string>();
  size = input<IBmbNativeModalSize>('medium');
  iconStyle = input<IBmbModalAlertStyle>();
  // autoFocus = input<boolean>(false);
  disableBackdropClose = input<boolean>(true);
  hasBackdrop = input<boolean>(true);
  inputContext = input<{ [key: string]: any }>({});
  outputContext = input<{ [key: string]: (value: any) => void }>({});

  actionsClicked = output<{ buttonName: string; event: MouseEvent }>();
  closeModalClicked = output<{ modalId: string; event: MouseEvent }>();

  constructor(private modalService: BmbNativeModalService) {
    effect(() => {
      this.renderContent();
    });
  }

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  private componentRef: ComponentRef<any> | null = null;

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

  isStringContent(): boolean {
    return typeof this.content() === 'string';
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

  handleBackdropClick(): void {
    if (!this.disableBackdropClose()) {
      this.handleCloseModal(new MouseEvent('click'));
    }
  }

  renderContent() {
    if (!(this.content() instanceof Type)) {
      return;
    }

    // Clear previous content, optional chaining in case container is not yet initialized
    this.container?.clear();
    if (this.componentRef) {
      this.componentRef?.destroy();
      this.componentRef = null;
    }

    if (!this.content() || !this.container) return;

    this.componentRef = this.container.createComponent(
      this.content() as Type<any>,
    );

    if (this.componentRef.instance) {
      const instance = this.componentRef.instance as any;

      Object.keys(this.inputContext()).forEach((key) => {
        this.componentRef?.setInput(key, this.inputContext()[key]);
      });

      Object.keys(this.outputContext()).forEach((key) => {
        if (instance[key] && instance[key].subscribe) {
          instance[key].subscribe(() => {
            this.outputContext()[key](event);
          });
        }
      });
    }
  }
}
