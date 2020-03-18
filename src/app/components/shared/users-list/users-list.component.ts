import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/services/appointment.service';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {
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
    this.minDate = new NgbDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    this.newAppointment = new FormGroup({
      date: new FormControl(this.minDate, [
        Validators.required,
        this.invalidDate.bind(this)
      ]),
      hour: new FormControl('9', [
        Validators.required,
        Validators.min(this.start),
        Validators.max(this.end)
      ])
    });
  }

  addAppointment(dentistId) {
    console.log(this.newAppointment);
    const app = {
      date: {
        year: this.newAppointment.value.date.year,
        month: this.newAppointment.value.date.month,
        day: this.newAppointment.value.date.day
      },
      hour: this.newAppointment.value.hour,
      completed: false,
      accepted: false,
      treatments: [],
      patient: this.userService.currentUserId,
      dentist: dentistId
    };

    this.appointmentService.createAppointment(app);
    this.router.navigate([''], {relativeTo: this.route});
  }

  seeMedicalHistory(patientId) {
    this.router.navigate(['../', 'patient', patientId], { relativeTo: this.route });
  }

  sendMessage(patient: User, patientId) {

  }

  editUser(userId) {
    this.router.navigate(['../', 'user-edit', userId], {
      relativeTo: this.route
    });
  }

  newUser() {
    this.router.navigate(['../', 'new-user'], { relativeTo: this.route });
  }

  getDentistShift(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  invalidDate(control: FormControl): { [s: string]: boolean } {
    const date =
      control.value.year + '-' + control.value.month + '-' + control.value.day;
    // console.log('date is ', date);
    const newDate = new Date(date);
    // console.log('In DATE format is ', newDate);
    const day = newDate.getDay(); // Returns 6 if Sat and 0 if Sun
    // console.log('day is ', day);
    if (day === 6 || day === 0) {
      return { invalidDate: true };
    } else {
      return null;
    }
  }
}
