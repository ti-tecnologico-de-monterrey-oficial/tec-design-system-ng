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
import type { ModalDataConfig } from '../../_shared/types';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import {
  getModalButtonClass,
  getModalClasses,
  getModalDescriptionClasses,
  getModalImage,
  isModalSingleButton,
  showModalFooter,
  showModalPrimaryButton,
  showModalSecondaryButton,
} from '../../_shared/logic/components/modal';

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
    return getModalClasses(this.getData());
  }

  getDescriptionClasses(sectionName: string): string[] {
    return getModalDescriptionClasses(sectionName, this.getData());
  }

  getButtonClass(isSecondaryButton: boolean): string[] {
    return getModalButtonClass(isSecondaryButton, this.getData());
  }

  getData(): ModalDataConfig {
    return this.modalData;
  }

  getImage(): string {
    return getModalImage(this.svgUrl, this.getData());
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
    return showModalFooter(this.getData());
  }

  showPrimaryButton(): boolean {
    return showModalPrimaryButton(this.getData());
  }

  showSecondaryButton(): boolean {
    return showModalSecondaryButton(this.getData());
  }

  isSingleButton(): boolean {
    return isModalSingleButton(this.getData());
  }

  extendButtons(): boolean {
    return !!this.getData().extendButtons;
  }
}
