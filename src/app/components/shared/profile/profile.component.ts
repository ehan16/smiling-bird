import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
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

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, public auth: AuthService) { }

  ngOnInit() {

    this.subscription = this.auth.userChange.subscribe(
      (user: User) => {
        this.currentUser = user;
        this.editMode = false;
      }
    );

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
    this.auth.signOut();
    window.alert('Ha cerrado sesion');
    this.userService.currentUser = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
