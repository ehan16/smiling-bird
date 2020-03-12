import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  currentUser: User;
  

  constructor(
    private userService: UserService
  ) { 
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit() {
    console.log(this.currentUser);
  }

}
