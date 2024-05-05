import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPopupComponent } from '../user-popup/user-popup.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  
  constructor(private dialog : MatDialog) {}

  openUser() {
    this.dialog.open(UserPopupComponent, {
      width: '70%',
      height: '800px',
    })
  };

  // deleteDialog() {
  //   this.dialog.open(DeletePopupComponent, {
  //     width: '400px',
  //     height: '250px',
  //   })
  // };

  // pushDialog() {
  //   this.dialog.open(PushPopupComponent, {
  //     width: '400px',
  //     height: '250px',
  //   })
  // };
}
