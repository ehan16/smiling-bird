import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private auth: AuthService, private userService: UserService) { }

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

          // const email = this.registerForm.value.email;
          // const name = this.registerForm.value.name;
          // const identification = this.registerForm.value.cedula;
          // const user = new User(email, name, identification);

          const user = {
            name: this.registerForm.value.name,
            user: this.registerForm.value.email,
            identification: this.registerForm.value.cedula
          };

          this.userService.createUser(user, res.user.uid);

        }, error => {
          console.log(error);
          window.alert(error);
        });
    } else {
      window.alert('Las dos contraseñas no coinciden');
    }
  }
}
