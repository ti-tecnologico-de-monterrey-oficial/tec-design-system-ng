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
    this.matDialog.open(BmbModalComponent, {
      data,
    })

  }


}
