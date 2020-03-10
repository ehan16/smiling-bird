import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
    providedIn:  'root'
})
export  class  AuthService {

  user: any;
  id: any;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.id = user.uid;
        console.log('user', this.user, 'uid', this.id);
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  doRegister(email, password) {
    return new Promise<any>(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          res => {
            resolve(res);
          }, error => reject(error));
      });
  }

  signInWithEmail(email: string, password: string) {

    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (result) => {
        console.log('Log in successful');
        this.router.navigate(['/home']);
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
      window.alert('Ha cerrado sesion');
      this.router.navigate(['/']);
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

}
