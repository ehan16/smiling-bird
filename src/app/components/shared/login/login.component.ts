import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  } from '@angular/fire';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username : new FormControl('', [ Validators.required, Validators.email]),
      password : new FormControl('', Validators.required)
    });

  }

  onSubmit() {
    console.log(this.loginForm);
    this.auth.signInWithEmail(this.loginForm.value.username, this.loginForm.value.password);
    this.userService.logUser(this.auth.id);
    this.loginForm.reset();

  }

  forgotPassword() {
    if (!this.loginForm.value.username.valid) {
      window.alert('Escriba su email primero');
    } else {
      this.auth.sendPasswordResetEmail(this.loginForm.value.email).then(
        res => {
          console.log(res);
          window.alert('Por favor revise su correo');
        }, error => {
          window.alert(error);
        });
    }
  }

}
