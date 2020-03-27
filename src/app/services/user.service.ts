import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UserService {

  userList: User[];

  constructor(
    private firestore: FirestoreService,
    private af: AngularFirestore
  ) {
    this.firestore.getAll('users').subscribe(data => {
      this.userList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });

    });

  }

  createUser(data: any, id: string) {
    this.af.collection('users').doc(id).set(data);
  }

  getUserData(id): any {
    this.firestore.getValue(id , 'users').subscribe((user: User) => {
      return user;
    });
  }

  getAll() {
    return this.firestore.getAll('users');
  }

  getUser(id) {
    this.firestore.getValue(id , 'users').subscribe((user: User) => {
      return user;
    });
  }

}
