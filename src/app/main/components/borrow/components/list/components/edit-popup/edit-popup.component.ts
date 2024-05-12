import { Component } from '@angular/core';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {

  saveAlert() {
    Swal.fire({
      width: 350,
      title: "Save modified details?",
      // showDenyButton: true,
      showCancelButton: true,
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
          title: "Details Updated!",
          icon: "success",
          confirmButtonColor: '#31A463',
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

