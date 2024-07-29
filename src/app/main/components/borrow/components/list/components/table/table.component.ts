import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { PushPopupComponent } from '../push-popup/push-popup.component';
import { AuthService } from '../../../../../../../services/auth.service';
import { BorrowMaterial } from './borrow-material.model';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MainService } from '../../../../../../../services/main.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  displayedColumns: string[] = ['Email', 'Name', 'Department', 'Program', 'Book Title', 'Status', 'Fine', 'Actions'];
  dataSource = new MatTableDataSource<BorrowMaterial>();

  filteredMaterials: BorrowMaterial [] = [];
  borrowMaterials: BorrowMaterial [] = [];

  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  
  ngAfterViewInit(): void {
    this.fetchBorrowList();
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  } 

  applyFilter(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = searchValue;
  }
  

  fetchBorrowList(): void {
    this.isLoading = true;
    this.authService.getBorrowList().subscribe(
      (data: any) => {
        console.log('Received data from backend:', data);
        console.log('Type of data:', typeof data);
        this.borrowMaterials = data as BorrowMaterial[];
        this.filteredMaterials = this.borrowMaterials.slice();
        this.dataSource.data = this.borrowMaterials;
        this.dataSource.filterPredicate = (data: BorrowMaterial, filter: string) => {
          return data.name.toLowerCase().includes(filter) ||
                  data.email.toLowerCase().includes(filter) ||
                  data.title.toLowerCase().includes(filter) ||
                  data.user_id.toString().includes(filter); 
                //  ||
                //  data.department.toLowerCase().includes(filter) ||
                //  data.status.toLowerCase().includes(filter) ||
                //  data.fine.toLowerCase().includes(filter);
        };
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getStatusString(status: number): string {
    return status === 1 ? 'Borrowed' : 'Returned';
  }
  
  
elements: any;
   

  constructor(private dialog: MatDialog,
  private authService: AuthService,
  private router: Router,
  private ds: MainService,
  private cdr: ChangeDetectorRef,
    // private paginatorIntl :MatPaginatorIntl
  ) {
    // this.paginator = new MatPaginator(this.paginatorIntl, this.cdr);
  }

  redirectToListPage() {
    // this.router.navigate(['main/borrow/list/table']); 
    this.router.navigate(['main/borrow/list/table/table.component']); 
  }

  openDialog(data: any) {
    this.Editpopup(data, 'edit Popup', EditPopupComponent);
  }

  Editpopup(user_id: number, accession: string, component:any) {
    var _popup = this.dialog.open(component, {
      width: '55%',
      height: '760px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: user_id || accession
    });
    _popup.afterClosed().subscribe(result => {
      this.redirectToListPage();
      if(result === 'Changed Data') {
        this.fetchBorrowList()
      }
    });
  }

  deleteDialog(data: any) {
    this.Deletepopup(data, 'Delete Pop' , DeletePopupComponent)
  }

  Deletepopup(id: number, title: any, component:any) {
    var _popup = this.dialog.open(component, {
      width: '400px',
      height: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: id
    });
    _popup.afterClosed().subscribe(result => {
      // this.redirectToListPage();
      console.log(result)
      if(result === 'Changed Data') {
        this.fetchBorrowList()
      }
    });
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
      // this.redirectToListPage();
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



