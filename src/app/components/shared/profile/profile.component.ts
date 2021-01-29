import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  editMode: boolean;
  currentUser: User;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthService) { }

  ngOnInit() {
    if (this.auth.currentUser) {
      this.currentUser = this.auth.currentUser;
    } else {
      this.subscription = this.auth.userChange.subscribe(
        (user: User) => {
          this.currentUser = user;
        }
      );
    }
    this.editMode = false;
  }

  onEditMode() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.router.navigate(['edit'], {relativeTo: this.route});
    } else {
      this.router.navigate([this.currentUser.type, this.auth.id, 'profile']);
    }

  }

  logOut() {
    this.auth.currentUser = null;
    this.auth.signOut();
    window.alert('Ha cerrado sesion');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
