import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  } from '@angular/fire';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username : new FormControl('', [ Validators.required, Validators.email]),
      password : new FormControl('', Validators.required)
    });

  }

  onSubmit() {
    console.log(this.loginForm);
    this.auth.signInWithEmail(this.loginForm.value.username, this.loginForm.value.password);
    // this.loginForm.reset();

    // Buscar cual usuario es y redirigir
  }

  forgotPassword() {
    if (!this.loginForm.value.username.valid){
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
