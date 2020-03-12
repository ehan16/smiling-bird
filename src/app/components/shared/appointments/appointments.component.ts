import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Appointment } from 'src/app/models/appointment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  currentUser: User;
  appointmentList: Appointment[] = [];
  appointmentForm: FormGroup;
  minDate; start: number; end: number;

  constructor(
    private userService: UserService
  ) {
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit() {

    const today = new Date();
    this.minDate = new NgbDate(today.getFullYear(), today.getMonth(), today.getDate());

    this.appointmentForm = new FormGroup({
      appointmentDate: new FormControl(this.minDate , Validators.required),
      hour: new FormControl('9', [Validators.required, Validators.min(this.start), Validators.max(this.end)])
    });

  }

  acceptAppointment() {

  }

  modifyAppointment() {

  }

  deleteAppointment() {

  }

  startAppointment() {

  }

  getDentistShift(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  getUserData(userId): User {
    return this.userService.getUserData(userId);
  }

}
