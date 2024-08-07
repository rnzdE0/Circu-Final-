import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private ds: MainService,
    private ref: MatDialogRef <PushComponent>,
    ) {
    console.log('Data received in dialog:', this.material);
  }

  online: any;

  submit(material: any, online: any) {

    const url = 'circulation/fromreserve/book/';

    // Assuming this.material contains the necessary data
    const {id, user_id, book_id, start_date, end_date, queue_position, fine} = this.material; 
    console.log('Extracted ID:', id);
    const payload = {
      id: material.id,
      user_id: user_id,
      book_id: book_id, 
      borrow_date: start_date,
      borrow_expiration: end_date,
      queue_position: queue_position,
      fine: fine
  
      // Add any other data you want to send here
    };
    console.log(this.material);
    // Use Angular HttpClient (this.ds.post) to send a POST request to your backend
    this.ds.put(url + this.material.id, payload).subscribe(
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
      iconColor: '#4F6F52',
      confirmButtonColor: '#4F6F52',
      customClass: {
        popup: 'my-swal-popup',
        icon: 'my-swal-icon',
        confirmButton: 'my-swal-confirm-button'
      }
    });
  

  }

//   updateBookStatus(success: any) {
//     if (success) {
//         Swal.fire({
//             width: 300,
//             title: "Book Borrowed!",
//             icon: "success",
//             iconColor: '#4F6F52',
//             confirmButtonColor: '#4F6F52',
//             customClass: {
//                 popup: 'my-swal-popup',
//                 icon: 'my-swal-icon',
//                 confirmButton: 'my-swal-confirm-button'
//             }
//         });
//     } else {
//         Swal.fire({
//             width: 300,
//             title: "Error!",
//             text: "Something went wrong. Please try again.",
//             icon: "error",
//             iconColor: '#F27474',
//             confirmButtonColor: '#F27474',
//             customClass: {
//                 popup: 'my-swal-popup',
//                 icon: 'my-swal-icon',
//                 confirmButton: 'my-swal-confirm-button'
//             }
//         });
//     }
// }

}