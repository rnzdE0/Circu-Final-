import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { QueueComponent } from '../queue/queue.component';

import Swal from 'sweetalert2'
import { MainService } from '../../../../../../../services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resform',
  templateUrl: './resform.component.html',
  styleUrl: './resform.component.scss'
})
export class ResformComponent implements OnInit {
  requestForm: FormGroup;
  [x: string]: any;

  user = {
    id: '',
    name: '',
    gender: '',
    department: ''
  }
  book = {
    accession: '',
    title: '',
    author: '',
    location: ''
  }
  admin: any;

  constructor(
    private dialog : MatDialog,
    private ds: MainService,
    private fb: FormBuilder, 
    private mainService: MainService 
  
  ) {
    this.requestForm = this.fb.group({
      book_id: ['', Validators.required],
      user_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      // fine: ['', Validators.required]
      
    });
  }

  ngOnInit(): void {
    //  this.bookSubmit();
    }

  name = sessionStorage.getItem('name');
  role = sessionStorage.getItem('role');

  getUser(event: Event) {
    let target = event.target as HTMLInputElement;
    this.ds.get('circulation/get-user/' + target.value).subscribe({
      next: (res: any) => {
        this.user.id=res.id;
        this.user.name=res.first_name+' '+res.last_name;
        this.user.department=res.program.department;
        this.user.gender=res.gender;
        console.log(res)
      }
    })
  }

  getBook(event: Event) {
    let target = event.target as HTMLInputElement;
    this.ds.get('circulation/get-book/' + 2).subscribe({
      next: (res: any) => {
        console.log(res)
        let authors = JSON.parse(res.authors);
        authors.forEach(((x:any,index:any) => {

          this.book.author=this.book.author+x;
          if(index != authors.length - 1)
            this.book.author = this.book.author+', ';
        }));
        this.book.title=res.title;
        this.book.location=res.location.location;
        
      },
      error:(err:any)=>console.log(err)
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

  reserveSubmit() {
    if (this.requestForm.valid) {
      console.log(this.requestForm.value)
      // 
      this.mainService.post('reserve/book',this.requestForm.value).subscribe(
        response => {
          console.log(response)
          Swal.fire({
            title: 'Success',
            text: 'The borrow request has been submitted successfully.',
            icon: 'success',
            confirmButtonColor: '#31A463'
          });
        },
        error => {
          console.error('Form submission error', error);
          Swal.fire({
            title: 'Error',
            text: 'There was an error submitting the form. Please try again.',
            icon: 'error',
            confirmButtonColor: '#31A463'
          });
        }
      );
    } else {
      console.log(this.requestForm.value)
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill out all required fields correctly.',
        icon: 'error',
        confirmButtonColor: '#31A463'
      });
    }
  }

  queueSubmit() {
    if (this.requestForm.valid) {
      console.log(this.requestForm.value)
      // mababago this if ever ng queue/book
      this.mainService.post('reserve/book',this.requestForm.value).subscribe(
        response => {
          console.log(response)
          Swal.fire({
            title: 'Success',
            text: 'The borrow request has been submitted successfully.',
            icon: 'success',
            confirmButtonColor: '#31A463'
          });
        },
        error => {
          console.error('Form submission error', error);
          Swal.fire({
            title: 'Error',
            text: 'There was an error submitting the form. Please try again.',
            icon: 'error',
            confirmButtonColor: '#31A463'
          });
        }
      );
    } else {
      console.log(this.requestForm.value)
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill out all required fields correctly.',
        icon: 'error',
        confirmButtonColor: '#31A463'
      });
    }
  }
}





















//   addDialog() {
//     this.dialog.open(AddComponent, {
//       width: '400px',
//       height: '250px',
//     })
//   };

//   queDialog() {
//     this.dialog.open(QueueComponent, {
//       width: '400px',
//       height: '250px',
//     })
//   };

//   addAlert() {
//     Swal.fire({
//       width: 400,
//       title: "Do you want to save this request?",
//       showDenyButton: true,
//       // showCancelButton: true,
//       confirmButtonText: "Yes",
//       confirmButtonColor: '#31A463',
//       denyButtonText: `Cancel Request`,
//       customClass: {
//         container: 'my-swal-container',
//         title: 'my-swal-title',
//         confirmButton: 'my-swal-confirm-button',
//         denyButton: 'my-swal-deny-button',
//         cancelButton: 'my-swal-cancel-button'
//       }
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           width: 300,
//           title: "Added to list.",
//           icon: "success",
//           confirmButtonColor: '#31A463',
//           customClass: {
//             popup: 'my-swal-popup',
//             icon: 'my-swal-icon',
//             confirmButton: 'my-swal-confirm-button'
//           }
//         });
//       } else if (result.isDenied) {
//         Swal.fire({
//           width: 300,
//           title: "Request is cancelled.",
//           icon: "success",
//           iconColor: 'red',
//           confirmButtonColor: 'grey',
//           customClass: {
//             popup: 'my-swal-popup',
//             icon: 'my-swal-icon',
//             confirmButton: 'my-swal-confirm-button'
//           }
//         });
//       }
//     });
//   }
  

//   queAlert() {
//     Swal.fire({
//       width: 400,
//       title: "Do you want to Queue this request?",
//       showDenyButton: true,
//       // showCancelButton: true,
//       confirmButtonText: "Yes",
//       confirmButtonColor: '#31A463',
//       denyButtonText: `Cancel Request`,
//       customClass: {
//         container: 'my-swal-container',
//         title: 'my-swal-title',
//         confirmButton: 'my-swal-confirm-button',
//         denyButton: 'my-swal-deny-button',
//         cancelButton: 'my-swal-cancel-button'
//       }
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           width: 300,
//           title: "Added to Queue.",
//           icon: "success",
//           confirmButtonColor: '#31A463',
//           customClass: {
//             popup: 'my-swal-popup',
//             icon: 'my-swal-icon',
//             confirmButton: 'my-swal-confirm-button'
//           }
//         });
//       } else if (result.isDenied) {
//         Swal.fire({
//           width: 300,
//           title: "Request Queue is cancelled.",
//           icon: "success",
//           iconColor: 'red',
//           confirmButtonColor: 'grey',
//           customClass: {
//             popup: 'my-swal-popup',
//             icon: 'my-swal-icon',
//             confirmButton: 'my-swal-confirm-button'
//           }
//         });
//       }
//     });
//   }
  

// }  
// // ngOnInit(): void {
// //     throw new Error('Method not implemented.');
  // }
