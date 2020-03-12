import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Appointment } from '../models/appointment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { analytics } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointmentsList: Appointment[];

  constructor(private firestore: FirestoreService, private af: AngularFirestore) {
    this.firestore.getAll('appointments').subscribe(
      data => {
        this.appointmentsList = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Appointment;
        });
      }
    );

    console.log(this.appointmentsList);
   }

   createAppointment(data: any, id: string) {
    this.af.collection('appointments').doc(id).set(data);
  }

  getAppointmentData(appointmentId): any {
    this.firestore.getValue(appointmentId, 'appointments').subscribe((appointment: Appointment) => {
      console.log('appointment: ', appointment);
      const appointmentData = appointment;
      return appointmentData;
    });
  }

  updateAppointment(newDay: any, newHour: number, appointmentId) {
    this.firestore.update(appointmentId, {
      day: newDay,
      hour: newHour
    }, 'appointments');
  }

}
