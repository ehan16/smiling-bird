import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  currentUser: User;
  medicalRecord = [];
  patient: User;

  constructor(private firestore: FirestoreService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.firestore.getAll('appointments').subscribe(data => {
      this.medicalRecord = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Appointment;
      });
    });

    // if (this.currentUser.type === 'patient') {
    //   this.patient = this.currentUser;
    //   console.log(this.patient);
    //   this.medicalRecord = this.medicalRecord.filter(appointment => appointment.patient === this.userService.currentUserId);
    //   this.medicalRecord = this.medicalRecord.filter(appointment => appointment.completed === true);
    // } else {
    this.route.params.subscribe(
      (param: Params) => {
        const patientId = param.patientId;
        this.firestore.getValue(patientId, 'users').subscribe((user: User) => {
          this.patient = user;
          this.medicalRecord = this.medicalRecord.filter(appointment => appointment.patient === patientId);
          this.medicalRecord = this.medicalRecord.filter(appointment => appointment.completed === true);
          console.log(this.patient);
        });
      }
    );
    // }

  }

  onEdit(id) {

  }

  onSee(id) {

  }



}
