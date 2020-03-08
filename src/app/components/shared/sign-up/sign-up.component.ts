import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private auth: AuthService) { }

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
        }, error => {
          console.log(error);
          window.alert(error);
        });
    } else {
      window.alert('Las dos contraseñas no coinciden');
    }
  }
}
