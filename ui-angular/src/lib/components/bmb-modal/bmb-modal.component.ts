import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import type { ModalDataConfig } from './bmb-modal.interface';
import { BmbButtonDirective } from '../../directives/old/bmb-button/button.directive';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

@Component({
  selector: 'bmb-modal',
  standalone: true,
  imports: [
    CommonModule,
    BmbThreeColsComponent,
    BmbTitleContentComponent,
    BmbActionIconComponent,
    BmbButtonDirective,
  ],
  providers: [MatDialog],
  templateUrl: './bmb-modal.component.html',
  styleUrl: './bmb-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbModalComponent implements OnInit {
  svgUrl = 'assets/svg/';
  modalTemplate: TemplateRef<any> | null = null;

  public dialogRef: MatDialogRef<BmbModalComponent> = inject(MatDialogRef<BmbModalComponent>);
  public modalData: ModalDataConfig = inject(MAT_DIALOG_DATA);

  ngOnInit() {
    const data: ModalDataConfig = this.getData();
    if (typeof data.content !== 'string') {
      this.modalTemplate = data.content!;
    }
  }

  closeModal(buttonName: string, event: boolean) {
    const data = this.getData();

    if (buttonName === 'primary' && data.primaryAction) {
      data.primaryAction();
      return;
    } else if (buttonName === 'secondary' && data.secondaryAction) {
      data.secondaryAction();
      return;
    } else if (buttonName === 'close' && data.closeAction) {
      data.closeAction();
    }

    this.dialogRef.close(event);
  }

  isModalTemplate(): boolean {
    return !!this.modalTemplate;
  }

  getModalClasses(): string[] {
    const baseClassName = 'bmb_modal';
    const classNames: string[] = [baseClassName];

    if (this.getData().size) {
      return [...classNames, `${baseClassName}-size-${this.getData().size}`];
    }

    return classNames;
  }

  getDescriptionClasses(sectionName: string): string[] {
    const baseClassName = 'bmb_modal-content';
    const classNames: string[] = [`${baseClassName}-${sectionName}`];

    if (this.getData().scrollable) {
      return [...classNames, `${baseClassName}-scrollable`];
    }

    return classNames;
  }

  getButtonClass(isSecondaryButton: boolean): string[] {
    const data = this.getData();
    const footerClassName = 'bmb_modal-footer';
    const baseClassName = `${footerClassName}-button`;
    const classNames: string[] = [baseClassName];

    if (isSecondaryButton) {
      const newClassNames = [...classNames, `${footerClassName}-btn`];
      return [...newClassNames, `${baseClassName}-secondary_action`];
    }

    if (data.type === 'alert') {
      if (data.alertStyle) {
        return [...classNames, `${baseClassName}-${data.alertStyle}`];
      }
      return [...classNames, `${baseClassName}-neutral`];
    }

    return classNames;
  }

  getData(): ModalDataConfig {
    return this.modalData;
  }

  getImage(): string {
    const data: ModalDataConfig = this.getData();
    const alertStyle: string = data.alertStyle!;

    if (data.type === 'alert') {
      if (alertStyle) {
        return `${this.svgUrl}${alertStyle}_fill.svg`;
      }

      return `${this.svgUrl}neutral_fill.svg`;
    }

    return '';
  }

  getTitle(): string {
    return this.getData().title!;
  }

  getSubtitle(): string {
    return this.getData().subtitle!;
  }

  getContent(): any {
    if (this.isModalTemplate()) return this.modalTemplate;
    return this.getData().content;
  }

  getPrimaryBtnLabel(): string {
    return this.getData().primaryBtnLabel || 'OK';
  }

  getSecondaryBtnLabel(): string {
    return this.getData().secondaryBtnLabel!;
  }

  showFooter(): boolean {
    const hiddenButtons =
      this.getData().hidePrimaryButton && this.getData().hideSecondaryButton;
    return this.getData().type !== 'informative' && !hiddenButtons;
  }

  showPrimaryButton(): boolean {
    return !this.getData().hidePrimaryButton;
  }

  showSecondaryButton(): boolean {
    return !this.getData().hideSecondaryButton;
  }

  isSingleButton(): boolean {
    return (
      (this.showPrimaryButton() && !this.showSecondaryButton()) ||
      (!this.showPrimaryButton() && this.showSecondaryButton())
    );
  }

  extendButtons(): boolean {
    return !!this.getData().extendButtons;
  }
}
