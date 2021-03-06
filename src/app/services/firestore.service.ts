import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  constructor( private firestore: AngularFirestore) {}

  public create(data: any, collection: string) {
    return this.firestore.collection(collection).add(data);
  }

  public setValue(documentId: string, data: any, collection: string) {
    this.firestore.collection(collection).doc(documentId).set(data);
  }

  public get(documentId: string, collection: string) {
    return this.firestore.collection(collection).doc(documentId).get();
  }

  public getValue(documentId: string, collection: string) {
    return this.firestore.collection(collection).doc(documentId).valueChanges();
  }

  public getSnapshot(documentId: string, collection: string) {
    return this.firestore.collection(collection).doc(documentId).snapshotChanges();
  }

  public getAll(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  public update(documentId: string, data: any, collection: string) {
    return this.firestore.collection(collection).doc(documentId).set(data , { merge: true});
  }


}
