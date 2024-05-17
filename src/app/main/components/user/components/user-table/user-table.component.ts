import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../../services/auth.service';
import { UserPopupComponent } from '../user-popup/user-popup.component';

import { User } from './user.model';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit{
  selectedDepartment: string = '';
  selectedProgram: string = '';
  selectedPatronType: string = '';
  departments: string[] = ['CBA', 'CEAS', 'CCS', 'CHTM', 'CAHS'];
  secondFilterOptions: { [key: string]: string[] } = {
    CBA: ['BSA', 'BSCA', 'BSBA-FM', 'BSBA-HRM', 'BSBA-MKT'],
    CEAS: ['BEEd', 'BECEd', 'BSEd-E', 'BSEd-FIL', 'BSEd-M', 'BSEd-SCI', 'BSEd-SOC', 'BPEd', 'BCAEd', 'BACOM', 'TCP'],
    CCS: ['BSIT', 'BSCS', 'EMC', 'ACT'],
    CHTM: ['BSHM', 'BSTM'],
    CAHS: ['BSN', 'BSM', 'GM']
  };

  users: any[] = [];

  constructor(private dialog : MatDialog,
  private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.getUsers().subscribe(
      (data: any) => {
        console.log('Received data from backend:', data);
        console.log('Type of data:', typeof data);
        this.users = data as User[]; // Assign the fetched user data to the users array
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onDepartmentChange(): void {
    this.selectedProgram = '';
  }
  openUser() {
    this.dialog.open(UserPopupComponent, {
      width: '55%',
      height: '565px',
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

