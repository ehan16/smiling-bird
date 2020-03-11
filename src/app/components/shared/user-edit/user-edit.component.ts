import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  editForm: FormGroup;
  currentUser: User;
  editedUser: User;
  minDate;
  maxDate;

  constructor(private  userService: UserService, private firestore: FirestoreService, private router: Router ) { }

  ngOnInit() {
  }

  onEdit() {

  }


}
