import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../../../../../services/main.service';
import { PoliciesComponent } from '../policies/policies.component';
import { BlobOptions } from 'buffer';

@Component({
  selector: 'app-borrow-request',
  templateUrl: './borrow-request.component.html',
  styleUrl: './borrow-request.component.scss'
})
export class BorrowRequestComponent implements OnInit {
 
  borrowForm: FormGroup;
  [x: string]: any;
  data: any

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

  currentDate: string = '';
  patrons: any;
  fine = 0;
  hours_allowed: number = 0;
  checkbox: boolean = false;


  constructor(
    private dialog : MatDialog,
    private ds: MainService,
    private fb: FormBuilder, 
    private mainService: MainService ,
    private router: Router
  
  ) {
    this.borrowForm = this.fb.group({
      book_id: ["", Validators.required],
      user_id: ["", Validators.required],
      borrow_date: ["", Validators.required],
      borrow_expiration: ["", Validators.required],
      fine: ["", Validators.required],
    });
  }
 
  ngOnInit(): void {
  //  this.bookSubmit();
  this.setCurrentDate();
  console.log('User patron type:', this.user.patron);

    this.borrowForm.controls['borrow_date'].setValue(this.currentDate);

    const now = new Date();
    this.currentDate = now.toLocaleString('sv-SE');


    this.ds.get('circulation/getpatrons').subscribe({
      next: (res: any) => {
        console.log('Response from backend:', res);
        this.patrons = res;
        this.borrowForm.get('fine')?.setValue(res[0].fine);


        this.setHoursAllowed(this.user.patron);
        console.log('hours_allowed set in component:', this.hours_allowed);
      }
    }) 
  }

  redirectToBorrowForm() {
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
      this.redirectToBorrowForm();
    });
  }

  setHoursAllowed(patronType: string): void {
    const foundPatron = this.patrons.find((patron: any) => patron.patron === patronType);
    console.log('Found patron:', foundPatron); // Log the found patron object
    if (foundPatron) {
      this.hours_allowed = foundPatron.hours_allowed;
      console.log('hours_allowed set to:', this.hours_allowed); // Log the hours_allowed value being set
    } else {
      console.log('Patron not found for type:', patronType); // Log if patron not found
    }
  }
  setCurrentDate(): void {
    const today = new Date();
    const formattedDate = today.toISOString().replace('T', ' ').substring(0, 16);
    this.currentDate = formattedDate;
  }

  

  changePatron(event: Event) {
    let selectedPatronId = (event.target as HTMLInputElement).value;
    console.log('Selected patron ID:', selectedPatronId);
  
    // Find the selected patron from the patrons array
    const selectedPatron = this.patrons.find((patron: any) => patron.id == selectedPatronId);
  
    if (selectedPatron) {
      // Update the form values based on the selected patron
      this.borrowForm.get('fine')?.setValue(selectedPatron.fine);
      // Call setHoursAllowed with the patron type
      this.setHoursAllowed(selectedPatron.patron);
    } else {
      console.log('Patron not found for ID:', selectedPatronId);
    }
  }


  // for back

  name = sessionStorage.getItem('name');
  role = sessionStorage.getItem('role');

  getUser(event: Event) {
    let target = event.target as HTMLInputElement;
    this.ds.get('circulation/get-user/' + target.value).subscribe({
      next: (res: any) => {
        this.user.id=res.id;
        this.user.name=res.first_name+' '+res.last_name+' ';
        this.user.gender=res.gender;
        this.user.department=res.department;
        this.user.hours_allowed=res.hours_allowed;
        this.user.patron=res.patron;
        this.user.fine=res.fine;
        console.log(res)
      }
    })
    this.ds.get('circulation/get-user/'+target.value).subscribe({
      next: (res: any) => {
        this.user.count=res.count;
        console.log(res)
      }
    })
  }

  getAdmin(event: Event) {
    let target = event.target as HTMLInputElement;
    this.ds.get('circulation/get-admin/' + target.value).subscribe({
      next: (res: any) => {
        this.admin.id=res.id;
        this.admin.position=res.position; 
        console.log(res)
      }
    })
  }

    // this.admin.id=res.id;
    // this.admin.position=res.position; 

  // getBook(event: Event) {
  //   let target = event.target as HTMLInputElement;
  //   this.ds.get('circulation/get-book/' + target.value).subscribe({
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

  // Method to handle book retrieval
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

  

  logCheckboxState(event: Event) {
    console.log('Checkbox state:', this.checkbox);
    const inputElement = event.target as HTMLInputElement;
    this.checkbox = inputElement.checked;
  }


  bookSubmit(): void {
    if (!this.borrowForm.valid) {
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
  
    const payload = {
      book_id: this.borrowForm.value.book_id,
      user_id: this.borrowForm.value.user_id,
      borrow_date: this.borrowForm.value.borrow_date,
      borrow_expiration: this.borrowForm.value.borrow_expiration,
      fine: this.borrowForm.value.fine,
      isChecked: this.checkbox  // Use form control value
    };
    console.log("Sending borrow request:", payload);
  
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    this.mainService.post('circulation/borrow/book', payload).subscribe(
      response => {
        Swal.fire({
          title: 'Success',
          text: 'The borrow request has been submitted successfully.',
          icon: 'success',
          iconColor: '#4F6F52',
          confirmButtonColor: '#4F6F52'
        });
      },
      error => {
        console.log('Sending borrow request with payload:', payload);
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
