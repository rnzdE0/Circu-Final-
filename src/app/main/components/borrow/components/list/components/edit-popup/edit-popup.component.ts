import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2'
import { MainService } from '../../../../../../../services/main.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent implements OnInit{

  borrow: any;
  isLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public material: any,
    private http: HttpClient,
    private ds: MainService,
    private router: Router
  ) {
    // console.log('Data received in dialog:', this.material);
  }

  ngOnInit(): void {
    this.ds.get('circulation/borrow-list').subscribe((res: any) => {
      this.borrow = res;
      // console.log(this.borrow); // Check if data is retrieved correctly
      // this.mapDataToMaterials(); // This line correctly invokes the function
    });

    this.getUser();
    this.getBook();
  }

  user = {
    id: '',
    name: '',
    gender: '',
    department: '',
    count:0,
    role: '',
    patron:'',
    materials_allowed:'',
    fine: '',
    program: '',
    title:'',
 
  }
  book = {
    accession: '',
    title: '',
    author: '',
    location: ''
  }
  
 
  admin: any;

  getUser() {
    // console.log(this.user.id)
    this.ds.get('circulation/get-user/' + this.material.user_id).subscribe({
      next: (res: any) => {
        this.user.id=res.id;
        this.user.name=res.first_name+' '+res.last_name;
        this.user.program=res.program.program;
        this.user.gender=res.gender;
        this.user.department=res.department;
        this.user.role=res.role;
        this.user.patron=res.patron;
        this.user.materials_allowed=res.patron.materials_allowed;
        this.user.fine=res.patron.fine;
        // console.log(res)
        this.isLoading = false;
      }
    })
  }
  getBook() {
    // console.log(this.material.accession);
    
    // Construct the URL with the query parameter
    const params = `?accession=${encodeURIComponent(this.material.accession)}`;
    const url = 'circulation/get-book' + params;
    
    this.ds.get(url).subscribe({   
      next: (res: any) => {
        // console.log(res);
        let authors = JSON.parse(res.authors);
        this.book.author = authors.join(', ');  // Join authors with comma and space
        this.book.title = res.title;
        this.book.location = res.book_location.location_short;

        this.isLoading = false;
      },
      // error: (err: any) => console.log(err)
    });
  }

  getAdmin(event: Event) {
    let target = event.target as HTMLInputElement;
    this.ds.get('circulation/get-user/' + target.value).subscribe({
      next: (res: any) => {
        this.user = res;
        // console.log(this.user)
      }
    })
  }

  
  // mapDataToMaterials() {
  //   // Map borrow data to material
  //   this.material.title = this.material.title || '';
  //   this.material.location = this.borrow.location || '';
  //   this.material.author = this.borrow.author || '';
  //   this.material.name = this.borrow.name || '';
  //   this.material.gender = this.borrow.gender || '';
  //   this.material.role = this.borrow.role || '';
  //   this.material.department = this.borrow.department || '';
  //   this.material.borrow_date = this.borrow.borrow_date || '';
  //   this.material.borrow_expiration = this.borrow.borrow_expiration || '';
  //   this.material.fine = this.borrow.fine || '';
  //   this.material.accession = this.borrow.accession || '';
  //   // Map other properties as needed
  // }

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
          iconColor: '#4F6F52',
          confirmButtonColor: '#4F6F52',
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

