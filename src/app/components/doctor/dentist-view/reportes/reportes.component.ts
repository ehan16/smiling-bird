import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Payment } from 'src/app/models/payment.model';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  paymentlist = [];
  dentistId: string;
  total = 0;
  today = new Date();

  constructor(
    private authService: AuthService,
    private firestore: FirestoreService
  ) {
    this.dentistId = this.authService.localUser.uid;
    console.log(this.dentistId);
  }

  ngOnInit() {
    this.firestore.getAll('payments').subscribe(data => {
      this.paymentlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Payment;
      });

      this.paymentlist = this.paymentlist.filter(payments => payments.dentist === this.dentistId);
      this.paymentlist = this.paymentlist.filter(payment => payment.date.year === this.today.getFullYear());
      console.log(this.paymentlist);

      this.paymentlist.forEach(payment => {
        this.total = this.total + payment.amount;
      });

    });
  }
}
