import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseAuth } from '@angular/fire';

@Injectable({
    providedIn:  'root'
})
export  class  AuthService {

  user: any;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
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
      this.router.navigate(['/']);
    });
  }

  get isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

}