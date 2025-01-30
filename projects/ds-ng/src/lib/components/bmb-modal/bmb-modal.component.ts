import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ModalDataConfig } from './bmb-modal.interface';
import { BmbButtonDirective } from '../../directives/button.directive';
import { ModalService } from '../../services/modal.service';
import { IBmbActionHeader } from '../../types';
import { BmbThreeColsComponent } from '../bmb-three-cols/bmb-three-cols.component';
import { BmbTitleContentComponent } from '../bmb-title-content/bmb-title-content.component';
import { BmbNavigationIconComponent } from '../bmb-navigation-bar/bmb-navigation-icon/bmb-navigation-icon.component';

@Component({
  selector: 'bmb-modal',
  standalone: true,
  imports: [
    CommonModule,
    BmbThreeColsComponent,
    BmbTitleContentComponent,
    BmbNavigationIconComponent,
    BmbButtonDirective,
  ],
  providers: [MatDialog, ModalService],
  templateUrl: './bmb-modal.component.html',
  styleUrl: './bmb-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbModalComponent {
  svgUrl: string = 'assets/svg/';
  modalTemplate: TemplateRef<any> | null = null;

  constructor(
    public dialogRef: MatDialogRef<BmbModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: ModalDataConfig,
  ) {}

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
    }

    if (buttonName === 'secondary' && data.secondaryAction) {
      data.secondaryAction();
      return;
    }

    this.dialogRef.close(event);
  }

  isModalTemplate(): boolean {
    return !!this.modalTemplate;
  }

  getModalClasses(): string[] {
    const baseClassName: string = 'bmb_modal';
    const classNames: string[] = [baseClassName];

    if (!!this.getData().size) {
      return [...classNames, `${baseClassName}-size-${this.getData().size}`];
    }

    return classNames;
  }

  getDescriptionClasses(sectionName: string): string[] {
    const baseClassName: string = 'bmb_modal-content';
    const classNames: string[] = [`${baseClassName}-${sectionName}`];

    if (!!this.getData().scrollable) {
      return [...classNames, `${baseClassName}-scrollable`];
    }

    return classNames;
  }

  getButtonClass(isSecondaryButton: boolean): string[] {
    const data: ModalDataConfig = this.getData();
    const footerClassName: string = 'bmb_modal-footer';
    const baseClassName: string = `${footerClassName}-button`;
    const classNames: string[] = [baseClassName];

    if (isSecondaryButton) {
      const newClassNames = [...classNames, `${footerClassName}-btn`];
      return [...newClassNames, `${baseClassName}-secondary_action`];
    }

    if (data.type === 'alert') {
      if (!!data.alertStyle) {
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
      if (alertStyle === 'primary') {
        return `${this.svgUrl}info_fill_${alertStyle}.svg`;
      }
      if (alertStyle === 'neutral') return `${this.svgUrl}info_fill.svg`;
      if (
        alertStyle === 'error' ||
        alertStyle === 'event' ||
        alertStyle === 'success' ||
        alertStyle === 'warning'
      )
        return `${this.svgUrl}${alertStyle}_fill.svg`;

      return `${this.svgUrl}info_fill.svg`;
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
    return this.getData().type !== 'informative';
  }

  showPrimaryButton(): boolean {
    return !this.getData().hidePrimaryButton;
  }

  showSecondaryButton(): boolean {
    const data = this.getData();
    return (data.type && data.type !== 'action') || !!data.secondaryBtnLabel;
  }
}
