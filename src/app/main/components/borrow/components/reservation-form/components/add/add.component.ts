import { Component } from '@angular/core';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

    addSucc() {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "This request has been Added!",
        showConfirmButton: false,
        timer: 1500,
        
      });
    }
}
