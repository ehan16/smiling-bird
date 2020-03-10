import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class UserService {

  currentUser: User;
  userList: User[];

  constructor(private firestore: FirestoreService, private af: AngularFirestore, private router: Router, private auth: AuthService) {
  }

  createUser(data: any, id: string) {
    this.af.collection('users').doc(id).set(data);
  }

  logUser(userId) {
    this.firestore.getValue(userId, 'users').subscribe(
      (user: User) => {
        this.currentUser = user;
        console.log('current user: ', this.currentUser);
        this.router.navigate([this.currentUser.type, this.currentUser.identification]);
      }
    );
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

}
