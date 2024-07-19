  import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MainService } from '../../../../../services/main.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent implements OnInit{

  displayedColumns: string[] = [ 'Date', 'Book', 'Accession', 'Status']
  dataSource = new MatTableDataSource();

  totalReturnedBooks: number = 0;
   id: any;
   borrowedBooks: any;
   users: any

  //  user = {
  //   id: '',
  //   name: '',
  //   gender: '',
  //   department: '',
  //   count:0,
  //   program: {
  //     department_short: ''
  //   },
  //   patron: {
  //     hours_allowed: '',
  //     patron: '',
  //     fine:''
  //   }
  // } 
  // book = {
  //   accession: '',
  //   title: '',
  //   author: '',
  //   location: ''
  // }
  // admin = {
  //   id: '',
  //   position: ''
  // }

   constructor (
    @Inject(MAT_DIALOG_DATA)
    public user: any,
    private http: HttpClient,
    private ds: MainService,
    private router: Router
   ) {
    console.log('Data is now injected', this.user.id)
   }

   ngOnInit(): void {
    this.fetchUserDetails(this.user.id);
    this.fetchBorrowedBooks(this.user.id); // Fetch user details using the passed id
  }

  fetchUserDetails(userId: any): void {
    this.ds.get('circulation/get-user/' + userId).subscribe(
      (userDetails: any) => {
     
        console.log('User details:', userDetails);
      
        this.user = userDetails;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  
  fetchBorrowedBooks(userId: any): void {
    this.ds.get('returned-list/' + userId).subscribe(
      (response: any) => {
        if (response && response.returnedItems && Array.isArray(response.returnedItems)) {
          this.borrowedBooks = response.returnedItems;
          this.totalReturnedBooks = response.totalReturnedBooks || 0; // Assign totalReturnedBooks or default to 0
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching borrowed books:', error);
      }
    );
  }
  

  getstatusString(status: number): string {
    return status === 1 ? 'Pending' : 'Returned';
  }

}
