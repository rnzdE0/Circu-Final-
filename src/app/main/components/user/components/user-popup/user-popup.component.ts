  import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MainService } from '../../../../../services/main.service';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent implements OnInit{
  totalReturnedBooks: number = 0;
   users: any;
   id: any;
   borrowedBooks: any;

   constructor (
    @Inject(MAT_DIALOG_DATA) public user: any,
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
        // Log the user details received from the backend
        console.log('User details:', userDetails);
        // Assign the received user details to a separate property
        this.users = userDetails;
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
