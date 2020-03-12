import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  currentUser: User;
  editedUser: User;
  editedUserId: string;

  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.editedUserId = param['editedId'];
        this.firestore.getValue(this.editedUserId, 'users').subscribe((user: User) => {
          this.editedUser = user;
          console.log('edited user: ', this.editedUser);
        });
      }
    );

    this.editForm = new FormGroup ({
      name: new FormControl(this.editedUser.name, [Validators.required]),
      identification: new FormControl(this.editedUser.identification, [Validators.required, Validators.min(0)]),
      gender: new FormControl(this.editedUser.gender, Validators.required),
      type: new FormControl(this.editedUser.type, Validators.required),
      comission: new FormControl(this.editedUser.comission, Validators.required)
    });
  }


  onEdit() {
    console.log(this.editForm);
    const yea = this.editedUser.birth.year;
    const mont = this.editedUser.birth.month;
    const da = this.editedUser.birth.day;
    const user = {
      name: this.editForm.value.name,
      identification: this.editForm.value.identification,
      user: this.editedUser.user,
      gender: this.editForm.value.gender,
      type: this.editForm.value.type,
      birth: {
        year: yea,
        month: mont,
        day: da
      },
      shift: [this.editedUser.shift[0], this.editedUser.shift[1]],
      enable: this.currentUser.enable,
      appointment: this.editedUser.appointment,
      debt: this.editedUser.debt,
      comission: this.editForm.value.comission
    };
    this.firestore.setValue(this.editedUserId, user, 'users');
  }

  resetPassword() {}

  enableUser() {

  }

}
