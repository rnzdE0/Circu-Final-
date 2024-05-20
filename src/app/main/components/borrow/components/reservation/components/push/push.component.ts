import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MainService } from '../../../../../../../services/main.service';



@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrl: './push.component.scss'
})
export class PushComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public material: any,
    private http: HttpClient,
    private ds: MainService
    ) {
    console.log('Data received in dialog:', this.material);
  }

  submit(id: number) {

    const url = 'borrow/book/';

    // Assuming this.material contains the book ID
    const bookId = this.material; // Assuming 'id' is the property that holds the book ID

    // Use Angular HttpClient (this.ds.post) to send a POST request to your backend
    this.ds.post(url + bookId, {}).subscribe(
      (response: any) => {
        console.log('Book marked as returned:', response);
        this.updateBookStatus(); // Show success message
      },
      (error: any) => {
        console.error('Error marking book as returned:', error);
        // Optionally handle error here, e.g., show an error message
      }
);
  }

  updateBookStatus () {
    Swal.fire({
      width: 300,
      title: "Book Returned!",
      icon: "success",
      confirmButtonColor: '#31A463',
      customClass: {
        popup: 'my-swal-popup',
        icon: 'my-swal-icon',
        confirmButton: 'my-swal-confirm-button'
      }
    })
  }}

