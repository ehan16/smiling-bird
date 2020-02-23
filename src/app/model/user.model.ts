import { Appointment } from './appointment.model';
import { Date } from './date.model';

export class User {

  public name: string;
  public user: string;
  public id: number;
  public password: string;
  public type: string;
  public birth: Date;
  public gender: string;
  public enable: boolean;
  public appointments: Appointment[];

  public debt: number;

  public patients: User[] = [];
  public shift: string;

  constructor(user: string, password: string, name: string){
    this.name = name;
    this.user = user;
    this.id = 0;
    this.password = password;
    this.gender = 'Hombre';
    this.type = 'patient';
    this.enable = true;
    this.debt = 0;
    this.birth = new Date();
    this.shift = '';
  }

}
