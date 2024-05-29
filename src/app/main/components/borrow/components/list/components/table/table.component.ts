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

  searchTerm: string = '';
  filteredMaterials = [];
  borrowMaterials: any;
  dataSource: any=null;
  material: any;

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
  

  // filter

  // applyFilter(event: Event, type: string) {

  //   // get elements
  //   const selectDepartment = (document.getElementById('filter-department') as HTMLSelectElement).value;
  //   let selectProgram = (document.getElementById('filter-program') as HTMLSelectElement).value;
  //   const selectCategory = (document.getElementById('filter-category') as HTMLSelectElement).value;
  //   const search = (document.getElementById('search') as HTMLInputElement).value;
    
  //   // reset program filter upon department filter search
  //   if(type == 'department'){
  //     this.departmentFilter = selectDepartment;
  //     selectProgram = '';
  //   }

  //   const titleFilterPredicate = (data: Project, search: string): boolean => {
  //     return data.title.toLowerCase().trim().includes(search.toLowerCase().trim());
  //   } 

  //   const authorFilterPredicate = (data: Project, search: string): boolean => {
  //     return data.authors.some((x: any) => {
  //       return x.toLowerCase().trim().includes(search.toLowerCase().trim());
  //     });
  //   } 
    
  //   const departmentFilterPredicate = (data: Project, selectDepartment: string): boolean => {
  //     return data.program.department === selectDepartment || selectDepartment === '';
  //   }

  //   const programFilterPredicate = (data: Project, selectProgram: string): boolean => {
  //     return data.program.program === selectProgram || selectProgram === '';
  //   }

  //   const categoryFilterPredicate = (data: Project, selectCategory: string): boolean => {
  //     return data.category === selectCategory || selectCategory === '';
  //   }

  //   const filterPredicate = (data: Project): boolean => {
  //     return (titleFilterPredicate(data, search) || authorFilterPredicate(data, search)) &&
  //             departmentFilterPredicate(data, selectDepartment) &&
  //             programFilterPredicate(data, selectProgram) &&
  //             categoryFilterPredicate(data, selectCategory);
  //   };

  //   this.dataSource.filterPredicate = filterPredicate;
  //   this.dataSource.filter = {
  //     search, 
  //     selectDepartment, 
  //     selectProgram, 
  //     selectCategory
  //   };
  // }

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
  
  applySearch(): void {
    const searchTermUpper = this.searchTerm.toUpperCase();
    console.log('hello')

    this.filteredMaterials = this.borrowMaterials.filter((material: { user: { patron: { patron: string; }; id: string; first_name: any; last_name: any; program: { department: { department: string; }; program: string; }; }; book_id: string; status: string; fine: string; }) => {
      return (
        material.user.patron.patron.toUpperCase().includes(searchTermUpper) ||
        material.user.id.toUpperCase().includes(searchTermUpper) ||
        `${material.user.first_name} ${material.user.last_name}`.toUpperCase().includes(searchTermUpper) ||
        material.user.program.department.department.toUpperCase().includes(searchTermUpper) ||
        material.user.program.program.toUpperCase().includes(searchTermUpper) ||
        material.book_id.toUpperCase().includes(searchTermUpper) ||
        material.status.toUpperCase().includes(searchTermUpper) ||
        material.fine.toUpperCase().includes(searchTermUpper)
      );
    });
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


