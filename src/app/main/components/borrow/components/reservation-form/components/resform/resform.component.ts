import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { QueueComponent } from '../queue/queue.component';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-resform',
  templateUrl: './resform.component.html',
  styleUrl: './resform.component.scss'
})
export class ResformComponent {
  constructor(private dialog : MatDialog) {}

  addDialog() {
    this.dialog.open(AddComponent, {
      width: '400px',
      height: '250px',
    })
  };

  queDialog() {
    this.dialog.open(QueueComponent, {
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
      confirmButtonText: "Yes",
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

  queAlert() {
    Swal.fire({
      width: 400,
      title: "Do you want to Queue this request?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Yes",
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
          title: "Added to Queue.",
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
          title: "Request Queue is cancelled.",
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
