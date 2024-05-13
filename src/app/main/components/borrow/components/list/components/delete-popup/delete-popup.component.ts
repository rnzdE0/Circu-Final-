import { Component } from '@angular/core';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss'
})
export class DeletePopupComponent {

  submit(){
    Swal.fire({
      width: 300,
      title: "Archived!",
      icon: "success",
      confirmButtonColor: '#31A463',
      iconColor: 'red',
      customClass: {
        popup: 'my-swal-popup',
        icon: 'my-swal-icon',
        confirmButton: 'my-swal-confirm-button'
      }
    });
  }
}
