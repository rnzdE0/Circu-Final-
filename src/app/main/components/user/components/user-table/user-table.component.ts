import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../../services/auth.service';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { Router } from '@angular/router';
import { User } from './user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingComponent } from '../../../loading/loading.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['Name', 'Gender', 'Email', 'Department', 'Program', 'Action'];
  dataSource = new MatTableDataSource<User>();
  userList: User[] = [];
  filteredUserList: User[] = [];
  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null; // Type safety

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { 
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchUsers();
    this.cdr.detectChanges();
  }

  applyFilter(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = searchValue;
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.authService.getUsers().subscribe(
      (data: any) => {
        console.log('Received data from backend:', data);
        console.log('Type of data:', typeof data);
        this.userList = data as User[]; // Assign the fetched user data to the users array
        this.dataSource.data = this.userList; // Initialize filteredUserList with all users
        this.dataSource.filterPredicate = ( data: User, filter: string ) => {
          const user = data;
          return user.first_name.toLowerCase().includes(filter) ||
          user.last_name.toLowerCase().includes(filter) ||
          // user.program.department.department.toLowerCase().includes(filter) ||
          // user.program.program.toLowerCase().includes(filter) ||
          // user.program.department_short.toLowerCase().includes(filter) ||
          // user.program.program_short.toLowerCase().includes(filter) ||
          user.id.toString().includes(filter) 
        }
      }
    )
  }

  getGenderString(gender: number): string {
    return gender === 1 ? 'Male' : 'Female';
  }

  redirectToListPage() {
    this.router.navigate(['main/returned/user/user-table'])
  }

  openUser(data: any) {
    this.UserPopup(data, 'user pop', UserPopupComponent)
  }

  UserPopup(id: number, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '55%',
      height: '760px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: id
    });
    _popup.afterClosed().subscribe(result => {
      this.redirectToListPage();
      if (result === 'Changed Data') {
        this.fetchUsers()
      }
    });
  }
}
