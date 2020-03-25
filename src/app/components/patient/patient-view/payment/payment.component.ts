import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Appointment } from 'src/app/models/appointment.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  showSuccess: boolean;

  currentUser: User;
  dentistIdList = [];
  dentistList = [];
  userList = [];
  voucherForm: FormGroup;
  method: string;
  dentistId: string;
  product = {
    price: 777.77,
    description: 'cita dentista, tratamiento realizado'
  };

  paidFor = false;
  seePaypal = false;

  constructor(
    private userService: UserService,
    private firestoreService: FirestoreService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit() {

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

    // this.route.params.subscribe((param: Params) => {
    //   const patientId = param['patientId'];
    //   this.firestoreService.getValue(patientId, 'users').subscribe((user: User) => {
    //       this.currentUser = user;
    //       console.log(this.currentUser);
    //     });
    // });

    let appointmentList = [];

    this.firestoreService.getAll('appointments').subscribe(data => {
      appointmentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Appointment;
      });

      console.log(appointmentList);
      appointmentList = appointmentList.filter(appointment => appointment.patient === this.authService.id);

      for (let appointment of appointmentList) {
        if (!this.dentistIdList.includes(appointment.dentist)) {
          this.dentistIdList.push(appointment.dentist);
        }
      }

      console.log(this.dentistIdList);
      console.log(appointmentList);

      for (let dentistId of this.dentistIdList) {
        const dentist = this.userList.filter(user => user.id === dentistId);
        this.dentistList.push(dentist[0]);
      }

      console.log(this.dentistList);

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
      },
      onError: err => {
        console.log(err);
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

    this.firestoreService.create(paymentData, 'payments');

  }

  activatePaypal(){
    document.getElementById('containerPaypal').style.display = "block";
  }

  selectMethod(method: 'zelle' | 'paypal' | 'transferencia', dentistId) {
    this.method = method;
    this.dentistId = dentistId;
    if (method === 'zelle') {

      if (this.voucherForm.get('voucher')) {
        this.voucherForm.removeControl('voucher');
      }

    } else if (method === 'transferencia') {

      if (!this.voucherForm.get('voucher')) {
        this.voucherForm.addControl('voucher', new FormControl('', Validators.required));
      }

    } else {
      this.seePaypal = true;

    }
  }

}
