import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnDestroy {
 
  dropdownOpen: boolean | undefined;
  projectDropdownOpen: boolean | undefined;

  
  timer: any;
  name = sessionStorage.getItem('name');
  role = sessionStorage.getItem('role');

  constructor(
    private router: Router
  ) {
    this.checkScreenWidth();
  }


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
      text: "  Are you sure you want to exit Circulation?", 
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: "Yes"
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['login']); 
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'Signed out successfully!'
        });
      }
    });

  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
}

isSidebarCollapsed = false;
isOverlayActive = false;

toggleSidebar() {
  if (window.innerWidth <= 1320) {
    this.isOverlayActive = !this.isOverlayActive;
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  } else {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}

@HostListener('window:resize', ['$event'])
onResize(event: Event) {
  this.checkScreenWidth();
}

checkScreenWidth() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 1320) {
    this.isSidebarCollapsed = true;
  } else {
    this.isSidebarCollapsed = false;
    this.isOverlayActive = false;
  }
}
}
