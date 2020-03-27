import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser: User;
  currentId: string;
  show = false;
  subscription: Subscription;

  toggleCollapse() {
    this.show = !this.show;
  }

  constructor(
    private router: Router,
    protected auth: AuthService,
  ) {
    this.subscription = this.auth.userChange.subscribe(
      (user: User) => {
        console.log(user);
        this.currentUser = user;
        this.currentId = user.id;
      }
    );
  }

  ngOnInit() {
    console.log(this.currentUser);
  }

  goToProfile() {
    this.router.navigate([this.currentUser.type, this.currentUser.identification, 'profile']);
  }

  goToHome() {
    if (this.currentUser) {
      if (this.currentUser.type === 'patient') {
        this.router.navigate(['/patient', this.currentId]);
      } else if (this.currentUser.type === 'dentist') {
        this.router.navigate(['/dentist', this.currentId]);
      } else if (this.currentUser.type === 'admin') {
        this.router.navigate(['/admin', this.currentId]);
      }
    } else {
      this.router.navigate(['/visitor']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
