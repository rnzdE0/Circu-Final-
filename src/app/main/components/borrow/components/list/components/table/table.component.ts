import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { PushPopupComponent } from '../push-popup/push-popup.component';
import { AuthService } from '../../../../../../../services/auth.service';
import { BorrowMaterial } from './borrow-material.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  selectedDepartment: string = '';
  selectedProgram: string = '';
  selectedPatronType: string = '';
  selectedAllType: string = '';
  departments: string[] = ['CBA', 'CEAS', 'CCS', 'CHTM', 'CAHS'];
  secondFilterOptions: { [key: string]: string[] } = {
    CBA: ['BSA', 'BSCA', 'BSBA-FM', 'BSBA-HRM', 'BSBA-MKT'],
    CEAS: ['BEEd', 'BECEd', 'BSEd-E', 'BSEd-FIL', 'BSEd-M', 'BSEd-SCI', 'BSEd-SOC', 'BPEd', 'BCAEd', 'BACOM', 'TCP'],
    CCS: ['BSIT', 'BSCS', 'EMC', 'ACT'],
    CHTM: ['BSHM', 'BSTM'],
    CAHS: ['BSN', 'BSM', 'GM']
  };

  borrowMaterials: any[] = [];

  ngOnInit(): void {
    this.fetchBorrowList();
  }

  fetchBorrowList(): void {
    this.authService.getBorrowList().subscribe(
      (data: any) => {
        console.log('Received data from backend:', data);
        console.log('Type of data:', typeof data);
        this.borrowMaterials = data as BorrowMaterial[]; // Assign the fetched user data to the users array
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
elements: any;
   

  constructor(private dialog: MatDialog,
  private authService: AuthService
  ) {}

  openDialog() {
    this.dialog.open(EditPopupComponent, {
      width: '55%',
      height: '760px',
    });
  }

  deleteDialog() {
    this.dialog.open(DeletePopupComponent, {
      width: '400px',
      height: '250px',
    });
  }

  pushDialog() {
    this.dialog.open(PushPopupComponent, {
      width: '400px',
      height: '250px',
    });
  }

  // Implement the method to handle department change
  onDepartmentChange(): void {
    // Add your logic here
  }
}
