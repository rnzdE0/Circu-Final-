import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPopupComponent } from '../user-popup/user-popup.component';

import { UserService } from '../../../../../user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'

})
export class UserTableComponent implements OnInit {

  userlist: any[] = [];
  
  constructor
  (
    private dialog : MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserList(); // Call loadUserList() when component is initialized
  }


  loadUserList(): void {
    this.userService.getUserList()
      .subscribe(
        (data) => {
          console.log('User list:', data); // Log the data
          this.userlist = data;
        },
        (error) => {
          console.error('Error fetching user list:', error);
        }
      );
  }


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
