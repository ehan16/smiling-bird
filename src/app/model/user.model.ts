import { Appointment } from './appointment.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class User {

  public name: string;
  public user: string;
  public identification: number;
  public type: string;
  public birth: NgbDate;
  public gender: string;
  public enable: boolean;
  public appointments: Appointment[] = []; //Para el historial medico se filtran los completados y asi

  public debt: number;

  // public patients: User[] = [];
  public shift: number[];

  constructor(user: string, name: string, identification: number) {
    this.name = name;
    this.user = user;
    this.identification = identification;
    this.gender = 'hombre';
    this.type = 'patient';
    this.enable = true;
    this.debt = 0;
    this.birth = new NgbDate(2020, 1, 17);
    this.shift = [8, 14];
  }
}
