import { Component } from '@angular/core';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-push-popup',
  templateUrl: './push-popup.component.html',
  styleUrl: './push-popup.component.scss'
})
export class PushPopupComponent {

  submit(){
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
    });
  }
}
