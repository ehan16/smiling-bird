import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  constructor( private firestore: AngularFirestore) {}

  public create(data: {nombre: string, url: string}, collection: string) {
    return this.firestore.collection(collection).add(data);
  }

  public get(documentId: string, collection: string) {
    return this.firestore.collection(collection).doc(documentId).snapshotChanges();
  }

  public getAll(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  public update(documentId: string, data: any, collection: string) {
    return this.firestore.collection(collection).doc(documentId).set(data);
  }
}
