import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  userList: User[] = [];
  startedEditing = new Subject<number>();

  constructor() { }

  getUser() {
  }

  getDentistList() {
  }

  getUserList() {
  }

  getPatientList() {
  }

  addUser() {
  }

  modifyUser() {
  }

  updateList() {
  }


}
