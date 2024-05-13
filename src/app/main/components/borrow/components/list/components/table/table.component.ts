import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { PushPopupComponent } from '../push-popup/push-popup.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
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
  onDepartmentChange(): void {
    this.selectedProgram = '';
  }

  constructor(private dialog : MatDialog) {}

  openDialog() {
    this.dialog.open(EditPopupComponent, {
      width: '55%',
      height: '760px',
    })
  };

  deleteDialog() {
    this.dialog.open(DeletePopupComponent, {
      width: '400px',
      height: '250px',
    })
  };

  pushDialog() {
    this.dialog.open(PushPopupComponent, {
      width: '400px',
      height: '250px',
    })
  };
}
