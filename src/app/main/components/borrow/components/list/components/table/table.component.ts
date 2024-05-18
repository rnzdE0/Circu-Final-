import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { PushPopupComponent } from '../push-popup/push-popup.component';
import { AuthService } from '../../../../../../../services/auth.service';
import { BorrowMaterial } from './borrow-material.model';
import { Router } from '@angular/router';


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

  borrowMaterials: any;
  dataSource: any=null;
  material: any;

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
  private authService: AuthService,
  private router: Router
  ) {}

  openDialog(data: any) {
    this.Editpopup(data, 'edit Popup', EditPopupComponent);
  }

  Editpopup(id: number, title: any, component:any) {
    var _popup = this.dialog.open(component, {
      width: '55%',
      height: '760px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: id
    });
    _popup.afterClosed().subscribe(result => {
      this.redirectToListPage();
      if(result === 'Changed Data') {
        this.fetchBorrowList()
      }
    });
  }

  deleteDialog() {
    this.dialog.open(DeletePopupComponent, {
      width: '400px',
      height: '250px',
    });
  }

  // pushDialog(id: number) {
  //   this.dialog.open(PushPopupComponent, {
  //     width: '400px',
  //     height: '250px',
  //     data: id
  //   });
  // }

  redirectToListPage() {
    this.router.navigate(['main/borrow/list/table']); 
  }

  pushDialog(data: any) {
    this.Openpopup(data, 'Push Popup', PushPopupComponent);
  }

  Openpopup(id: number, title: any, component:any) {
    var _popup = this.dialog.open(component, {
      width: '400px',
      height: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: id
    });
    _popup.afterClosed().subscribe(result => {
      this.redirectToListPage();
      if(result === 'Changed Data') {
        this.fetchBorrowList()
      }
    });
  }
  getData() {
    throw new Error('Method not implemented.');
  }

  // Implement the method to handle department change
  onDepartmentChange(): void {
    // Add your logic here
  }
}
