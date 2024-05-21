import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


import Swal from 'sweetalert2'
import { privateDecrypt } from 'crypto';
import { url } from 'inspector';
import { MainService } from '../../../../../../../services/main.service';

@Component({
  selector: 'app-push-popup',
  templateUrl: './push-popup.component.html',
  styleUrl: './push-popup.component.scss'
})
export class PushPopupComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public material: any,
    private http: HttpClient,
    private ds: MainService
    ) {
      console.log('Data received in dialog:', this.material);
    }

  submit(id: number) {
    const url = 'return-book/'

    // Assuming you use Angular HttpClient to send PUT request to Laravel backend
    this.ds.put( url+this.material.id ,{}).subscribe(
      (response) => {
        console.log('Book marked as returned:', response);
        // Optionally handle success response
        this.updateBookStatus();
      },
      (error) => {
        console.error('Error marking book as returned:', error);
        // Optionally handle error
      })
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




  // submit(id: number) {
  //   Swal.fire({
  //     width: 300,
  //     title: "Book Returned!",
  //     icon: "success",
  //     confirmButtonColor: '#31A463',
  //     customClass: {
  //       popup: 'my-swal-popup',
  //       icon: 'my-swal-icon',
  //       confirmButton: 'my-swal-confirm-button'
  //     }
  //   }).then(() => {
  //     // After user confirms the Swal, send AJAX request to update book status
  //     this.updateBookStatus();
  //   });
  // }

  // // `api/return-book/${this.material}`
  
  // updateBookStatus() {
  //   const url = 'return-book/'

  //   // Assuming you use Angular HttpClient to send PUT request to Laravel backend
  //   this.ds.put( url+this.material ,{}).subscribe(
  //     (response) => {
  //       console.log('Book marked as returned:', response);
  //       // Optionally handle success response
  //     },
  //     (error) => {
  //       console.error('Error marking book as returned:', error);
  //       // Optionally handle error
  //     }
  //   );
  // }
// }
