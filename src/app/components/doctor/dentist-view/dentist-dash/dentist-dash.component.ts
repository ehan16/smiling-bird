import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dentist-dash',
  templateUrl: './dentist-dash.component.html',
  styleUrls: ['./dentist-dash.component.css']
})
export class DentistDashComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService) {
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit() {
  }

}
