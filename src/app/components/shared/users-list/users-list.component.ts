import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userList: User[] = [];
  currentUser: User;
  searchName;
  newAppointment: FormGroup;
  minDate;
  start: number;
  end: number;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.currentUser = this.userService.currentUser;
    this.userList = this.userService.userList;
    console.log(this.userList);

    if (this.currentUser.type === 'patient') {
      this.userList = this.userList.filter(user => user.type === 'dentist');
    } else if (this.currentUser.type === 'dentist') {
      this.userList = this.userList.filter(user => user.type === 'patient');
    } else {
      this.userList = this.userService.userList;
    }

  }

  ngOnInit() {

    const today = new Date();
    this.minDate = new NgbDate(today.getFullYear(), today.getMonth(), today.getDate());


    this.newAppointment = new FormGroup({
      appointmentDate: new FormControl(this.minDate , Validators.required),
      hour: new FormControl('9', [Validators.required, Validators.min(this.start), Validators.max(this.end)])
    });
  }

  addAppointment() {
    console.log(this.newAppointment);
  }

  seeMedicalHistory(patient: User) {

  }

  sendMessage(patient: User) {

  }

  editUser(userId) {
    this.router.navigate(['../', 'user-edit', userId], {relativeTo: this.route});
  }

  getDentistShift(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

}
