import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userList: User[] = [];
  currentUser: User;
  searchName;

  constructor(private userService: UserService, private router: Router) {
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit() {
    if (this.currentUser.type === 'patient') {
      // this.userList = this.userList.filter(user => user.type === 'dentist');
    } else if (this.currentUser.type === 'dentist') {
      this.userList = this.userList.filter(user => user.type === 'patient');
    } else {
      this.userList = this.userService.userList;
    }
  }

  onReserveAppointment(dentist: User) {

  }

  seeMedicalHistory(patient: User) {

  }

  sendMessage(patient: User) {

  }

  editUser(user: User) {

  }

}
