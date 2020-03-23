export class Payment {
  public amount: number;
  public method: string;
  public date: {
    year: number,
    month: number,
    day: number
  };
  public patient: string;
  public voucher;
}
