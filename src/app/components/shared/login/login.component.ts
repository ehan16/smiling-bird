import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailForm: FormGroup;

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    this.auth.signInWithEmail( this.loginForm.value.username, this.loginForm.value.password);
    this.userService.logUser(this.auth.id);
    this.loginForm.reset();
  }

}
