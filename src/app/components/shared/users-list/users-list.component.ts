import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userList: User[] = [];
  currentUser: User;
  newAppointment: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    this.userList.push(this.currentUser);
    this.userList.push(this.currentUser);
    this.userList.push(this.currentUser);
    this.userList.push(this.currentUser);
    this.userList.push(this.currentUser);
    this.userList.push(this.currentUser);
    this.userList.push(this.currentUser);
    this.userList.push(this.currentUser);
    this.userList.push(this.currentUser);
    this.userList.push(this.currentUser);

    if (this.currentUser.type === 'patient') {
      // this.userList = this.userList.filter(user => user.type === 'dentist');
    } else if (this.currentUser.type === 'dentist') {
      this.userList = this.userList.filter(user => user.type === 'patient');
    } else {
      this.userList = this.userService.userList;
    }

    this.newAppointment = new FormGroup({
      name: new FormControl(this.currentUser.name, Validators.required),
      user: new FormControl(this.currentUser.user, [Validators.required, Validators.email]),
      identification: new FormControl(this.currentUser.identification, Validators.required),
      appointmentDate: new FormControl(this.currentUser.birth , Validators.required),
      gender: new FormControl(this.currentUser.gender, Validators.required),
      // shift: new FormControl
    });
  }

  addAppointment(){
    console.log(this.newAppointment);
  }



   

}
