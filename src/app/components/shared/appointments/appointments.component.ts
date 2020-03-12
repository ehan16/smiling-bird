import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Appointment } from 'src/app/models/appointment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/services/appointment.service';

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
    private userService: UserService,
    private appointmentService: AppointmentService
  ) {
    this.currentUser = this.userService.currentUser;

    // if (this.currentUser.type === 'patient') {
    //   this.appointmentList = this.appointmentList.filter(appointment => appointment.patient === this.userService.currentUserId);
    // } else {
    //   this.appointmentList = this.appointmentList.filter(appointment => appointment.dentist === this.userService.currentUserId);
    // }

  }

  ngOnInit() {

    const today = new Date();
    this.minDate = new NgbDate(today.getFullYear(), today.getMonth(), today.getDate());

    this.appointmentForm = new FormGroup({
      appointmentDate: new FormControl(this.minDate , Validators.required),
      hour: new FormControl('9', [Validators.required, Validators.min(this.start), Validators.max(this.end)])
    });

    this.appointmentService.getAll()
    .then( r => {
      console.log(r);

      r.map(e => {
          console.log(e.payload.doc.data());

          const aux = {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Appointment;

          this.appointmentList.push(aux);

        });
        console.log(this.appointmentList);
    })

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
