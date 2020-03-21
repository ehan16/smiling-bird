import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Appointment } from 'src/app/models/appointment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  currentUser: User;
  appointmentList = [];
  appointmentForm: FormGroup;
  minDate;
  start = 8;
  end = 16;

  constructor(
    private userService: UserService,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: FirestoreService
  ) {
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit() {
    const today = new Date();
    this.minDate = new NgbDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    this.appointmentForm = new FormGroup({
      date: new FormControl(this.minDate, [
        Validators.required,
        this.invalidDate.bind(this)
      ]),
      hour: new FormControl('', [
        Validators.required,
        Validators.min(this.start),
        Validators.max(this.end)
      ])
    });

    // this.appointmentService.getAll().then(r => {
    //   console.log(r);

    //   r.map(e => {
    //     console.log(e.payload.doc.data());

    //     const aux = {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as Appointment;

    //     this.appointmentList.push(aux);
    //   });
    //   console.log('appointment list is ', this.appointmentList);
    // });

    this.firestore.getAll('appointments').subscribe(data => {
      this.appointmentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Appointment;
      });

      console.log(this.appointmentList);
      this.appointmentService.appointmentsList = this.appointmentList;

      if (this.currentUser.type === 'patient') {
        this.appointmentList = this.appointmentList.filter(appointment => appointment.patient === this.userService.currentUserId);
        this.appointmentList = this.appointmentList.filter(appointment => appointment.completed === false);
      } else {
        this.appointmentList = this.appointmentList.filter(appointment => appointment.dentist === this.userService.currentUserId);
        this.appointmentList = this.appointmentList.filter(appointment => appointment.completed === false);
      }

      console.log('Filtered list is ', this.appointmentList);

    });

  }

  invalidDate(control: FormControl): { [s: string]: boolean } {
    const date = control.value.year + '-' + control.value.month + '-' + control.value.day;
    const newDate = new Date(date);
    const day = newDate.getDay(); // Returns 6 if Sat and 0 if Sun
    if (day === 6 || day === 0) {
      return { invalidDate: true };
    } else {
      return null;
    }
  }

  acceptAppointment(appointmentId) {
    this.appointmentService.acceptAppointment(appointmentId);
  }

  modifyAppointment(id) {
    console.log(this.appointmentForm);
    this.appointmentService.updateAppointment(this.appointmentForm.value.date, this.appointmentForm.value.hour, id);
  }

  deleteAppointment(id) {
    console.log(id);
    this.appointmentService.deleteAppointment(id);
  }

  startAppointment(appointment, id) {
    this.appointmentService.startAppointment(id);
    this.router.navigate(['/patient', appointment.patient, 'consult', id], { relativeTo: this.route });
  }

  getDentistShift(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  patchValues(appointment: Appointment) {
    this.appointmentForm.patchValue(appointment);
  }

  getUser(id): any {
    const user = this.userService.userList.find(user => user.id === id);
    return user;
  }

  getUserName(id): string {
    return this.getUser(id).name;
  }

  getUserEmail(id): string {
    return this.getUser(id).user;
  }

  // getUserData(userId): User {
  //   return this.userService.getUserData(userId);
  // }

}
