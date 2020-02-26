import { Appointment } from './appointment.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class User {

  public name: string;
  public user: string;
  public identification: number;
  public password: string;
  public type: string;
  public birth: NgbDate;
  public gender: string;
  public enable: boolean;
  public appointments: Appointment[];

  public debt: number;
  public record: Appointment[];

  // public patients: User[] = [];
  public shift: string;

  constructor(user: string, password: string, name: string) {
    this.name = name;
    this.user = user;
    this.identification = 0;
    this.password = password;
    this.gender = 'hombre';
    this.type = 'patient';
    this.enable = true;
    this.debt = 0;
    this.birth = new NgbDate(2008, 2, 12);
    this.shift = '';
  }

}
