import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
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
  dentistId ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private firestore: FirestoreService
  ) { 
    this.dentistId = this.authService.id;
    console.log(this.dentistId);
  }

  ngOnInit() {

    this.firestore.getAll('payments').subscribe(data => {
      this.paymentlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });

        this.paymentlist = this.paymentlist.filter(payments=> payments.dentist === this.dentistId);
        console.log(this.paymentlist);
  
  });
  
  }
}