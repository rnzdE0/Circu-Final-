import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { PushPopupComponent } from '../push-popup/push-popup.component';
import { AuthService } from '../../../../../../../services/auth.service';
import { BorrowMaterial } from './borrow-material.model';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MainService } from '../../../../../../../services/main.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  filteredMaterials: BorrowMaterial[] = [];
  borrowMaterials: BorrowMaterial [] = [];
  

   // Variables for paginator
   totalLength = 100; // total number of items
   pageSize = 10; // default page size
   pageEvent: PageEvent = new PageEvent;

   handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    console.log('Current page index: ', event.pageIndex);
    console.log('Page size: ', event.pageSize);
    // You can add more logic here to fetch data based on the current page
  }
  

  ngOnInit(): void {
    this.fetchBorrowList();
    
  }

  applyFilter(event: Event): void {
    console.log('Filtering...');
    const searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    console.log('Search value:', searchValue);
    if (!searchValue) {
      this.filteredMaterials = this.borrowMaterials.slice(); // Reset filter
      return;
    }
    this.filteredMaterials = this.borrowMaterials.filter(material =>
      material.user.first_name.toLowerCase().includes(searchValue) ||
      material.user.last_name.toLowerCase().includes(searchValue) ||
      material.user.patron.patron.toLowerCase().includes(searchValue) ||
      material.user.program.department.department.toLowerCase().includes(searchValue) ||
      material.user.program.program.toLowerCase().includes(searchValue)
    );
  }
  

  fetchBorrowList(): void {
    this.authService.getBorrowList().subscribe(
      (data: any) => {
        console.log('Received data from backend:', data);
        console.log('Type of data:', typeof data);
        this.borrowMaterials = data as BorrowMaterial[]; // Assign the fetched user data to the users array
        this.filteredMaterials = this.borrowMaterials.slice();
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
  private ds: MainService
  ) {}

  redirectToListPage() {
    this.router.navigate(['main/borrow/list/table']); 
  }

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
      this.redirectToListPage();
      console.log(result)
      if(result === 'Changed Data') {
        this.fetchBorrowList()
      }
    });
  }
  

  // pushDialog(id: number) {
  //   this.dialog.open(PushPopupComponent, {
  //     width: '400px',
  //     height: '250px',
  //     data: id
  //   });
  // }


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


  // onProgramChange(): void {
  //   this.applyfilter();
  // }

  // onPatronTypeChange(): void {
  //   this.applyfilter();
  // }

  // onAllTypeChange(): void {
  //   this.applyfilter();
  // }
}

// for search


