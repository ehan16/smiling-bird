import { User } from './user.model';
import { Treatment } from './treatment.model';

export class Appointment {
  public date: Date;
  // public  hour: number;
  public patient: User;
  public dentist: User;
  public completed: boolean;
  public treatments: Treatment[];
}
