import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  editForm: FormGroup;
  currentUser: User;
  todayDate = new Date();
  maxDate: NgbDate = new NgbDate(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, this.todayDate.getDate());
  minDate: NgbDate = new NgbDate(this.todayDate.getFullYear() - 100, this.todayDate.getMonth(), this.todayDate.getDate());
  date: NgbDate = this.currentUser.birth;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;

    this.editForm = new FormGroup({
      name: new FormControl(this.currentUser.name, Validators.required),
      user: new FormControl(this.currentUser.user, [Validators.required, Validators.email]),
      identification: new FormControl(this.currentUser.identification, Validators.required),
      birthDate: new FormControl(this.date , Validators.required),
      gender: new FormControl(this.currentUser.gender, Validators.required),
      // shift: new FormControl
    });

  }

  onEdit() {
    console.log(this.editForm);
  }

}
