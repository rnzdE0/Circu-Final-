import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationPopupComponent } from '../reservation-popup/reservation-popup.component';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss'
})
export class ReserveComponent {
  constructor(private dialog : MatDialog) {}

  openDialog() {
    this.dialog.open(ReservationPopupComponent, {
      width: '4000px',
      height: '800px',
    })
  };
}
