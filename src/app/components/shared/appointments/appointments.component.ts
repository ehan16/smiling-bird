import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Appointment } from 'src/app/models/appointment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  currentUser: User;
  appointmentList = [];
  appointmentForm: FormGroup;
  today = new Date();
  minDate = new NgbDate(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate() + 1
  );
  start = 8;
  end = 16;
  auxAppointments = [];
  selectedDate = this.minDate;
  dentistId;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: FirestoreService
  ) {
    this.currentUser = this.userService.currentUser;
    console.log(this.currentUser);
  }

  ngOnInit() {

    this.appointmentForm = new FormGroup({
      date: new FormControl(this.minDate, [ Validators.required, this.invalidDate.bind(this)]),
      hour: new FormControl('', [Validators.required, this.invalidHour.bind(this), this.occupiedHour.bind(this)])
    });

    this.appointmentForm.get('date').valueChanges.subscribe(
      x => {
        this.appointmentForm.get('hour').patchValue('');
        this.selectedDate = x;
      }
    );

    this.firestore.getAll('appointments').subscribe(data => {
      this.appointmentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Appointment;
      });

      this.auxAppointments = this.appointmentList;
      console.log('aux appointmets', this.auxAppointments);
      this.appointmentService.appointmentsList = this.appointmentList;
      console.log('lista de citas antes de filtrar por completado', this.appointmentList);
      this.appointmentList = this.appointmentList.filter(appointment => appointment.completed === false);
      console.log('lista de citas antes de filtrar por paciente u odontologo', this.appointmentList);

      if (this.currentUser.type === 'patient') {
        this.appointmentList = this.appointmentList.filter(appointment => appointment.patient === this.authService.id);
      } else {
        this.appointmentList = this.appointmentList.filter(appointment => appointment.dentist === this.authService.id);
      }

      console.log('lista de citas es ', this.appointmentList);

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

  modifyAppointment(id, appointment) {
    console.log(this.appointmentForm);
    this.appointmentService.updateAppointment(this.appointmentForm.value.date, this.appointmentForm.value.hour, appointment, id);
  }

  deleteAppointment(id) {
    console.log(id);
    this.appointmentService.deleteAppointment(id);
  }

  startAppointment(appointment, id) {
    this.appointmentService.startAppointment(id);
    this.router.navigate(['/patient-list', appointment.patient, 'consult', id, 'edit'], { relativeTo: this.route });
  }

  patchValues(appointment: Appointment) {

    if (this.calculateHourDifference(appointment)) {
      this.appointmentForm.patchValue(appointment);
      this.dentistId = appointment.dentist;
      this.start = this.getUser(this.dentistId).shift[0];
      this.end = this.getUser(this.dentistId).shift[1];
    } else {
      window.alert('ACCIÓN INVÁLIDA: restan 6 horas o menos para la cita');
    }

  }

  getUser(id): any {
    // tslint:disable-next-line: no-shadowed-variable
    const user = this.userService.userList.find(user => user.id === id);
    return user;
  }

  getUserName(id): string {
    return this.getUser(id).name;
  }

  getUserShift(id): number[] {
    return this.getUser(id).shift;
  }

  getUserEmail(id): string {
    return this.getUser(id).user;
  }

  invalidHour(control: FormControl): { [s: string]: boolean } {
    if (control.value < this.start || this.end < control.value) {
      return { invalidHour: true };
    } else {
      return null;
    }
  }

  occupiedHour(
    control: FormControl
  ): {[s: string]: boolean} {

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

  calculateHourDifference(appointment): boolean {
    const today = new Date();
    const currentHour = today.getHours();
    console.log(today);

    if (appointment.date.year === today.getFullYear() &&
        appointment.date.month === today.getMonth() &&
        appointment.date.day === today.getDate()) {

          if ((currentHour - appointment.hour) >= 6) {
            return false;
          } else {
            return true;
          }

    } else {
      return true;
    }

  }

}
