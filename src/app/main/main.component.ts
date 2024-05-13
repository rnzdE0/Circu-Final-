import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  // showPopup: boolean = false;
  dropdownOpen: boolean | undefined;
  projectDropdownOpen: boolean | undefined;

  // togglePopup() {
  //   this.showPopup = !this.showPopup;
  // }

  // closePopup() {
  //   this.showPopup = this.showPopup;
  // }

  constructor(private router: Router) { }

  // redirectToLoginPage() {
  //   this.router.navigate(['login']); 
  // }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.projectDropdownOpen = false
  }

  toggleUserDropdown() {
    this.projectDropdownOpen = !this.projectDropdownOpen;
    this.dropdownOpen = false
  }

  logoutAlert(){
    Swal.fire({
      width: 400,
      title: "Confirm Logout",
      text: "Are you sure you want to exit Circulation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#31A463",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log me out"
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['login']); 
      }
    });

  }
}
