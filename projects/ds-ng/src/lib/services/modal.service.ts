import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BmbModalComponent } from '../../public-api';
import { ModalDataConfig } from '../components/bmb-modal/bmb-modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  
  constructor(
    private matDialog: MatDialog,
  ) {}

  public openModal(data: ModalDataConfig) {
    const dialogRef = this.matDialog.open(BmbModalComponent, {
      data,
    })

    dialogRef.afterClosed().subscribe((res) => {
      console.log('The dialog was close', res)
    })
  }


}
