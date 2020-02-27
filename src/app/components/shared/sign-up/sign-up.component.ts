import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  RegisterForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.RegisterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required)
    });

  }
  onSubmit() {
    console.log(this.RegisterForm);

  }
}
