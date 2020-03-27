import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Subscription } from 'rxjs';

const secondaryConfig = {
  apiKey: 'AIzaSyDmNJfyjM7PySxSBIXnLfq9if6tc7mPC5I',
  authDomain: 'smiling-bird.firebaseapp.com',
  databaseURL: 'https://smiling-bird.firebaseio.com/',
  projectId: 'smiling-bird',
  storageBucket: 'smiling-bird.appspot.com',
  messagingSenderId: '574115405001',
  appId: '1:574115405001:web:b85016cd516b6cb9e8c118',
  measurementId: 'G-DM7DLVL86Z'
};
const secondaryApp = firebase.initializeApp(secondaryConfig, 'secondary');

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})

export class NewUserComponent implements OnInit, OnDestroy {

  currentUser: User;
  createForm: FormGroup;
  newType = 'patient';
  maxHour = 16;
  minHour = 8;
  todayDate = new Date();
  maxDate: NgbDate = new NgbDate( this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, this.todayDate.getDate());
  minDate: NgbDate = new NgbDate( this.todayDate.getFullYear() - 70, this.todayDate.getMonth() + 1, this.todayDate.getDate());
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {

    this.subscription = this.auth.userChange.subscribe(
      (user: User) => {
        this.currentUser = user;
        this.onInit();
      }
    );

  }

  onInit() {

    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      user: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      identification: new FormControl('', [Validators.required, Validators.min(1)]),
      gender: new FormControl('mujer'),
      type: new FormControl('patient'),
      date: new FormControl('', Validators.required),
      comission: new FormControl(0, Validators.required),
      start: new FormControl(this.minHour, [
        Validators.required,
        Validators.min(8),
        Validators.max(this.maxHour)
      ]),
      end: new FormControl(this.maxHour, [
        Validators.required,
        Validators.max(16),
        Validators.min(this.minHour)
      ])
    });

  }

  onCreate() {
    if (this.createForm.value.password === this.createForm.value.confirmPassword) {
      this.createNewUser( this.createForm.value.user, this.createForm.value.password).then(
        res => {
          console.log(res);
          window.alert('La cuenta ha sido exitosamente creada');
          console.log('secondary app', res.user.uid);

          const user = {
            name: this.createForm.value.name,
            user: this.createForm.value.user,
            identification: this.createForm.value.identification,
            gender: this.createForm.value.gender,
            type: this.createForm.value.type,
            birth: {
              year: this.createForm.value.date.year,
              month: this.createForm.value.date.month,
              day: this.createForm.value.date.day
            },
            enable: true,
            debt: 0,
            shift: [this.createForm.value.start, this.createForm.value.end],
            comission: this.createForm.value.comission
          };

          this.userService.createUser(user, res.user.uid);
          this.sendEmail(this.createForm.value.user, this.createForm.value.password);

          // if (this.currentUser.type === 'dentist') {
          //   this.router.navigate(['../', res.user.uid, 'medical-record'], { relativeTo: this.route });
          // } else {
          this.router.navigate(['../'], { relativeTo: this.route });
          // }
        },
        error => {
          window.alert(error);
        }
      );
    } else {
      window.alert('Las dos contraseñas no coinciden');
    }
  }

  createNewUser(email, password) {
    return new Promise<any>((resolve, reject) => {
      secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(
        res => {
          resolve(res);
        },
        error => reject(error)
      );
    });
  }

  sendEmail(mail: string, password: string) {

    const content = '<p>Hola</p>' + '<p>Se le ha creado una cuenta en Smiling Bird con el correo: </p>'
    + mail + '<p>Su actual contraseña es ' + password + '.</p>' + '<p>Por favor inicie sesión y modifique su contraaseña.</p>'
    + '<p>Gracias.</p>' + '<p>El equipo de Smiling Bird</p>';
    const aux = {
      message: content,
      title: 'Creación de usuario',
      email: mail
    };

    this.firestoreService.create(aux, 'alreadymademail');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
