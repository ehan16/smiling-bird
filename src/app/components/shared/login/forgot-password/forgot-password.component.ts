import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailForm: FormGroup;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.email ])
    });
  }

  forgotPassword() {
    console.log('alo');
    this.auth.sendPasswordResetEmail(this.emailForm.value.email).then(
      res => {
        console.log(res);
      },
      error => {
        window.alert(error);
      }
    );
  }

}
