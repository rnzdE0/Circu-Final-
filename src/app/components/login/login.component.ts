import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any;
  builder: any;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    // console.log('loginForm initialized:', this.loginForm);   
    console.log('bobo ka renze'); 
  }

  login() {
    console.log('bobo ka renze');
  }
}
