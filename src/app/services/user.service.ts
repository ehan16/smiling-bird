import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  currentUser: User;
  userList: User[];

  constructor(
    private firestore: FirestoreService,
    private af: AngularFirestore,
    private router: Router
  ) {
    this.firestore.getAll('users').subscribe(
      data => {
        this.userList = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as User;
        });
      }
    );

  }

  createUser(data: any, id: string) {
    this.af
      .collection('users')
      .doc(id)
      .set(data);
  }

  logUser(userId) {
    this.firestore.getValue(userId, 'users').subscribe((user: User) => {
      this.currentUser = user;
      console.log('current user: ', this.currentUser);
      this.router.navigate([
        this.currentUser.type,
        this.currentUser.identification
      ]);
    });
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}
