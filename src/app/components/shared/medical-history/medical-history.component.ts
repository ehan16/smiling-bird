import { Component, OnInit, OnDestroy } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit, OnDestroy {

  currentUser: User;
  medicalRecord = [];
  patient: User;
  patientId: string;
  subscription: Subscription;

  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    if (this.authService.currentUser) {
      this.currentUser = this.authService.currentUser;
      this.onInit();
    } else {
      this.subscription = this.authService.userChange.subscribe(
        (user: User) => {
          this.currentUser = user;
          this.onInit();
        }
      );
    }

  }

  onInit() {

    this.route.params.subscribe((param: Params) => {
      this.patientId = param['patientId'];
      console.log(this.patientId);

      if (this.currentUser.type === 'patient') {
        this.patientId = this.authService.id;
      }

      this.firestore.getValue(this.patientId, 'users').subscribe((user: User) => {
          this.patient = user;

          this.firestore.getAll('appointments').subscribe(data => {
            this.medicalRecord = data.map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
              } as Appointment;
            });

            this.medicalRecord = this.medicalRecord.filter(appointment => appointment.patient === this.patientId);
            this.medicalRecord = this.medicalRecord.filter(appointment => appointment.completed === true);
          });

          console.log(this.patient);
          console.log(this.medicalRecord);
        });
    });

  }

  onEdit(consultId) {
    this.router.navigate(['../', 'consult', consultId, 'edit'], {
      relativeTo: this.route
    });
  }

  onSee(consultId) {
    this.router.navigate(['../', 'consult', consultId], {
      relativeTo: this.route
    });
  }

  onCreate() {
    const date = new Date();
    const currentHour = date.getHours() + Math.round(date.getMinutes() / 60);
    console.log(currentHour);

    const data = {
      completed: true,
      accepted: true,
      treatments: [],
      patient: this.patientId,
      dentist: this.authService.id,
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      },
      recipe: '',
      hour: currentHour
    };

    this.appointmentService.createConsult(data, this.route);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
