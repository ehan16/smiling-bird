import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  } from '@angular/fire';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username : new FormControl('', [ Validators.required, Validators.email]),
      password : new FormControl('', Validators.required)
    });

  }

  onSubmit() {
    console.log(this.loginForm);
    // this.loginForm.reset();

    // Buscar cual usuario es y redirigir

  }

  // forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (this.forbiddenEmails(.indexOf(control.value)) !== -1) {
  //         resolve({'emailIsForbidden': true});
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1500);
  //   });
  //   return promise;
  // }

}
