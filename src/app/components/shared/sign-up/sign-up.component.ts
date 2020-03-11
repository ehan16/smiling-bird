import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      cedula: new FormControl('', [Validators.required, Validators.min(1)])
    });

  }
  onSubmit() {
    console.log(this.registerForm);
    if (this.registerForm.value.password === this.registerForm.value.password2) {
      this.auth.doRegister(this.registerForm.value.email, this.registerForm.value.password).then(
        res => {
          console.log(res);
          window.alert('Su cuenta ha sido exitosamente creada');
          console.log(res.user.uid);

          const user = {
            name: this.registerForm.value.name,
            user: this.registerForm.value.email,
            identification: this.registerForm.value.cedula,
            gender: 'hombre',
            type: 'patient',
            birth: {
              year: 2020,
              month: 1,
              day: 12
            },
            enable: true,
            appointment: [],
            debt: 0,
            shift: [ 0, 0 ],
          };

          this.userService.createUser(user, res.user.uid);
          this.userService.logUser(res.user.uid);

        }, error => {
          console.log(error);
          window.alert(error);
        });
    } else {
      window.alert('Las dos contraseñas no coinciden');
    }
  }
}
