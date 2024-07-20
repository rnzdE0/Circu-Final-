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

  constructor(
    @Inject(MAT_DIALOG_DATA) public material: any,
    private http: HttpClient,
    private ds: MainService,
    private router: Router
  ) {
    console.log('Data received in dialog:', this.material);
  }

  ngOnInit(): void {
    this.ds.get('circulation/borrow-list').subscribe((res: any) => {
      this.borrow = res;
      console.log(this.borrow); // Check if data is retrieved correctly
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
    patron: {
      patron:'',
      materials_allowed:'',
      fine: ''
    },
    program: {
      department: ''
    }
  }
  book = {
    accession: '',
    title: '',
    author: '',
    location: ''
  }
  
 
  admin: any;

  getUser() {
    console.log(this.user.id)
    this.ds.get('circulation/get-user/' + this.user.id).subscribe({
      next: (res: any) => {
        this.user.id=res.id;
        this.user.name=res.first_name+' '+res.last_name;
        this.user.program=res.program.program;
        this.user.gender=res.gender;
        this.user.department=res.department;
        this.user.role=res.role;
        this.user.patron.patron=res.patron.patron;
        this.user.patron.materials_allowed=res.patron.materials_allowed;
        this.user.patron.fine=res.patron.fine;
        console.log(res)
      }
    })
  }
    getBook() {console.log(this.material.book_id);
      this.ds.get('circulation/get-book/' + this.material.book_id ).subscribe({   
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

