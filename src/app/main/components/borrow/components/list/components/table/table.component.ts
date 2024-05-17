import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { PushPopupComponent } from '../push-popup/push-popup.component';
import { MainService } from '../../../../../../../services/main.service';

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
  elements: any;
  // element: Object | undefined;

  constructor(
    private dialog: MatDialog, 
    private http: HttpClient,
    private ds: MainService
  ) {}

  // test

  ngOnInit(): void {
    this.loadBorrowList(); // Call loadUserList() when component is initialized
  }


  loadBorrowList(): void {
    this.ds.get('borrow-list')
      .subscribe(
        (data) => {
          console.log('User list:', data); // Log the data
          this.elements = data;
        },
        (error) => {
          console.error('Error fetching user list:', error);
        }
      );
  }


  // ngOnInit(): void {
  //   // Fetch elements when the component initializes
  // }

  // fetchElements(targetValue: string): void {
  //   // Make HTTP GET request to fetch elements from the backend API
  //   this.http.get<any[]>('/borrow-list')
  //     .subscribe(
  //       (response: any[]) => {
  //         this.elements = response;
  //         console.log('tite')
  //         // Assign fetched elements to the array
  //       },
  //       (error) => {
  //         console.error('Error fetching elements:', error);
  //       }
  //     );
  // }

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
