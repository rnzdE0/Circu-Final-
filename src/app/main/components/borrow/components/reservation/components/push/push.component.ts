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
[x: string]: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public material: any,
    private http: HttpClient,
    private ds: MainService
    ) {
    console.log('Data received in dialog:', this.material);
  }

  online: any;

  submit(material: any, online: any) {

    const url = 'fromreserve/book/';

    // Assuming this.material contains the necessary data
    const { user_id, book_id, start_date, end_date, fine} = this.material; 
    const payload = {
      user_id: user_id,
      book_id: book_id, 
      start_date: start_date,
      end_date: end_date,
      fine: fine
  
      // Add any other data you want to send here
    };
    console.log(this.material);
    // Use Angular HttpClient (this.ds.post) to send a POST request to your backend
    this.ds.post(url + this.material.id, payload).subscribe(
      (response: any) => {
        console.log('Book borrowed successfully:', response);
        // Optionally handle success here, e.g., show a success message
        this.updateBookStatus();
      },
      (error: any) => {
        console.error('Error borrowing book:', error);
        // Optionally handle error here, e.g., show an error message
      }
    );
  }

  updateBookStatus () {
    Swal.fire({
      width: 300,
      title: "Book Borrowed!",
      icon: "success",
      confirmButtonColor: '#31A463',
      customClass: {
        popup: 'my-swal-popup',
        icon: 'my-swal-icon',
        confirmButton: 'my-swal-confirm-button'
      }
    })
  }}

