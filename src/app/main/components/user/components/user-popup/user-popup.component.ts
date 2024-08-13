  import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MainService } from '../../../../../services/main.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user-table/user.model';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent implements OnInit{

  displayedColumns: string[] = [ 'Date', 'Book', 'Accession', 'Status'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  totalReturnedBooks: number = 0;
   id: any;
   borrowedBooks: any;
   users: any

   isLoading = true;

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
    this.dataSource = new MatTableDataSource(this.borrowedBooks);
    this.fetchUserDetails(this.user.id);
    this.fetchBorrowedBooks(this.user.id); 
    this.dataSource.paginator = this.paginator;
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

  
  // fetchBorrowedBooks(userId: any): void {
  //   this.ds.get('circulation/returned-list/' + userId).subscribe(
  //     (response: any) => {
  //       if (response && response.returnedItems && Array.isArray(response.returnedItems)) {
  //         this.borrowedBooks = response.returnedItems;
  //         this.totalReturnedBooks = response.totalReturnedBooks || 0; 
  //       } else {
  //         console.error('Invalid response format:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching borrowed books:', error);
  //     }
  //   );
  // }
  

  fetchBorrowedBooks(userId: any): void {
    this.isLoading = true;
    this.ds.get('circulation/returned-list/' + userId).subscribe(
      (response: any) => {
  
        console.log('returned details:', response);
  
        if (response && response.returnedItems && Array.isArray(response.returnedItems)) {
          // Process each returned item to ensure it includes the material data
          this.borrowedBooks = response.returnedItems.map((item: any) => {
            if (item.material) {
              return {
                ...item,
                title: item.material.title,
                authors: item.material.authors,
                publisher: item.material.publisher,
                // Add other material properties as needed
              };
            } else {
              console.warn('Item without material data:', item);
              return item; // or handle the missing material data case as needed
            }
          });
          this.totalReturnedBooks = response.totalReturnedBooks || 0; 
          this.dataSource = new MatTableDataSource(this.borrowedBooks);
          this.dataSource.paginator = this.paginator;

          this.isLoading = false;
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
