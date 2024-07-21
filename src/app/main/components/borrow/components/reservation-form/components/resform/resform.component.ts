import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { QueueComponent } from '../queue/queue.component';

import Swal from 'sweetalert2'
import { MainService } from '../../../../../../../services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoliciesComponent } from '../../../request/components/policies/policies.component';

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
    department: '',
    program: {
      department_short: ''
    },
    patron: {
      hours_allowed: '',
      patron: '',
      fine: ''
    }
  }
  book = {
    accession: '',
    title: '',
    author: '',
    location: ''
  }
  admin: any;
  patrons: any;
  fine = 0;
  checkbox: boolean = false;

  constructor(
    private dialog : MatDialog,
    private ds: MainService,
    private fb: FormBuilder, 
    private mainService: MainService,
    private router: Router
  
  ) {
    this.requestForm = this.fb.group({
      book_id: ['', Validators.required],
      user_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      fine: ['', Validators.required],
      // isChecked: [false, Validators.requiredTrue] 
    });
  }

  ngOnInit(): void {
    //  this.bookSubmit();
    this.ds.get('circulation/getpatrons').subscribe({
      next: (res: any) => {
        this.patrons = res;
        this.requestForm.get('fine')?.setValue(res[0].fine);
      }
    })
  }

  changePatron(event: Event) {
    let selectedPatronId = (event.target as HTMLInputElement).value;
    console.log('Selected patron ID:', selectedPatronId);
  
    // Find the selected patron from the patrons array
    const selectedPatron = this.patrons.find((patron: any) => patron.id == selectedPatronId);
  
    if (selectedPatron) {
      // Update the form values based on the selected patron
      this.requestForm.get('fine')?.setValue(selectedPatron.fine);
      // Call setHoursAllowed with the patron type
      // this.setHoursAllowed(selectedPatron.patron);
    } else {
      console.log('Patron not found for ID:', selectedPatronId);
    }
  }

  redirectToReserveForm() {
    this.router.navigate(['main/borrow/request/borrowrequest']); 
  }

  policyDialog(): void{
    const diaref = this.dialog.open(PoliciesComponent, {
      width: '900px',
      height: '650px',
      maxWidth: '900px',
      maxHeight: '650px',
    });
    diaref.afterClosed().subscribe(result => {
      this.redirectToReserveForm();
    });
  }

    

  name = sessionStorage.getItem('name');
  role = sessionStorage.getItem('role');

  getUser(event: Event) {
    let target = event.target as HTMLInputElement;
    this.ds.get('circulation/get-user/' + target.value).subscribe({
      next: (res: any) => {
        this.user.id=res.id;
        this.user.name=res.first_name+' '+res.last_name;
        this.user.program.department_short=res.program.department_short;
        this.user.gender=res.gender;
        this.user.patron.fine=res.patron.fine;
        this.user.patron.patron=res.patron.patron
        console.log(res)
      }
    })
  }

  getBook(event: Event) {
    let target = event.target as HTMLInputElement;
    this.ds.get('circulation/get-book/' + target.value).subscribe({
      next: (res: any) => {
        console.log(res)
        let authors = JSON.parse(res.authors);
        authors.forEach(((x:any,index:any) => {

          this.book.author=this.book.author+x;
          if(index != authors.length - 1)
            this.book.author = this.book.author+', ';
        }));
        this.book.title=res.title;
        this.book.location=res.location;
        
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

  logCheckboxState(event: Event) {
    console.log('Checkbox state:', this.checkbox);
    const inputElement = event.target as HTMLInputElement;
    this.checkbox = inputElement.checked;
  }

  reserveSubmit(): void {
    if (!this.requestForm.valid) {
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill out all required fields correctly.',
        icon: 'error',
        confirmButtonColor: '#4F6F52'
      });
      return;
    }

    console.log('isChecked during submit:', this.checkbox); // Debugging line
  
    if (!this.checkbox) { // Validate isChecked separately
      Swal.fire({
        title: 'Reminder',
        text: 'Please read and accept the Terms and Conditions before submitting.',
        icon: 'error',
        confirmButtonColor: '#4F6F52'
      });
      return;
    }
  
      const payloadData = {
        book_id: this.requestForm.value.book_id,
        user_id: this.requestForm.value.user_id,
        reserve_date: this.requestForm.value.start_date, 
        reserve_expiration: this.requestForm.value.end_date,
        fine: this.requestForm.value.fine,
        isChecked: this.checkbox
      };
      const requestData = {
        payload: JSON.stringify(payloadData)
      };
  
      console.log(this.requestForm.value);
      console.log('Payload Data:', payloadData);
  
      this.mainService.post('circulation/reserve/book', payloadData).subscribe(
        response => {
          console.log(response);
          Swal.fire({
            title: 'Success',
            text: 'The borrow request has been submitted successfully.',
            icon: 'success',
            iconColor: '#4F6F52',
            confirmButtonColor: '#4F6F52'
          });
        },
        error => {
          console.log('Sending borrow request with payload:', payloadData);
          console.error('Book is not available', error);
          Swal.fire({
            title: 'Book is Unavailable',
            text: 'The book you want to borrow is not available.',
            icon: 'error',
            confirmButtonColor: '#4F6F52'
          });
        }
      );
    } 
  }


//   queueSubmit() {
//     if (this.requestForm.valid) {
//       console.log(this.requestForm.value)
//       // mababago this if ever ng queue/book
//       this.mainService.post('queue/book',this.requestForm.value).subscribe(
//         response => {
//           console.log(response)
//           Swal.fire({
//             title: 'Success',
//             text: 'The borrow request has been submitted successfully.',
//             icon: 'success',
//             iconColor: '#4F6F52',
//             confirmButtonColor: '#4F6F52'
//           });
//         },
//         error => {
//           console.error('Form submission error', error);
//           Swal.fire({
//             title: 'Error',
//             text: 'There was an error submitting the form. Please try again.',
//             icon: 'error',
//             confirmButtonColor: '#31A463'
//           });
//         }
//       );
//     } else {
//       console.log(this.requestForm.value)
//       Swal.fire({
//         title: 'Invalid Form',
//         text: 'Function not yet Available. :)',
//         icon: 'error',
//         confirmButtonColor: '#31A463'
//       });
//     }
//   }
// }

