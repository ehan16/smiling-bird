import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  currentUser: User;
  currentUserId: string;
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
      });

    console.log(this.userList);

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
      this.currentUserId = userId;
      console.log('current user: ', this.currentUser);
      this.router.navigate([
        this.currentUser.type,
        this.currentUser.identification
      ]);
    });
  }

  getUserData(userId): any {
    this.firestore.getValue(userId, 'users').subscribe((user: User) => {
      console.log('user: ', user);
      const userData = user;
      return userData;
    });
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}
