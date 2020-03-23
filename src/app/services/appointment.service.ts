import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Appointment } from '../models/appointment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointmentsList: Appointment[];

  constructor(
    private firestore: FirestoreService,
    private af: AngularFirestore
  ) { }

  createAppointment(data: any) {
    this.firestore.create(data, 'appointments');
  }

  getAllPromise() {
    // tslint:disable-next-line: no-unused-expression
    return this.firestore.getAll('appointments').pipe( first() ).toPromise();
  }

  getAppointmentData(appointmentId): any {
    this.firestore
      .getValue(appointmentId, 'appointments')
      .subscribe((appointment: Appointment) => {
        // console.log('appointment: ', appointment);
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
      }
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
