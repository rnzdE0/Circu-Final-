import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPopupComponent } from '../user-popup/user-popup.component';

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
  onDepartmentChange(): void {
    this.selectedProgram = '';
  }

  constructor(private dialog : MatDialog) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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

