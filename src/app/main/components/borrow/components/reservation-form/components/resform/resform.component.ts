import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { QueueComponent } from '../queue/queue.component';

import Swal from 'sweetalert2'
import { MainService } from '../../../../../../../services/main.service';

@Component({
  selector: 'app-resform',
  templateUrl: './resform.component.html',
  styleUrl: './resform.component.scss'
})
export class ResformComponent implements OnInit {
  constructor(
    private dialog : MatDialog,
    private ds: MainService
  ) {}
  [x: string]: any;
  
  user: any;
  book: any;
  admin: any;

  name = sessionStorage.getItem('name');
  role = sessionStorage.getItem('role');

  ngOnInit(): void {
    this.bookSubmit();
  }
  bookSubmit() {
    var form = document.getElementById('request-form') as HTMLFormElement;

    form.addEventListener('submit', (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();

      let valid = true;
      let validFile = true;
      const fields = [
        'user_id', 
        'book_id',
        'fine',
        'borrow_date',
        'borrow_expiration'
      
        ];
  
      // Get the form elements
      const elements = form.elements;

      let formData = new FormData();

      console.log(formData)
  
      // Loop through each form element
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement;

        // Check if the element is an input field
        if (element.tagName === 'INPUT' || element.tagName === 'SELECT' && element.id !== 'submit') {
        }
      }

      // DATA IS VALID
      if(valid && validFile) {
        this.ds.post('borrow/book', formData).subscribe({
          next: (res: any) => {
            console.log('hello renze')
            Swal.fire({
              title: 'Success',
              text: formData.get('title') + " has been added successfully",
              icon: 'success',
              confirmButtonText: 'Close',
              confirmButtonColor: "#777777",
            });
          },
          error:(err: any) => {
            Swal.fire({
              title: 'Error',
              text: "Oops an error occured",
              icon: 'error',
              confirmButtonText: 'Close',
              confirmButtonColor: "#777777",
            });
          }
        });
      } else if (!validFile) {
        Swal.fire({
          title: 'Oops! Error on form',
          text: 'Invalid image. Must be of type png, jpeg, or jpg.',
          icon: 'error',
          confirmButtonText: 'Close',
          confirmButtonColor: "#777777",
        });
      } else {
        Swal.fire({
          title: 'Oops! Error on form',
          text: 'Please check if required fields have values',
          icon: 'error',
          confirmButtonText: 'Close',
          confirmButtonColor: "#777777",
        });
      }
    });
  }
  getUser(event: Event) {
    let target = event.target as HTMLInputElement;
    this.ds.get('circulation/get-user/' + target.value).subscribe({
      next: (res: any) => {
        this.user = res;
        console.log(this.user)
      }
    })
  }

  getBook(event: Event) {
    let target = event.target as HTMLInputElement;
    this.ds.get('circulation/get-book/' + target.value).subscribe({
      next: (res: any) => {
        this.book = res;
        console.log(this.book)
      }
    })
  }

  getAdmin(event: Event) {
    let target = event.target as HTMLInputElement;
    this.ds.get('circulation/get-user/' + target.value).subscribe({
      next: (res: any) => {
        this.user = res;
        console.log(this.user)
      }
    })
  }

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
