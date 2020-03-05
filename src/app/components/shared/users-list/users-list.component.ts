import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userList: User[] = [];
  currentUser: User;
  show = false;

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

    } else if (this.currentUser.type === 'dentist') {

    } else {

    }
  }

  toggle(index: number) {
    // document.getElementById('user' + index)= document.getElementById('user' + index).show;
  }

}
