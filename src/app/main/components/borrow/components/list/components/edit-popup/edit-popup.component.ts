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

  protected borrow: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public material: any,
    private http: HttpClient,
    private ds: MainService,
    private router: Router
  ) {
    console.log('Data received in dialog:', this.material);
  }

  ngOnInit(): void {
    this.ds.get('borrow-list').subscribe((res: any) => {
      this.borrow = res;
      console.log(this.borrow); // Check if data is retrieved correctly
    });
  }

materials = {
    id: '',
    name: '',
    gender: '',
    role:'',
    department: '',
    borrow_date:'',
    borrow_expiration: '',
    fine: '',
    accession: '',
    title: '',
    author: '',
    location: '',
  }
  
  admin: any;

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

