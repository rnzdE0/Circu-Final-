import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../../../../../services/main.service';
import { PoliciesComponent } from '../policies/policies.component';

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
      isChecked: [false, Validators.requiredTrue]
    });
  }
 
  ngOnInit(): void {
  //  this.bookSubmit();
  this.setCurrentDate();
  console.log('User patron type:', this.user.patron);

  // Initialize borrow_date with the current date
  this.borrowForm.controls['borrow_date'].setValue(this.currentDate);

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
    // this.currentDate = today.toISOString().substring(0, 10);
    const formattedDate = today.toISOString().replace('T', ' ').substring(0, 19);
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

  


  bookSubmit() {
    if (this.borrowForm.valid) {
      const payload = {
      book_id: this.borrowForm.value.book_id,
      user_id: this.borrowForm.value.user_id,
      borrow_date: this.borrowForm.value.borrow_date,
      borrow_expiration: this.borrowForm.value.borrow_expiration,
      fine: this.borrowForm.value.fine,
      isChecked: this.borrowForm.value.isChecked
    };
    console.log("Sending borrow request sadsdasd:", payload)

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    
      this.mainService.post('circulation/borrow/book',payload).subscribe(
        response => {
          Swal.fire({
            title: 'Success',
            text: 'The borrow request has been submitted successfully.',
            icon: 'success',
            confirmButtonColor: '#31A463'
          });
        },
        error => {
          console.log('Sending borrow request with payload:', payload);
          console.error('Book is not available', error);
          Swal.fire({
            title: 'Book is Unavailable',
            text: 'The book you want to borrow is not available.',
            icon: 'error',
            confirmButtonColor: '#31A463'
          });
        }
      );
    } else {
      console.log(this.borrowForm.value)
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill out all required fields correctly.',
        icon: 'error',
        confirmButtonColor: '#31A463'
      });
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

}