import { BankAccount } from './bank-account.model';

export class PaymentAccounts {
  public paypal: boolean;
  public zelle: boolean;
  public bankAccounts: BankAccount[];
}
