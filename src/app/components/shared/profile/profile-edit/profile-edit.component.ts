import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  editForm: FormGroup;
  dentistEditForm: FormGroup;
  currentUser: User;
  todayDate = new Date();
  maxHour: number;
  minHour: number;
  maxDate: NgbDate = new NgbDate(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, this.todayDate.getDate());
  minDate: NgbDate = new NgbDate(this.todayDate.getFullYear() - 100, this.todayDate.getMonth(), this.todayDate.getDate());
  start = 8;
  end = 16;

  constructor(private userService: UserService, private firestore: FirestoreService, private auth: AuthService) {
    this.currentUser = this.userService.currentUser;
    this.start = this.currentUser.shift[0];
    this.end = this.currentUser.shift[1];

    console.log('start ', this.start, 'end ', this.end);
  }

  ngOnInit() {

    this.editForm = new FormGroup({
      name: new FormControl(this.currentUser.name, Validators.required),
      identification: new FormControl(this.currentUser.identification, Validators.required),
      birthDate: new FormControl(this.currentUser.birth , Validators.required),
      gender: new FormControl(this.currentUser.gender, Validators.required),
      start: new FormControl(this.start, [Validators.required, this.invalidHour.bind(this), Validators.max(this.maxHour)]),
      end: new FormControl(this.end, [Validators.required, this.invalidHour.bind(this), Validators.min(this.minHour)]),
    });

  }

  onEdit() {

    if (this.editForm.value.end > this.editForm.value.start) {
      console.log(this.editForm);
      const yea = this.editForm.value.birthDate.year;
      const mont = this.editForm.value.birthDate.month;
      const da = this.editForm.value.birthDate.day;
      const user = {
        name: this.editForm.value.name,
        identification: this.editForm.value.identification,
        user: this.currentUser.user,
        gender: this.editForm.value.gender,
        type: this.currentUser.type,
        birth: {
          year: yea,
          month: mont,
          day: da
        },
        shift: [this.editForm.value.start, this.editForm.value.end],
        enable: this.currentUser.enable,
        debt: this.currentUser.debt,
        comission: this.currentUser.comission
      };
      this.firestore.setValue(this.auth.getCurrentUID(), user, 'users');
      this.editForm.reset();
    } else {
      window.alert('ACCIÓN INVÁLIDA: la hora de salida es mayor que la hora de entrada');
    }

  }

  invalidHour(control: FormControl): { [s: string]: boolean } {
    if (control.value < 8 || 16 < control.value) {
      return { invalidHour: true };
    } else {
      return null;
    }
  }

}
