import { User } from './user.model';

export class Dentist extends User {

  comission: number = 23;

  constructor(user: string, name: string) {
    super(user, name);
  }

}
