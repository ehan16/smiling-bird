import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  startedEditing = new Subject<number>();
  currentUser: User = new User('Test', 'Robert', 23424);
  userList: User[];

  constructor(private firestore: FirestoreService, private af: AngularFirestore) { }

  createUser(data: any, id: string) {
    this.af.collection('users').doc(id).set(data);
  }


}
