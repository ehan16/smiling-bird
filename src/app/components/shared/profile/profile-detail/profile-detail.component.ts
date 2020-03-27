import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {

  currentUser: User;
  dentistExtra;
  subscription: Subscription;

  constructor(
    private firestore: FirestoreService,
    private auth: AuthService) {
  }

  ngOnInit() {

    if (this.auth.currentUser) {
      this.currentUser = this.auth.currentUser;
      this.onInit();
    }
    this.subscription = this.auth.userChange.subscribe(
      (user: User) => {
        this.currentUser = user;
        this.onInit();
      }
    );

  }

  onInit() {
    if (this.currentUser.type === 'dentist') {
      this.firestore.get(this.auth.id, 'dentist-extra').subscribe(accounts => {
        this.dentistExtra = {
          zelle: accounts.data().zelle,
          paypal: accounts.data().paypal,
          bankAccounts: accounts.data().bankAccounts
        };
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
