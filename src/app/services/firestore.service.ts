import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Appointment } from '../model/appointment.model';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  constructor( private firestore: AngularFirestore) {}

  // data: User || Appointment

  public create(data: any, collection: string) {
    return this.firestore.collection(collection).add(data);
  }

  public get(documentId: string, collection: string) {
    return this.firestore.collection(collection).doc(documentId).snapshotChanges();
  }

  public getAll(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  public update(documentId: string, data: any, collection: string) {
    return this.firestore.collection(collection).doc(documentId).set({ data } , { merge: true});
  }
}
