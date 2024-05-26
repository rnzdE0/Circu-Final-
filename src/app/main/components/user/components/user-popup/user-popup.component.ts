  import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MainService } from '../../../../../services/main.service';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent implements OnInit{
   
   users: any;
   id: any;

   constructor (
    @Inject(MAT_DIALOG_DATA) public user: any,
    private http: HttpClient,
    private ds: MainService,
    private router: Router
   ) {
    console.log('Data is now injected', this.user.id)
   }

   ngOnInit(): void {
    this.fetchUserDetails(this.user); // Fetch user details using the passed id
  }

  fetchUserDetails(id: any): void {
    this.ds.get('circulation/get-user/' + this.user.id).subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
    });
  }
}
