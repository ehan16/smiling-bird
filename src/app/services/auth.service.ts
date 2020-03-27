import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { FirestoreService } from './firestore.service';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn:  'root'
})
export class  AuthService {

  user: any;
  id: any;
  currentUser: User;
  userChange: Subject<User> = new Subject<User>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestoreService: FirestoreService,
  ) {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (localStorage.getItem('user')) {
      this.getDataFromFirebase();
    } else {
      console.log('local storage ready');
    }
  }

  getDataFromFirebase() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.id = user.uid;
        this.firestoreService.getSnapshot(user.uid, 'users').subscribe((user) => {
          const userData = {
            id: user.payload.id,
            ...user.payload.data()
          } as User;
          this.currentUser = userData;
          this.userChange.next(userData);
        });
        console.log('Authenticated');
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.log('Not authenticated');
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
        this.id = result.user.uid;
        localStorage.setItem('user', JSON.stringify(result));
        console.log('Log in successful');

        this.firestoreService.getValue(this.id, 'users').subscribe((user: User) => {
          if ( user.enable ) {
            this.currentUser = user;
            this.userChange.next(user);
            this.router.navigate([this.currentUser.type, this.id]);
          } else {
            window.alert('Se encuentra bloqueado');
          }
        });

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
    }).catch((error) => {
    });
  }

}
