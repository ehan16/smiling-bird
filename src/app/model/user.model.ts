import { Appointment } from './appointment.model';

export class User {

  public name: string;
  public user: string;
  public password: string;
  public type: string;
  public birth: string;
  public enable: boolean;

  public debt: number;

  public patients: User[] = [];
  public appointments: Appointment[];

  constructor(user: string, password: string, name: string){
    this.name = name;
    this.user = user;
    this.password = password;
    this.type = 'patient';
    this.enable = true;
    this.debt = 0;
    this.birth = '';
  }

}
