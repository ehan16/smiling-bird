import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  currentUser: User;
  dentistExtra;

  constructor(private userService: UserService, private firestore: FirestoreService, private auth: AuthService) {
    this.currentUser = this.userService.getCurrentUser();

    if (this.currentUser.type === 'dentist') {
      this.firestore.get(this.auth.id, 'dentist-extra').subscribe(accounts => {
        this.dentistExtra = {
          zelle: accounts.data().zelle,
          paypal: accounts.data().paypal,
          bankAccounts: accounts.data().bankAccounts
        };

        console.log(this.dentistExtra);

      });
    }
  }

  ngOnInit() {}
}
