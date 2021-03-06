import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Appointment } from '../models/appointment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointmentsList: Appointment[];

  constructor(
    private firestore: FirestoreService,
    private af: AngularFirestore,
    private router: Router
  ) { }

  createAppointment(data: any) {
    this.firestore.create(data, 'appointments');
  }

  createConsult(data: any, route: ActivatedRoute) {
    this.af.collection('appointments').add(data).then((docRef) => {
        const id = docRef.id;
        this.router.navigate(['../', 'consult', id, 'edit'], { relativeTo: route });
      }
    ).catch();
  }

  getAppointmentData(appointmentId): any {
    this.firestore
      .getValue(appointmentId, 'appointments')
      .subscribe((appointment: Appointment) => {
        return appointment;
      });
  }

  deleteAppointment(id) {
    return this.af.collection('appointments').doc(id).delete();
  }

  updateAppointment(newDate: any, newHour: number, oldAppointment, appointmentId) {

    const appointment = {
      accepted: oldAppointment.accepted,
      completed: oldAppointment.completed,
      hour: newHour,
      patient: oldAppointment.patient,
      dentist: oldAppointment.dentist,
      treatments: oldAppointment.treatments,
      date: {
        year: newDate.year,
        month: newDate.month,
        day: newDate.day
      },
      recipe: oldAppointment.recipe
    };

    this.firestore.setValue(appointmentId, appointment, 'appointments');
  }

  startAppointment(id) {
    this.firestore.update(id, { completed: true }, 'appointments');
  }

  acceptAppointment(id) {
    this.firestore.update(id, { accepted: true }, 'appointments');
  }

  getAll() {
    return this.firestore.getAll('appointments');
  }

}
