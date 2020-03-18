export class User {

  public name: string;
  public user: string;
  public identification: number;
  public type: string;
  public birth: {
    year: number,
    month: number,
    day: number
  };
  public gender: string;
  public enable: boolean;
  public appointment = []; // Para el historial medico se filtran los completados y asi
  public debt: number;
  public comission: number;
  public shift: number[];
  public id: any;

}
