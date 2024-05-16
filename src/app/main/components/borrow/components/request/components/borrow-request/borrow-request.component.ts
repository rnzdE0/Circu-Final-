import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BorrowReserveComponent } from '../borrow-reserve/borrow-reserve.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../../../../../services/main.service';

@Component({
  selector: 'app-borrow-request',
  templateUrl: './borrow-request.component.html',
  styleUrl: './borrow-request.component.scss'
})
export class BorrowRequestComponent implements OnInit {
 
  borrowForm: FormGroup;
  [x: string]: any;
  // router: any;
  // navigateTo() {
  //   // Programmatically navigate to another route
  //   this.router.navigate(BorrowReserveComponent);
  // }

  user: any;
  book: any;
  admin: any;

  constructor(
    private dialog : MatDialog,
    private ds: MainService,
    private fb:FormBuilder, 
    private mainService: MainService 
  
  ) {
    this.borrowForm = this.fb.group({
      book_id: ['', Validators.required],
      // Other form controls go here, with their corresponding validators
      user_id: ['', Validators.required],
      borrow_date: ['', Validators.required],
      borrow_expiration: ['', Validators.required],
      fine: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {
    this.bookSubmit();
  }


  openDialog() {
    this.dialog.open(BorrowReserveComponent, {
      width: '400px',
      height: '250px',
    })
  };

  // submit() {
  //   console.log("hello renz")
  //   Swal.fire({
  //     width: 400,
  //     title: "Do you want to save this request?",
  //     showDenyButton: true,
  //     // showCancelButton: true,
  //     confirmButtonText: "Add",
  //     confirmButtonColor: '#31A463',
  //     denyButtonText: `Cancel Request`,
  //     customClass: {
  //       container: 'my-swal-container',
  //       title: 'my-swal-title',
  //       confirmButton: 'my-swal-confirm-button',
  //       denyButton: 'my-swal-deny-button',
  //       cancelButton: 'my-swal-cancel-button'
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         width: 300,
  //         title: "Added to list.",
  //         icon: "success",
  //         confirmButtonColor: '#31A463',
  //         customClass: {
  //           popup: 'my-swal-popup',
  //           icon: 'my-swal-icon',
  //           confirmButton: 'my-swal-confirm-button'
  //         }
  //       });
  //     } else if (result.isDenied) {
  //       Swal.fire({
  //         width: 300,
  //         title: "Request is cancelled.",
  //         icon: "success",
  //         iconColor: 'red',
  //         confirmButtonColor: 'grey',
  //         customClass: {
  //           popup: 'my-swal-popup',
  //           icon: 'my-swal-icon',
  //           confirmButton: 'my-swal-confirm-button'
  //         }
  //       });
  //     }
  //   });
  // }

  // for back

  name = sessionStorage.getItem('name');
  role = sessionStorage.getItem('role');

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

  bookSubmit() {
    if (this.borrowForm.valid) {
      this.mainService.submitBorrowForm(this.borrowForm.value).subscribe(
        response => {
          console.log('Form submission successful', response);
          // Handle successful response
        },
        error => {
          console.error('Form submission error', error);
          // Handle error response
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  }
  //   var form = document.getElementById('request-form') as HTMLFormElement;

  //   form.addEventListener('submit', (event) => {
  //     // Prevent the default form submission behavior
  //     event.preventDefault();

  //     let valid = true;
  //     let validFile = true;   
  //     const fields = [
  //       'user_id', 
  //       'book_id',
  //       'fine',
  //       'borrow_date',
  //       'borrow_expiration'
      
  //       ];
  
  //     // Get the form elements
  //     const elements = form.elements;

  //     let formData = new FormData();

  //     console.log(formData)
  
  //     // Loop through each form element
  //     for (let i = 0; i < elements.length; i++) {
  //       const element = elements[i] as HTMLInputElement;

  //       // Check if the element is an input field
  //       if (element.tagName === 'INPUT' || element.tagName === 'SELECT' && element.id !== 'submit') {
  //       }
  //     }

  //     // DATA IS VALID
  //     if(valid && validFile) {
  //       this.ds.post('borrow/book', formData).subscribe({
  //         next: (res: any) => {
  //           console.log('hello renze')
  //           Swal.fire({
  //             title: 'Success',
  //             text: formData.get('title') + " has been added successfully",
  //             icon: 'success',
  //             confirmButtonText: 'Close',
  //             confirmButtonColor: "#777777",
  //           });
  //         },
  //         error:(err: any) => {
  //           Swal.fire({
  //             title: 'Error',
  //             text: "Oops an error occured",
  //             icon: 'error',
  //             confirmButtonText: 'Close',
  //             confirmButtonColor: "#777777",
  //           });
  //         }
  //       });
  //     } else if (!validFile) {
  //       Swal.fire({
  //         title: 'Oops! Error on form',
  //         text: 'Invalid image. Must be of type png, jpeg, or jpg.',
  //         icon: 'error',
  //         confirmButtonText: 'Close',
  //         confirmButtonColor: "#777777",
  //       });
  //     } else {
  //       Swal.fire({
  //         title: 'Oops! Error on form',
  //         text: 'Please check if required fields have values',
  //         icon: 'error',
  //         confirmButtonText: 'Close',
  //         confirmButtonColor: "#777777",
  //       });
  //     }
  //   });
  // }


