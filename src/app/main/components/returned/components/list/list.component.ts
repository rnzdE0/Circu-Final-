import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { AuthService } from '../../../../../services/auth.service';
import { List } from './list.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements AfterViewInit{
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

  displayedColumns: string[] = ['Borrower', 'Email', 'Department', 'Program', 'Book Title', 'Date Created', 'Date Returned', 'Status'];
  dataSource = new MatTableDataSource<List>();


  @ViewChild(MatPaginator) paginator: MatPaginator | null = null; // Type safety
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private paginatorIntl :MatPaginatorIntl  ) {
    this.paginator = new MatPaginator(this.paginatorIntl, this.cdr);
  }

  // returned: any[] = [];
  returned: List[] = [];
  isLoading = true;

  ngAfterViewInit(): void {
    this.fetchReturned();
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = searchValue;
  }

  // fetchReturned(): void{
  //   this.isLoading = true;
  //   this.authService.getReturned().subscribe(
  //     (data: any) => {
  //       console.log('Recieved data from backend', data);
  //       this.returned = data as List[];
  //       this.dataSource.data = this.returned;
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.filterPredicate = ( data: List, filter: string) => {
  //         return data.fname.toLowerCase().includes(filter) ||
  //         data.lname.toLowerCase().includes(filter) ||
  //         data.title.toLowerCase().includes(filter);
  //       };
  //       this.cdr.detectChanges();
  //       this.isLoading = false;
  //     }
  //   );
  // }

  // component.ts
fetchReturned(): void {
  this.isLoading = true;
  this.authService.getReturned().subscribe(
    (response: any) => {
      console.log('Received data from backend', response);
      this.returned = response.data; // Access the `data` property from the response
      this.dataSource.data = this.returned;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: List, filter: string) => {
        return data.fname.toLowerCase().includes(filter) ||
               data.lname.toLowerCase().includes(filter) ||
               data.title.toLowerCase().includes(filter);
      };
      this.cdr.detectChanges();
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching returned data', error);
      this.isLoading = false;
    }
  );
}


  onDepartmentChange(): void {
    this.selectedProgram = '';
  }

  // constructor(private dialog : MatDialog,
  // private authService: AuthService
  // ) {}

  // openEdit() {
  //   this.dialog.open(EditComponent, {
  //     width: '55%',
  //     height: '760px',
  //   })
  // };

  // deletePop() {
  //   this.dialog.open(DeletePopupComponent, {
  //     width: '400px',
  //     height: '250px',
  //   })
  // };
  
}
