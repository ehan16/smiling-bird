import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  startedEditing = new Subject<number>();
  currentUser: User = new User('Test', 'test', 'Robert');
  userList: User[];

  constructor() { }

}
