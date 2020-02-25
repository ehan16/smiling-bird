import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  editForm: FormGroup;
  currentUser: User = new User('Test', 'test', 'Robert');

  constructor() { }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl(this.currentUser.name, Validators.required),
      user: new FormControl(this.currentUser.user, [Validators.required, Validators.email]),
      day: new FormControl(this.currentUser.birth.day, Validators.required),
      month: new FormControl(this.currentUser.birth.month, Validators.required),
      year: new FormControl(this.currentUser.birth.year, Validators.required),
      gender: new FormControl(this.currentUser.gender, Validators.required),
      // shift: new FormControl
    });
  }

}
