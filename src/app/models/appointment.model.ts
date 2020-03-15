import { Treatment } from './treatment.model';

export class Appointment {
  public date: {
    year: number,
    month: number,
    day: number
  };
  public  hour: number;
  // public patient: User;
  public patient: string;
  public patientName: string;
  public patientUser: string;
  // public dentist: User;
  public dentist: string;
  public dentistName: string;
  public completed: boolean;
  public accepted: boolean;
  public treatments = [];
}
