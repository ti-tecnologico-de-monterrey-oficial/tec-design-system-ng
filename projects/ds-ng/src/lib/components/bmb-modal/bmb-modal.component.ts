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
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { ModalService } from '../../services/modal.service';
import {
  BmbHeaderSectionComponent,
  IBmbHeaderAction,
} from '../bmb-header-section/bmb-header-section.component';

export type IBmbModalSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'bmb-modal',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbButtonDirective,
    BmbHeaderSectionComponent,
  ],
  templateUrl: './bmb-modal.component.html',
  providers: [MatDialog, ModalService],
  styleUrl: './bmb-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbModalComponent {
  svgUrl: string = '../../../assets/svg/';
  btnColor: any = 'bmb_modal-btn-main';
  isTemplate: boolean = false;
  modalTemplate: TemplateRef<any> | null = null;
  headerActions: IBmbHeaderAction[] = [
    {
      icon: 'close',
      action: () => {},
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<BmbModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: ModalDataConfig,
  ) {}

  ngOnInit() {
    this.setConfig(this.modalData);
  }

  actionFunction() {
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

  getButtonClass(alertStyle: string): string {
    if (!!alertStyle) {
      return `bmb_modal-btn-${alertStyle}`;
    }

    return 'bmb_modal-btn-primary';
  }

  setConfig(data: ModalDataConfig) {
    if (data.type == 'alert') {
      this.btnColor = this.getButtonClass(data.alertStyle!);
      this.setImage(data.alertStyle!);
    }

    if (typeof data.content !== 'string') {
      this.modalTemplate = data.content!;
      this.isTemplate = true;
    }
  }

  setImage(alertStyle: string) {
    if ('primary') return `${this.svgUrl}info_fill_${alertStyle}.svg`;
    if ('neutral') return `${this.svgUrl}info_fill.svg`;
    if (
      alertStyle === 'error' ||
      alertStyle === 'event' ||
      alertStyle === 'success' ||
      alertStyle === 'warning'
    )
      return `${this.svgUrl}${alertStyle}_fill.svg`;

    return `${this.svgUrl}info_fill.svg`;
  }
}
