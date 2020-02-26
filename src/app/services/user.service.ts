import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  startedEditing = new Subject<number>();
  editedProfile = new Subject<any>();

  constructor() { }

}
