import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userList = [];
  currentUser: User;
  searchName: string;
  newAppointment: FormGroup;
  start = 8;
  end = 16;
  auxAppointments = [];
  activeAppointment = true;
  dentistId: string;
  today = new Date();
  minDate = new NgbDate(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate() + 1
  );
  selectedDate = this.minDate;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit() {

    this.userService.getAll().subscribe(data => {
      this.userList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });

      if (this.currentUser.type === 'patient') {
        this.userList = this.userList.filter(user => user.type === 'dentist');
      } else if (this.currentUser.type === 'dentist') {
        this.userList = this.userList.filter(user => user.type === 'patient');
      } else {
        this.userList = this.userService.userList;
      }
    });

    this.appointmentService.getAll().subscribe(data => {
      let appointmentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Appointment;
      });

      this.auxAppointments = appointmentList;

      appointmentList = appointmentList.filter(
        appointment => appointment.patient === this.userService.currentUserId
      );
      appointmentList = appointmentList.filter(
        appointment => appointment.completed === false
      );

      this.activeAppointment = appointmentList.length >= 1;

    });

    this.newAppointment = new FormGroup({
      date: new FormControl(this.minDate, [
        Validators.required,
        this.invalidDate.bind(this)
      ]),
      hour: new FormControl('', [
        Validators.required,
        this.invalidHour.bind(this),
        this.occupiedHour.bind(this)
      ])
    });

    this.newAppointment.get('date').valueChanges.subscribe(
      x => {
        console.log(x);
        this.newAppointment.get('hour').patchValue('');
        this.selectedDate = x;
      }
    );

  }

  addAppointment(dentistId) {
    const selectedHour = this.newAppointment.value.hour;
    const selectedYear = this.newAppointment.value.date.year;
    const selectedMonth = this.newAppointment.value.date.month;
    const selectedDay = this.newAppointment.value.date.day;

    console.log(this.newAppointment);
    const app = {
      date: {
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay
      },
      hour: selectedHour,
      completed: false,
      accepted: false,
      treatments: [],
      patient: this.userService.currentUserId,
      dentist: dentistId,
      recipe: ''
    };

    this.appointmentService.createAppointment(app);

  }

  seeMedicalHistory(patientId) {
    this.router.navigate([patientId, 'medical-record'], {
      relativeTo: this.route
    });
  }

  sendMessage(patient: User, patientId) {
    this.router.navigate([patientId, 'message'], { relativeTo: this.route });
  }

  editUser(userId) {
    this.router.navigate(['../', 'user-edit', userId], {
      relativeTo: this.route
    });
  }

  newUser() {
    if (this.currentUser.type === 'admin') {
      this.router.navigate(['new-user'], { relativeTo: this.route });
    } else {
      this.router.navigate(['new-patient'], { relativeTo: this.route });
    }
  }

  invalidDate(control: FormControl): { [s: string]: boolean } {
    const date =
      control.value.year + '-' + control.value.month + '-' + control.value.day;
    const newDate = new Date(date);
    const day = newDate.getDay(); // Returns 6 if Sat and 0 if Sun
    if (day === 6 || day === 0) {
      return { invalidDate: true };
    } else {
      return null;
    }
  }

  invalidHour(control: FormControl): { [s: string]: boolean } {
    if (control.value < this.start || this.end < control.value) {
      return { invalidHour: true };
    } else {
      return null;
    }
  }

  occupiedHour(control: FormControl): {[s: string]: boolean} {

    let occupied = false;
    const dentistAppointments = this.auxAppointments.filter(
      appointment => appointment.dentist === this.dentistId
    );

    dentistAppointments.forEach(appointment => {
      if (
        this.selectedDate.year === appointment.date.year &&
        this.selectedDate.month === appointment.date.month &&
        this.selectedDate.day === appointment.date.day
      ) {
        if (control.value === appointment.hour) {
          occupied = true;
          console.log(this.selectedDate);
        }
      }
    });

    if (occupied) {
      return { occupiedHour: true };
    } else {
      return null;
    }

  }

  getDentistShift(start: number, end: number, id: string) {
    this.start = start;
    this.end = end;
    this.dentistId = id;
  }
}
