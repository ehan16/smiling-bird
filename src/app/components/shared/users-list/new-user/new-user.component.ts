import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  currentUser: User;
  createForm: FormGroup;
  newType = 'patient';
  maxHour = 13;
  minHour = 9;
  todayDate = new Date();
  maxDate: NgbDate = new NgbDate(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, this.todayDate.getDate());
  minDate: NgbDate = new NgbDate(this.todayDate.getFullYear() - 70, this.todayDate.getMonth() + 1, this.todayDate.getDate());

  constructor(private userService: UserService, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.currentUser = this.userService.currentUser;
    // this.userService.getLoggedUserData().then(
    //   (e: User) => {
    //     console.log('searched user: ', e);
    //     this.currentUser = e;
    //   }
    // );
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
      start: new FormControl(this.minHour, [Validators.required, Validators.min(8), Validators.max(this.maxHour)]),
      end: new FormControl(this.maxHour, [Validators.required, Validators.max(16), Validators.min(this.minHour)]),
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
            debt: 0,
            shift: [ this.createForm.value.start, this.createForm.value.end ],
            comission: this.createForm.value.comission,
          };

          this.userService.createUser(user, res.user.uid);

          if (this.currentUser.type === 'dentist') {
            this.router.navigate(['../', res.user.uid, 'medical-record'], { relativeTo: this.route });
          } else {
            this.router.navigate(['../'], { relativeTo: this.route });
          }

          this.auth.signOut();

        }, error => {
          console.log(error);
          window.alert(error);
        });
    } else {
      window.alert('Las dos contraseñas no coinciden');
    }
  }

}
