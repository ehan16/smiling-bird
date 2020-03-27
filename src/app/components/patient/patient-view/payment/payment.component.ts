import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { Appointment } from 'src/app/models/appointment.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  showSuccess: boolean;
  maxDate = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

  currentUser: User;
  dentistIdList = [];
  dentistList = [];
  dentistPayments = [];
  userList = [];

  voucherForm: FormGroup;
  method: string;
  dentistId: string;
  product = {
    price: 30,
    description: 'Consulta médica en Smiling Bird',
    img: 'assets/couch.jpg'
  };
  paidFor = false;
  subscription: Subscription;

  constructor(
    private firestoreService: FirestoreService,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.subscription = this.authService.userChange.subscribe(
      (user: User) => {
        this.currentUser = user;
        this.onInit();
      }
    );

  }

  onInit() {

    this.voucherForm = this.fb.group({
      date: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });

    this.firestoreService.getAll('users').subscribe(data => {
      this.userList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      });
    });

    let appointmentList = [];

    this.firestoreService.getAll('appointments').subscribe(data => {
      appointmentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Appointment;
      });

      appointmentList = appointmentList.filter(appointment => appointment.patient === this.authService.id);

      for (const appointment of appointmentList) {
        if (!this.dentistIdList.includes(appointment.dentist)) {
          this.dentistIdList.push(appointment.dentist);
        }
      }

      for (const dentistId of this.dentistIdList) {
        const dentist = this.userList.filter(user => user.id === dentistId);
        this.firestoreService.getValue(dentistId, 'dentist-extra').subscribe(methods =>{
          const dentistData = {
            data: dentist[0],
            payment: methods
          };
          this.dentistList.push(dentistData);
          console.log(dentistData);
        });
      }

    });

    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.product.description,
              amount: {
                currency_code: 'USD',
                value: this.product.price
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        this.paidFor = true;
        console.log(order);
        console.log(data);
        this.paypalPayment(order);
      },
      onError: err => {
        console.log(err);
        window.alert(err);
      }
    })

    .render(this.paypalElement.nativeElement);

  }

  onSubmit() {

    let reference = '';
    if (this.method === 'transferencia') {
      reference = this.voucherForm.value.voucher;
    }

    const paymentData = {
      amount: this.voucherForm.value.amount,
      voucher: reference,
      email: this.voucherForm.value.email,
      patient: this.currentUser.name,
      method: this.method,
      date: {
        year: this.voucherForm.value.date.year,
        month: this.voucherForm.value.date.month,
        day: this.voucherForm.value.date.day
      },
      dentist: this.dentistId
    };

    this.updateDebt(this.voucherForm.value.amount);
    this.firestoreService.create(paymentData, 'payments');
    window.alert('El pago ha sido existoso');

  }

  activatePaypal() {
    document.getElementById('containerPaypal').style.display = 'block';
  }

  selectMethod(method: 'zelle' | 'paypal' | 'transferencia', dentistId) {
    this.method = method;
    this.dentistId = dentistId;
    console.log(this.dentistId);
    if (method === 'zelle') {

      document.getElementById('containerPaypal').style.display = 'none';
      if (this.voucherForm.get('voucher')) {
        this.voucherForm.removeControl('voucher');
      }

    } else if (method === 'transferencia') {

      document.getElementById('containerPaypal').style.display = 'none';
      if (!this.voucherForm.get('voucher')) {
        this.voucherForm.addControl('voucher', new FormControl('', Validators.required));
      }

    } else {
      this.paidFor = false;
    }
  }

  paypalPayment(order) {
    const today = new Date();
    const paymentData = {
      amount: this.product.price,
      voucher: order.id,
      email: order['payer'].email_address,
      patient: this.currentUser.name,
      method: this.method,
      date: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      },
      dentist: this.dentistId
    };
    this.updateDebt(30);
    this.firestoreService.create(paymentData, 'payments');
    window.alert('El pago ha sido existoso');
  }

  updateDebt(paidAmount) {
    const newDebt = this.currentUser.debt - paidAmount;
    this.firestoreService.update(this.authService.id, { debt: newDebt }, 'users');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
