import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationPopupComponent } from '../reservation-popup/reservation-popup.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss'
})
export class ReserveComponent {
  constructor(private dialog : MatDialog) {}

  openDialog() {
    this.dialog.open(ReservationPopupComponent, {
      width: '55%',
      height: '760px',
    })
  };

  deleteDialog() {
    this.dialog.open(DeleteComponent, {
      width: '400px',
      height: '250px',
    })
  };
}
