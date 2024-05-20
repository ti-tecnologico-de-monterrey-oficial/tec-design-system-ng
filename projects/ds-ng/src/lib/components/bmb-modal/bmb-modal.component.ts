import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ModalDataConfig } from './bmb-modal.interface';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';

@Component({
  selector: 'bmb-modal',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, BmbButtonDirective],
  templateUrl: './bmb-modal.component.html',
  providers: [ MatDialog ],
  styleUrl: './bmb-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BmbModalComponent implements OnInit{

  svgUrl: string = "../../../assets/svg/"
  btnColor: any = 'bmb_modal-btn-main';

  constructor(
    public dialogRef: MatDialogRef<BmbModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: ModalDataConfig,
  ) {
  }

  ngOnInit() { 
    this.setConfig(this.modalData)
  }

  actionFunction() {
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

  setConfig(data:ModalDataConfig){
    if(data.type == 'alert'){
      this.setBtnStyle(data.alertStyle!)
    }
  }

  setBtnStyle(alertStyle: string){
    switch (alertStyle) {
      case 'primary':
        this.svgUrl = this.svgUrl + 'info_fill_primary.svg'
        this.btnColor = 'bmb_modal-btn-primary'
        break;
      case 'neutral':
        this.svgUrl = this.svgUrl + 'info_fill.svg'
        this.btnColor = 'bmb_modal-btn-neutral'
        break;
      case 'error':
        this.svgUrl = this.svgUrl + 'error_fill.svg'
        this.btnColor = 'bmb_modal-btn-error'
        break;
      case 'event':
        this.svgUrl = this.svgUrl + 'event_fill.svg'
        this.btnColor = 'bmb_modal-btn-event'
        break;   
      case 'success':
        this.svgUrl = this.svgUrl + 'success_fill.svg'
        this.btnColor = 'bmb_modal-btn-success'
        break;
      case 'warning':
        this.svgUrl = this.svgUrl + 'warning_fill.svg'
        this.btnColor = 'bmb_modal-btn-warning'
        break;
      default:
        this.svgUrl = this.svgUrl + 'info_fill.svg'
        this.btnColor = 'bmb_modal-btn-primary'
        break;
    }
  }
}
