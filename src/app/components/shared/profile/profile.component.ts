import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  editMode = false;
  currentUser: User;
  // subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, public auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }

  onEditMode() {
    this.editMode = !this.editMode;

    console.log('home current user ', this.currentUser);
    console.log('service current user ', this.userService.currentUser);
    console.log('service current user by getter', this.userService.getCurrentUser());

    if (this.editMode) {
      this.router.navigate([this.currentUser.type, this.currentUser.user, 'profile', 'edit']);
    } else {
      // this.router.navigate([this.currentUser.type, this.currentUser.user, 'profile']);
      this.router.navigate(['../'], {relativeTo: this.route});
    }

  }

  logOut() {
  this.auth.signOut();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
