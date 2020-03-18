import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  currentUser: User;
  createForm: FormGroup;
  newType = 'patient';
  maxHour: number;
  minHour: number;
  todayDate = new Date();
  maxDate: NgbDate = new NgbDate(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, this.todayDate.getDate());
  minDate: NgbDate = new NgbDate(this.todayDate.getFullYear() - 70, this.todayDate.getMonth() + 1, this.todayDate.getDate());

  constructor(private userService: UserService, private auth: AuthService) {
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit() {

    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      user: new FormControl('', [ Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      identification: new FormControl('', [Validators.required, Validators.min(1)]),
      gender: new FormControl('mujer'),
      type: new FormControl('patient'),
      date: new FormControl('', Validators.required),
      comission: new FormControl(0, Validators.required),
      start: new FormControl(9, [Validators.required, Validators.min(8), Validators.max(this.maxHour)]),
      end: new FormControl(13, [Validators.required, Validators.max(16), Validators.min(this.minHour)]),
    });

  }

  onCreate() {
    if (this.createForm.value.password === this.createForm.value.confirmPassword) {
      this.auth.doRegister(this.createForm.value.user, this.createForm.value.password).then(
        res => {
          console.log(res);
          window.alert('La cuenta ha sido exitosamente creada');
          console.log(res.user.uid);

          const user = {
            name: this.createForm.value.name,
            user: this.createForm.value.user,
            identification: this.createForm.value.identification,
            gender: this.createForm.value.gender,
            type: this.createForm.value.type,
            birth: {
              year: this.createForm.value.date.year,
              month: this.createForm.value.date.month,
              day: this.createForm.value.date.day
            },
            enable: true,
            appointment: [],
            debt: 0,
            shift: [ this.createForm.value.start, this.createForm.value.end ],
            comission: this.createForm.value.comission,
          };

          this.userService.createUser(user, res.user.uid);
          // this.router.navigate(['/visitor', 'login']);
          // this.auth.VerifyEmail(res.user);

        }, error => {
          console.log(error);
          window.alert(error);
        });
    } else {
      window.alert('Las dos contraseñas no coinciden');
    }
  }

}
