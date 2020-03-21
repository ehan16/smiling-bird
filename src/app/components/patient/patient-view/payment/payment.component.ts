import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Appointment } from 'src/app/models/appointment.model';
import { FirestoreService } from 'src/app/services/firestore.service';

  declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true}) paypalElement: ElementRef;

  showSuccess: boolean;

  currentUser: User;
  dentistIdList = [];

  constructor(private userService: UserService, private firestoreService: FirestoreService){
    this.currentUser = this.userService.currentUser;
  }

  product = {
    price: 777.77,
    description: 'used couch, decent condition',
    img: 'assets/couch.jpg'
  };

  paidFor = false;

  ngOnInit(): void {
    this.firestoreService.getAll('appointments').subscribe(data => {
      let appointmentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Appointment;
      });
      
      appointmentList = appointmentList.filter(appointment => appointment.patient === this.userService.currentUserId);

      for(let appointment of appointmentList){
        if(!this.dentistIdList.includes(appointment.dentist)){
          this.dentistIdList.push(appointment.dentist);
        }
          
      }
      console.log(appointmentList);
    });


    paypal
      .Buttons({
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
}
