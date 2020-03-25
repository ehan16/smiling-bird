import { Treatment } from './treatment.model';

export class Appointment {
  public date: {
    year: number,
    month: number,
    day: number
  };
  public  hour: number;
  public patient: string; // id del paciente
  public dentist: string; // id del dentista
  public completed: boolean;
  public accepted: boolean;
  public treatments = [];
  public recipe: string;
}
