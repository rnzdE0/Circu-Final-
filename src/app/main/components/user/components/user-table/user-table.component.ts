import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../../services/auth.service';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { Router } from '@angular/router';
import { User } from './user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  userList: User[] = [];
  filteredUserList: User[] = [];

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  applyFilter(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (!searchValue) {
      this.filteredUserList = this.userList.slice(); // Reset filter
      return;
    }
    this.filteredUserList = this.userList.filter(user =>
      user.first_name.toLowerCase().includes(searchValue) ||
      user.last_name.toLowerCase().includes(searchValue) ||
      user.patron.patron.toLowerCase().includes(searchValue) ||
      user.program.department.department.toLowerCase().includes(searchValue) ||
      user.program.program.toLowerCase().includes(searchValue)
    );
  }

  fetchUsers(): void {
    this.authService.getUsers().subscribe(
      (data: any) => {
        console.log('Received data from backend:', data);
        console.log('Type of data:', typeof data);
        this.userList = data as User[]; // Assign the fetched user data to the users array
        this.filteredUserList = this.userList.slice(); // Initialize filteredUserList with all users
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getGenderString(gender: number): string {
    return gender === 1 ? 'Male' : 'Female';
  }

  redirectToListPage() {
    this.router.navigate(['main/returned/user/user-table'])
  }

  openUser(data: any) {
    this.UserPopup(data, 'user pop', UserPopupComponent)
  }

  UserPopup(id: number, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '55%',
      height: '760px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: id
    });
    _popup.afterClosed().subscribe(result => {
      this.redirectToListPage();
      if (result === 'Changed Data') {
        this.fetchUsers()
      }
    });
  }
}
