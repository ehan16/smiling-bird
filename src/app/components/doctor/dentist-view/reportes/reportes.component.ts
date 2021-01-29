import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Payment } from 'src/app/models/payment.model';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit, OnDestroy {

  paymentlist = [];
  dentistId: string;
  total = 0;
  today = new Date();
  subscription: Subscription;
  currentUser: User;

  constructor(
    private authService: AuthService,
    private firestore: FirestoreService
  ) {
  }

  ngOnInit() {
    if (this.authService.currentUser) {
      this.currentUser = this.authService.currentUser;
      this.dentistId = this.authService.id;
      this.onInit();

    } else {
      this.subscription = this.authService.userChange.subscribe(
        user => {
          this.currentUser = user;
          this.dentistId = user.id;
          console.log(this.dentistId);
          this.onInit();
        }
      );
    }
  }

  onInit() {

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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
