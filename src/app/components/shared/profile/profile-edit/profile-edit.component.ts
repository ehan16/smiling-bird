import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  editForm: FormGroup;
  currentUser: User = new User('Test@gmail.com', 'test', 'Robert');
  todayDate = new Date();
  maxDate: NgbDate = new NgbDate(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate() + 1);
  minDate: NgbDate = new NgbDate(this.todayDate.getFullYear() - 100, this.todayDate.getMonth(), this.todayDate.getDate());

  constructor() { }

  ngOnInit() {

    // tslint:disable-next-line: max-line-length
    // const date: NgbDate = new NgbDate(this.currentUser.birth.getFullYear(), this.currentUser.birth.getMonth(), this.currentUser.birth.getDate());
    const date: NgbDate = this.currentUser.birth;

    this.editForm = new FormGroup({
      name: new FormControl(this.currentUser.name, Validators.required),
      user: new FormControl(this.currentUser.user, [Validators.required, Validators.email]),
      birthDate: new FormControl(date , Validators.required),
      gender: new FormControl(this.currentUser.gender, Validators.required),
      // shift: new FormControl
    });



  }

  onEdit() {
    console.log(this.editForm);
  }

}
