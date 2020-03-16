import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  editForm: FormGroup = new FormGroup({});
  currentUser: User;
  editedUser: User;
  editedUserId: string;

  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) {
    this.route.params.subscribe(
      (param: Params) => {
        this.editedUserId = param['editedId'];
        this.firestore.getValue(this.editedUserId, 'users').subscribe((user: User) => {
          this.editedUser = user;

          this.editForm.patchValue(user);
          console.log('edited user: ', this.editedUser);
        });
      }
    );
  }

  ngOnInit() {

    this.editForm = new FormGroup ({
      name: new FormControl('', [Validators.required]),
      identification: new FormControl('', [Validators.required, Validators.min(0)]),
      gender: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      comission: new FormControl('', Validators.required)
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
      enable: this.editedUser.enable,
      appointment: this.editedUser.appointment,
      debt: this.editedUser.debt,
      comission: this.editForm.value.comission
    };
    this.firestore.setValue(this.editedUserId, user, 'users');
    this.router.navigate(['/admin', this.userService.currentUserId, 'user-list']);
  }

  restorePassword() {
    this.auth.sendPasswordResetEmail(this.editedUser.user).then(
      res => {
        window.alert('El correo de restablecimiento de contraseña ha sido enviado.');
      },
      error => {
        window.alert(error);
      }
    );
  }

  enableUser() {

  }

}
