import { User } from './user.model';
import { Treatment } from './treatment.model';
// import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class Appointment {
  public date: {
    year: number,
    month: number,
    day: number
  };
  public  hour: number;
  public patient: User;
  public dentist: User;
  public completed: boolean;
  public accepted: boolean;
  public treatments = [];
}
