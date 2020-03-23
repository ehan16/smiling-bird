import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { FirestoreService } from './firestore.service';
import { User } from '../models/user.model';

@Injectable({
    providedIn:  'root'
})
export  class  AuthService {

  user: any;
  id: any;
  currentUser: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    console.log('auth init');
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.id = user.uid;
        // this.firestoreService.getValue(user.uid, 'users').pipe(first()).toPromise().then(
        //   (e: User) => {
        //     this.currentUser = e;
        //     console.log('user id is ', this.id, 'and the user is ', this.currentUser);
        //   }
        // );
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });

  }

  getUser(userId) {
    this.firestoreService.get(userId, 'users').subscribe(
      (user) => {
        this.currentUser = {
          name: user.data().name,
          user: user.data().user,
          identification: user.data().identification,
          gender: user.data().gender,
          type: user.data().type,
          birth: {
            year: user.data().date.year,
            month: user.data().date.month,
            day: user.data().date.day
          },
          enable: user.data().enable,
          debt: user.data().debt,
          shift: [ user.data().shift[0], user.data().shift[1] ],
          comission: user.data().comission,
          id: userId
        };
      }
    );
  }

  doRegister(email, password) {
    return new Promise<any>(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          res => {
            resolve(res);
            // this.afAuth.auth.signOut().then(() => {
            //   localStorage.removeItem('user');
            //   this.router.navigate(['/visitor']);
            // });
          }, error => reject(error));
      });
  }

  signInWithEmail(email: string, password: string) {

    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (result) => {
        this.id = result.user.uid;
        console.log('Log in successful');
        // this.router.navigate(['/home']);
      }
    ).catch(
      (error) => {
        window.alert(error.message);
      }
    );
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {

      localStorage.removeItem('user');
      console.log('Signed out');
      // window.alert('Ha cerrado sesion');
      this.router.navigate(['/visitor']);

    });
  }

  get isAuthenticated(): boolean {
     const user = JSON.parse(localStorage.getItem('user'));
     return (user !== null) ? true : false;
  }

  sendPasswordResetEmail(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email).then(
      () => {
        window.alert('El correo de recuperación ha sido enviado, verifique su buzón');
      }).catch((error) => {
        window.alert(error);
      });
  }

  getCurrentUID() {
    return this.id;
  }

  VerifyEmail(user) {
    let use = this.afAuth.auth.currentUser;

    use.sendEmailVerification().then( () => {
      // aqui lo manda
    }).catch((error) => {
      // por si algo pasa
    });

  }
}
