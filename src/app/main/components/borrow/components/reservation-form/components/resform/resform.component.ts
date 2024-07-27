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
  currentDate: string = '';
  [x: string]: any;

  // user = {
  //   id: '',
  //   name: '',
  //   gender: '',
  //   department: '',
  //   program: {
  //     department_short: ''
  //   },
  //   patron: {
  //     hours_allowed: '',
  //     patron: '',
  //     fine: ''
  //   }
  // }
  // book = {
  //   accession: '',
  //   title: '',
  //   author: '',
  //   location: ''
  // }
  // admin: any;
  // patrons: any;
  // fine = 0;

  user = {
    id:'',
    patron:'',
    first_name: '',
    last_name: '',
    department: '',
    gender: '',
    books_allowed: '',
    fine: '',
    name: '',
    hours_allowed: '',
    count: 0,
  } 
  book = {
    accession: '',
    title: '',
    author: '',
    location: ''
  }
  admin = {
    id: '',
    position: ''
  }

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
    this.setCurrentDate();

    const now = new Date();
    this.currentDate = now.toLocaleString('sv-SE');
    this.requestForm.controls['start_date'].setValue(this.currentDate);

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
        // this.user.id=res.id;
        // this.user.name=res.first_name+' '+res.last_name;
        // this.user.program.department_short=res.program.department_short;
        // this.user.gender=res.gender;
        // this.user.patron.fine=res.patron.fine;
        // this.user.patron.patron=res.patron.patron
        // console.log(res)
        this.user.id=res.id;
        this.user.name=res.first_name+' '+res.last_name+' ';
        this.user.gender=res.gender;
        this.user.department=res.department;
        this.user.hours_allowed=res.hours_allowed;
        this.user.patron=res.patron;
        this.user.fine=res.fine;
      }
    })
  }

  // getBook(event: Event) {
  //   let target = event.target as HTMLInputElement;
  //   this.ds.get('circulation/get-book' + target.value).subscribe({
  //     next: (res: any) => {
  //       console.log(res)
  //       let authors = JSON.parse(res.authors);
  //       authors.forEach(((x:any,index:any) => {

  //         this.book.author=this.book.author+x;
  //         if(index != authors.length - 1)
  //           this.book.author = this.book.author+', ';
  //       }));
  //       this.book.title=res.title;
  //       this.book.location=res.location;
        
  //     },
  //     error:(err:any)=>console.log(err)
  //   })
  // }

  getBook(event: Event) {
    let target = event.target as HTMLInputElement;
    let query = target.value; // This will be either accession or title

    // Determine if the value should be treated as title or accession
    let isTitle = this.isTitle(query); // Use the method defined in the same class

    let url = 'circulation/get-book';
    let params = isTitle ? `?title=${encodeURIComponent(query)}` : `?accession=${encodeURIComponent(query)}`;

    this.ds.get(url + params).subscribe({
      next: (res: any) => {
        console.log(res);
        let authors = JSON.parse(res.authors);
        this.book.author = authors.join(', ');  // Join authors with comma and space
        this.book.title = res.title;
        this.book.location = res.location;
        this.book.accession = res.accession;
      },
      error: (err: any) => console.log(err)
    });
  }

  // Method to determine if the query is a title
  isTitle(query: string): boolean {
    // Implement logic to determine if the query is a title
    // Example: checking for spaces and a reasonable length for a title
    return query.includes(' ') && query.length > 10; // Adjust the condition as needed
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

  // setHoursAllowed(patronType: string): void {
  //   const foundPatron = this.patrons.find((patron: any) => patron.patron === patronType);
  //   console.log('Found patron:', foundPatron); 
  //   if (foundPatron) {
  //     this.hours_allowed = foundPatron.hours_allowed;
  //     console.log('hours_allowed set to:', this.hours_allowed); 
  //   } else {
  //     console.log('Patron not found for type:', patronType);
  //   }
  // }

  setCurrentDate(): void {
    const today = new Date();
    // this.currentDate = today.toISOString().substring(0, 10);
    const formattedDate = today.toISOString().replace('T', ' ').substring(0, 16);
    this.currentDate = formattedDate;
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



