import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  show = false;

  toggleCollapse() {
    this.show = !this.show;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    protected auth: AuthService
  ) {
    this.currentUser = this.userService.currentUser;
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
        this.router.navigate(['/patient', this.currentUser.identification]);
      } else if (this.currentUser.type === 'dentist') {
        this.router.navigate(['/dentist', this.currentUser.identification]);
      } else if (this.currentUser.type === 'admin') {
        this.router.navigate(['/admin', this.currentUser.identification]);
      }
    } else {
      this.router.navigate(['/visitor']);
    }
  }

}
