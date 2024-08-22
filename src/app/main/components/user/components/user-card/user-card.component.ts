import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MainService } from '../../../../../services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {

  constructor (
    @Inject(MAT_DIALOG_DATA)
    public user: any,
    private http: HttpClient,
    private ds: MainService,
    private router: Router
  ) {}

  displayedColumns: string[] = [ 'borrow', 'ex', 'title', 'returned'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  totalReturnedBooks: number = 0;
  id: any;
  borrowedBooks: any;
  users: any
  isLoading = true;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.borrowedBooks);
    this.fetchUserDetails(this.user.id);
    this.fetchBorrowedBooks(this.user.id); 
    this.dataSource.paginator = this.paginator;
  }


  fetchUserDetails(userId: any): void {
    this.ds.get('circulation/get-user/' + userId).subscribe(
      (userDetails: any) => {
     
        // console.log('User details:', userDetails);
      
        this.user = userDetails;
      },
      (error) => {
        // console.error('Error fetching user details:', error);
      }
    );
  }

  fetchBorrowedBooks(userId: any): void {
    this.isLoading = true;
    this.ds.get('circulation/returned-list/' + userId).subscribe(
      (response: any) => {
  
        // console.log('returned details:', response);
  
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
              // console.warn('Item without material data:', item);
              return item; // or handle the missing material data case as needed
            }
          });
          this.totalReturnedBooks = response.totalReturnedBooks || 0; 
          this.dataSource = new MatTableDataSource(this.borrowedBooks);
          this.dataSource.paginator = this.paginator;

          this.isLoading = false;
        } else {
          // console.error('Invalid response format:', response);
        }
      },
      (error) => {
        // console.error('Error fetching borrowed books:', error);
      }
    );
  }

  getstatusString(status: number): string {
    return status === 1 ? 'Pending' : 'Returned';
  }

  // get totalPages(): number {
  //   return Math.ceil(this.borrowedBooks.length / this.itemsPerPage);
  // }

  // get startIndex(): number {
  //   return (this.currentPage - 1) * this.itemsPerPage;
  // }

  // get endIndex(): number {
  //   return Math.min(this.startIndex + this.itemsPerPage - 1, this.borrowedBooks.length - 1);
  // }

  // get displayedBooks(): any[] {
  //   console.log('Calculating displayed books...');
  //   return this.borrowedBooks.slice(this.startIndex, this.endIndex + 1);
  // }

  // previousPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //   }
  // }

  // nextPage(): void {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //   }
  // }

  // getPaginationSummary(): string {
  //   return `Page ${this.currentPage} of ${this.totalPages}`;
  // }

}
