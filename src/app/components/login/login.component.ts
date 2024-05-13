import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm!: FormGroup
  session: any
  result: any
  authService: any;
  router: any;

  constructor(private builder: FormBuilder,) {}

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  
  login(){
    console.log('Submit button clicked');
  }
}
