import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { BorrowReserveComponent } from '../borrow-reserve/borrow-reserve.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-borrow-request',
  templateUrl: './borrow-request.component.html',
  styleUrl: './borrow-request.component.scss'
})
export class BorrowRequestComponent {
  // router: any;
  // navigateTo() {
  //   // Programmatically navigate to another route
  //   this.router.navigate(BorrowReserveComponent);
  // }

  constructor(private dialog : MatDialog) {}


  openDialog() {
    this.dialog.open(BorrowReserveComponent, {
      width: '400px',
      height: '250px',
    })
  };

  addAlert() {
    Swal.fire({
      width: 400,
      title: "Do you want to save this request?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Add",
      confirmButtonColor: '#31A463',
      denyButtonText: `Cancel Request`,
      customClass: {
        container: 'my-swal-container',
        title: 'my-swal-title',
        confirmButton: 'my-swal-confirm-button',
        denyButton: 'my-swal-deny-button',
        cancelButton: 'my-swal-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          width: 300,
          title: "Added to list.",
          icon: "success",
          confirmButtonColor: '#31A463',
          customClass: {
            popup: 'my-swal-popup',
            icon: 'my-swal-icon',
            confirmButton: 'my-swal-confirm-button'
          }
        });
      } else if (result.isDenied) {
        Swal.fire({
          width: 300,
          title: "Request is cancelled.",
          icon: "success",
          iconColor: 'red',
          confirmButtonColor: 'grey',
          customClass: {
            popup: 'my-swal-popup',
            icon: 'my-swal-icon',
            confirmButton: 'my-swal-confirm-button'
          }
        });
      }
    });
  }

}

