import { AfterViewInit, Component } from '@angular/core';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private as: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    const form = document.getElementById('login-form') as HTMLFormElement;

    form.addEventListener('submit', (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the form elements
      const elements = form.elements;

      const formData = new FormData();

      // Loop through each form element
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement;

        // Check if the element is an input field
        if (element.tagName === 'INPUT' && element.id !== 'login-button') {
          formData.append(element.name, element.value);
        }
      }

      this.as.login(formData).subscribe({
        next: (res: any) => {
          console.log(formData.get('username'));
          this.router.navigate(['/main']);
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
            title: 'Signed in successfully!'
          });
        },
        error: (err: any) => {
          console.error('Login failed', err);
          Swal.fire({
            width:300,
            icon: 'error',
            title: 'Login Error!',
            text: 'Please fill up each fields.'
          });
        }
      });
    });
  }
  
}
