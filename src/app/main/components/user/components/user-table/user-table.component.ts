import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../../services/auth.service';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { Router } from '@angular/router';

import { User } from './user.model';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit{
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

  userList: any;
  user: any;
  dataSource: any;
  

  constructor(private dialog : MatDialog,
  private authService: AuthService,
  private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchUsers();
  }
  applyFilter(event: Event, type: string): void {
    const search = (document.getElementById('search') as HTMLInputElement).value;

    const idFilterPredicate = (data: User, search: string): boolean => {
      return data.id.toString().toLowerCase().trim().includes(search.toLowerCase().trim());
    };

    const authorFilterPredicate = (data: User, search: string): boolean => {
      return data.first_name.toLowerCase().trim().includes(search.toLowerCase().trim());
    };

    const programFilterPredicate = (data: User, selectProgram: string): boolean => {
      return data.program.program === selectProgram || selectProgram === '';
    };

    const filterPredicate = (data: User): boolean => {
      return (idFilterPredicate(data, search) || authorFilterPredicate(data, search)) &&
        programFilterPredicate(data, this.selectedProgram);
    };

    this.dataSource.filterPredicate = filterPredicate;
    this.dataSource.filter = search;  // This will trigger the filtering logic
    
  }

  













  fetchUsers(): void {
    this.authService.getUsers().subscribe(
      (data: any) => {
        console.log('Received data from backend:', data);
        console.log('Type of data:', typeof data);
        this.userList = data as User[]; // Assign the fetched user data to the users array
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }



  onDepartmentChange(): void {
    this.selectedProgram = '';
  }

  redirectToListPage() {
    this.router.navigate(['main/returned/user/user-table'])
  }

  openUser(data: any) {
    this.UserPopup( data, 'user pop', UserPopupComponent)
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
      if(result === 'Changed Data') {
        this.fetchUsers()
      }
    });
  }
 

  // openUser() {
  //   this.dialog.open(UserPopupComponent, {
  //     width: '55%',
  //     height: '565px',
  //   })
  // };

  // deleteDialog() {
  //   this.dialog.open(DeletePopupComponent, {
  //     width: '400px',
  //     height: '250px',
  //   })
  // };

  // pushDialog() {
  //   this.dialog.open(PushPopupComponent, {
  //     width: '400px',
  //     height: '250px',
  //   })
  // };
}

