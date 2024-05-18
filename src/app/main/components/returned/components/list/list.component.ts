import { Component } from '@angular/core';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { AuthService } from '../../../../../services/auth.service';
import { List } from './list.model';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
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

  returned: any[] = [];

  ngOnInit(): void{
    this.fetchReturned();
  }

  fetchReturned(): void{
    this.authService.getReturned().subscribe(
      (data: any) => {
        console.log('Recieved data from backend', data);
        this.returned = data as List[];
      }
    )
  }

  onDepartmentChange(): void {
    this.selectedProgram = '';
  }
  constructor(private dialog : MatDialog,
  private authService: AuthService
  ) {}

  openEdit() {
    this.dialog.open(EditComponent, {
      width: '55%',
      height: '760px',
    })
  };

  deletePop() {
    this.dialog.open(DeletePopupComponent, {
      width: '400px',
      height: '250px',
    })
  };
  
}
