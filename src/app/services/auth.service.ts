import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { FirestoreService } from './firestore.service';
import { User } from '../models/user.model';
import { UserService } from './user.service';

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
    private firestoreService: FirestoreService,
    private userService: UserService
  ) {
 //   console.log('auth init');
  //   this.afAuth.authState.subscribe(user => {
  //     if (user) {
  //       this.user = user;
  //       this.id = user.uid;
  //       // this.firestoreService.getValue(user.uid, 'users').pipe(first()).toPromise().then(
  //       //   (e: User) => {
  //       //     this.currentUser = e;
  //       //     this.userService.currentUser = e;
  //       //     console.log('user id is ', this.id, 'and the user is ', this.currentUser);
  //       //   }
  //       // );

  //       // this.firestoreService.getValue(user.uid, 'users').subscribe((userData: User) => {
  //       //   this.currentUser = userData;
  //       //   this.userService.currentUser = userData;
  //       // });
  //   //    localStorage.setItem('user', JSON.stringify(this.user));
  //   //  } else {
  //  //     localStorage.setItem('user', null);
  //     }
  //   });
    this.checkLocalStorage();
    
  }

  checkLocalStorage() {
    if (!localStorage.getItem('user')) {
      this.getDataFromFirebase();
    } else {
      console.log('localStorage ready!');
    }
  }

  getDataFromFirebase() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user; 
        console.log('Authenticated');
        this.userService.setUserLoggedIn(this.user); 
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

        this.firestoreService.getValue(this.id, 'users').subscribe((user: User) => {
          this.currentUser = user;
          if ( user.enable ) {
            this.userService.currentUser = user;
            this.userService.setUserLoggedIn(user);
            console.log('current user: ', this.currentUser);
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
    }).catch((error) => {
    });

  }

}
