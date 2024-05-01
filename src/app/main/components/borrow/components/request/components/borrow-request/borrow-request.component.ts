import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { BorrowReserveComponent } from '../borrow-reserve/borrow-reserve.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-borrow-request',
  templateUrl: './borrow-request.component.html',
  styleUrl: './borrow-request.component.scss'
})
export class BorrowRequestComponent {
  // router: any;
  // navigateTo() {
  //   // Programmatically navigate to another route
  //   this.router.navigate(BorrowReserveComponent);
  // }

  constructor(private dialog : MatDialog) {}

  openDialog() {
    this.dialog.open(BorrowReserveComponent, {
      width: '70%',
      height: '800px',
    })
  };
}
